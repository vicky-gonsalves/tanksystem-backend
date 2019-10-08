import {EventEmitter} from 'events';
import mongoose, {Schema} from 'mongoose';

export const GetStatusEvents = new EventEmitter();
// Set max event listeners (0 == unlimited)
GetStatusEvents.setMaxListeners(0);

export const getStatusSchema = new Schema({
  identifier: {
    type: String,
    unique: true
  },
  motor: {
    type: String,
    default: 'off'
  },
  automate: {
    type: Boolean,
    default: false
  },
  tankFilled: {
    type: Number,
    default: 0
  },
  waterHeight: {
    type: Number,
    default: 0
  },
  skipCutoff: {
    type: Boolean,
    default: false
  },
  cutOff: {
    type: Boolean,
    default: false
  },
  cutOffAt: {
    type: Date
  },
  flowRate: {
    type: Number,
    default: 0
  },
  quantity: {
    type: Number,
    default: 0
  },
  maxMotorOnTime: {
    type: Number,
    default: 30
  },
  minMotorOnPercentage: {
    type: Number,
    default: 70
  },
  devLogs: {
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
});

getStatusSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      identifier: this.identifier,
      motor: this.motor,
      automate: this.automate,
      cutOff: this.cutOff,
      cutOffAt: this.cutOffAt,
      tankFilled: this.tankFilled,
      websocket: this.websocket,
      waterHeight: this.waterHeight,
      flowRate: this.flowRate,
      quantity: this.quantity,
      devLogs: this.devLogs,
      skipCutoff: this.skipCutoff,
      maxMotorOnTime: this.maxMotorOnTime,
      minMotorOnPercentage: this.minMotorOnPercentage,
      updatedByDevice: this.updatedByDevice,
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
