import {EventEmitter} from 'events';
import mongoose, {Schema} from 'mongoose';

export const GetLightEvents = new EventEmitter();
// Set max event listeners (0 == unlimited)
GetLightEvents.setMaxListeners(0);

const lightSchema = new Schema({
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
  light4: {
    type: Boolean,
    default: false
  },
  websocket: {
    type: String
  },
  flag: {
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
});

lightSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      identifier: this.identifier,
      light1: this.light1,
      light2: this.light2,
      light3: this.light3,
      light4: this.light4,
      websocket: this.websocket,
      flag: this.flag,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
};

lightSchema.post('save', function(doc) {
  GetLightEvents.emit('save', doc);
});
lightSchema.post('remove', function(doc) {
  GetLightEvents.emit('remove', doc);
});

const model = mongoose.model('Light', lightSchema);

export const schema = model.schema;
export default model;
