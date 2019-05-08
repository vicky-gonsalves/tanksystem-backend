import mongoose, {Schema} from 'mongoose';

const logSchema = new Schema({
  action: {
    type: String
  },
  motorOn: {
    type: Boolean
  },
  cutOff: {
    type: Boolean
  },
  automate: {
    type: Boolean
  },
  tankFilled: {
    type: Number
  },
  waterHeight: {
    type: Number
  },
  skipCutoff: {
    type: Boolean
  },
  websocket: {
    type: Boolean
  },
  updatedByDevice: {
    type: Boolean
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

logSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      action: this.action,
      motorOn: this.motorOn,
      cutOff: this.cutOff,
      automate: this.automate,
      tankFilled: this.tankFilled,
      waterHeight: this.waterHeight,
      skipCutoff: this.skipCutoff,
      websocket: this.websocket,
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

const model = mongoose.model('Log', logSchema);

export const schema = model.schema;
export default model;
