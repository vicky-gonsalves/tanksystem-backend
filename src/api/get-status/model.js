import {EventEmitter} from 'events';
import mongoose, {Schema} from 'mongoose'

export const GetStatusEvents = new EventEmitter();
// Set max event listeners (0 == unlimited)
GetStatusEvents.setMaxListeners(0);

export const getStatusSchema = new Schema({
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
});

getStatusSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      identifier: this.identifier,
      motor: this.motor,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
};

getStatusSchema.post('save', function(doc) {
  GetStatusEvents.emit('save', doc);
});
getStatusSchema.post('remove', function(doc) {
  GetStatusEvents.emit('remove', doc);
});

const model = mongoose.model('GetStatus', getStatusSchema);

export const schema = model.schema;
export default model;
