import {EventEmitter} from 'events';
import mongoose, {Schema} from 'mongoose';

export const BedroomEvents = new EventEmitter();
// Set max event listeners (0 == unlimited)
BedroomEvents.setMaxListeners(0);

const bedroomSchema = new Schema({
  identifier: {
    type: String,
    unique: true
  },
  light1: {
    type: Boolean
  },
  light2: {
    type: Boolean
  },
  light3: {
    type: Boolean
  },
  fan: {
    type: Boolean
  },
  websocket: {
    type: String
  },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => {
      delete ret._id
    }
  }
})

bedroomSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      identifier: this.identifier,
      light1: this.light1,
      light2: this.light2,
      light3: this.light3,
      fan: this.fan,
      websocket: this.websocket,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

bedroomSchema.post('save', function(doc) {
  BedroomEvents.emit('save', doc);
});
bedroomSchema.post('remove', function(doc) {
  BedroomEvents.emit('remove', doc);
});


const model = mongoose.model('Bedroom', bedroomSchema)

export const schema = model.schema
export default model
