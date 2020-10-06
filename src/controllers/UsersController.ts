import { Request, Response } from 'express'
import isEmail from 'validator/lib/isEmail'

import User from '@models/User'

export default class UsersController {
  async index(_request: Request, response: Response): Promise<Response> {
    const users = await User.find()
    return response.json(users)
  }

  async create(request: Request, response: Response): Promise<Response> {
    let { email } = request.body
    if (!isEmail(email)) {
      return response.status(400).json({ message: 'Email is not valid.' })
    }

    email = email.trim()
    let user = await User.findOne({ email })

    if (!user) {
      user = await User.create({ email })
    }

    return response.json(user)
  }
}
