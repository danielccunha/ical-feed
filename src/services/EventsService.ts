import path from 'path'
import ical, { ICalCalendar } from 'ical-generator'

import icalConfig from '@config/ical'
import existsAsync from '@helpers/existsAsync'
import readAsync from '@helpers/readAsync'
import writeAsync from '@helpers/writeAsync'

interface ICreateEvent {
  user: string
  summary: string
  start: Date
  end: Date
}

interface IEvent {
  id: string
}

export default class EventsService {
  async create(dto: ICreateEvent) {
    // 1.0 Read stored calendar in case it exists and create a new calendar
    let calendarJson = await this.getStoredCalendar(dto.user)
    let calendar = this.createCalendar(calendarJson)

    // 2.0 Remove received event in case it already exists
    const id = `${dto.start.getTime()}-${dto.end.getTime()}-${dto.summary}`
    calendar = this.removeEvent(id, calendar)

    // 3.0 Add received event
    const event = calendar.createEvent({
      start: dto.start,
      end: dto.end,
      summary: dto.summary,
      description: 'Event created by iCal Feed application.',
      id,
      uid: id
    })

    // 4.0 Store calendar backup
    calendarJson = JSON.stringify(calendar)
    let calendarPath = this.createCalendarPath(dto.user, 'json')
    await writeAsync(calendarPath, calendarJson)

    // 5.0 Store calendar ICS
    calendarPath = calendarPath.replace('.json', '.ics')
    await writeAsync(calendarPath, calendar.toString())

    return event
  }

  private async getStoredCalendar(user: string): Promise<string> {
    const calendarPath = this.createCalendarPath(user, 'json')

    if (await existsAsync(calendarPath)) {
      const buffer = await readAsync(calendarPath)
      return buffer.toString()
    }

    return ''
  }

  private createCalendarPath(user: string, suffix: 'ics' | 'json'): string {
    return path.resolve(__dirname, '..', '..', 'public', `${user}.${suffix}`)
  }

  private createCalendar(json: string): ICalCalendar {
    let calendar = ical()
    if (json) {
      // @ts-ignore
      calendar = ical(json)
    }

    calendar.domain(icalConfig.domain)
    calendar.url(icalConfig.url)
    calendar.url(icalConfig.prodId)

    return calendar
  }

  private removeEvent(id: string, calendar: ICalCalendar): ICalCalendar {
    const obj = calendar.toJSON()
    obj.events = obj.events.filter((ev: IEvent) => ev.id !== id)

    // @ts-ignore
    return ical(JSON.stringify(obj))
  }
}
