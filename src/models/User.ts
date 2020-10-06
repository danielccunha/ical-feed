import mongoose, { Schema, Document } from 'mongoose'

export type IUser = Document & {
  email: string
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
})

export default mongoose.model<IUser>('User', UserSchema)
