import mongoose, {Schema} from 'mongoose'

const getStatusSchema = new Schema({
  identifier: {
    type: String,
    unique: true
  },
  motor: {
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

getStatusSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      motor: this.motor,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('GetStatus', getStatusSchema)

export const schema = model.schema
export default model
