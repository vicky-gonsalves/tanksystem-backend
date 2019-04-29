import mongoose, {Schema} from 'mongoose'

const logSchema = new Schema({
  action: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => {
      delete ret._id
    }
  }
})

logSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      action: this.action,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Log', logSchema)

export const schema = model.schema
export default model
