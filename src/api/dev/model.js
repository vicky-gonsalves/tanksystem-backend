import {EventEmitter} from 'events';
import mongoose, {Schema} from 'mongoose';

export const DevEvents = new EventEmitter();
// Set max event listeners (0 == unlimited)
DevEvents.setMaxListeners(0);


const devSchema = new Schema({
  identifier: {
    type: String,
    unique: true
  },
  distance: {
    type: Number
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

devSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      identifier: this.identifier,
      distance: this.distance,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}


devSchema.post('save', function(doc) {
  DevEvents.emit('save', doc);
});
devSchema.post('remove', function(doc) {
  DevEvents.emit('remove', doc);
});

const model = mongoose.model('Dev', devSchema)

export const schema = model.schema
export default model
