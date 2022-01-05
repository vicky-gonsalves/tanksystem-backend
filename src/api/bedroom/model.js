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
    type: Boolean,
    default: false
  },
  light2: {
    type: Boolean,
    default: false
  },
  light3: {
    type: Boolean,
    default: false
  },
  fan: {
    type: Boolean,
    default: false
  },
  websocket: {
    type: String,
    default: 'disconnected'
  },
  updatedByDevice: {
    type: Boolean,
    default: false
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
      updatedByDevice: this.updatedByDevice,
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
bedroomSchema.post('updateOne', function(doc) {
  BedroomEvents.emit('save', doc);
});
bedroomSchema.post('remove', function(doc) {
  BedroomEvents.emit('remove', doc);
});


const model = mongoose.model('Bedroom', bedroomSchema)

export const schema = model.schema
export default model
