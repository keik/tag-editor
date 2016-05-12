let d = require('debug')('tag-editor:tags-store')

/*
 * load deps
 */

let objectAssign = require('object-assign')

/*
 * load modules
 */

let EventEmitter = require('./event-emitter')
let ActionDispatcher = require('./action-dispatcher')

/**
 * @coustructor
 * @param {EventEmitter} dippatcher
 * @param {Array.<Object>} tags
 */
function TagsStore() {
  d('#TagsStore')
  EventEmitter.call(this)

  this.tags = []

  let action = ActionDispatcher.getInstance()
  action.on('add', _addTag.bind(this))
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

function _addTag(tag) {
  d('#_addTag')
  this.tags.push(tag)
  this.emit('add', tag)
}

module.exports = TagsStore
