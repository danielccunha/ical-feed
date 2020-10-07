import dayjs from 'dayjs'
import { Request, Response } from 'express'

import EventsService from '@services/EventsService'

export default class EventsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { user, summary, start: startStr, end: endStr } = request.body
    const service = new EventsService()
    const event = await service.create({
      user,
      summary,
      start: dayjs(startStr).toDate(),
      end: dayjs(endStr).toDate()
    })

    return response.json(event)
  }
}
