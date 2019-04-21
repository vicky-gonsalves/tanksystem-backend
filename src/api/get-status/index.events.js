/**
 * GetStatus model events
 */

'use strict';

import {EventEmitter} from 'events';
import GetStatus from './model';
var GetStatusEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
GetStatusEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  GetStatus.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    console.log("HERE");
    GetStatusEvents.emit(event + ':' + doc._id, doc);
    GetStatusEvents.emit(event, doc);
  }
}

export default GetStatusEvents;
