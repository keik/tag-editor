let d = require('debug')('tag-editor:tags-store')

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
function TagsStore(dispatcher, tags) {
  d('#TagsStore')
  EventEmitter.call(this)
  this.dispatcher = dispatcher
  this.tags = tags
  this.dispatcher.on('reset', _resetTags.bind(this))
}

// extend
objectAssign(TagsStore.prototype, EventEmitter.prototype)

/*
 * methods
 */

objectAssign(TagsStore.prototype, {

  getAll: function() {
    d('#getAll')
    return this.tags
  }

})

/*
 * private methods
 */

function _resetTags(tags) {
  d('#_resetTags')
  this.tags = tags
  this.emit('reset', tags)
}

module.exports = TagsStore
