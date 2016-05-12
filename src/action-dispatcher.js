let d = require('debug')('tag-editor:action-dispatcher')

// singleton
let instance = null

/*
 * load deps
 */

let objectAssign = require('object-assign')

/*
 * load modules
 */

let EventEmitter = require('./event-emitter')

/**
 * @coustructor
 * @param {EventEmitter} dippatcher
 * @param {Array.<Object>} tags
 */
function ActionDispatcher() {
  d('#ActionDispatcher')
  EventEmitter.call(this)
}

// extend
objectAssign(ActionDispatcher.prototype, EventEmitter.prototype)

/*
 * methods
 */

objectAssign(ActionDispatcher.prototype, {

  add: function(tag) {
    d('#add')
    this.emit('add', tag)
  },

  remove: function(tag) {
    d('#remove')
    console.log('TODO remove', tag);
  }

})

module.exports = {
  getInstance: function() {
    if (instance == null)
      instance = new ActionDispatcher()
    return instance
  }
}
