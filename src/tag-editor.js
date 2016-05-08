/*
 * https://github.com/keik/tag-editor
 * @version v0.0.0-pre
 * @author keik <k4t0.kei@gmail.com>
 * @license MIT
 */

let d = require('debug')('tag-editor')

/*
 * load deps
 */

let objectAssign = require('object-assign')

/**
 * @constructor
 * @param {HTMLInputElement} inputEl
 * @param {Object} options
 */
function TagEditor(inputEl, options) {
  d('#TagEditor')

  this.state = {
    // TODO define state
    value: ''
  }

  this.options = objectAssign({
    // TODO define defaults
  }, options)

  // TODO modular
  this.tagsStore = []

  /*
   * initialize DOM elements
   */

  this.inputEl = inputEl
  this.tagsContainerEl = document.createElement('ul')
  document.body.appendChild(this.tagsContainerEl)

  /*
   * UI event handler
   */

  this.inputEl.addEventListener('keyup', _onInputKeyup.bind(this));

  /*
   * model event handler
   */

  // this.tagsStore.on('add', _handleTagsStoreAdded.bind(this))
}

/*
 * methods
 */

TagEditor.prototype.destroy = function() {
  d('#destroy')
}

/*
 * store event handlers
 */

function _handleTagsStoreAdded(tag) {
  d('#_handleTagsStoreAdded', tag)
  let tagEl = document.createElement('li')
  tagEl.textContent = tag
  this.tagsContainerEl.appendChild(tagEl)
}

function _handleTagsStoreRemoved(tag) {
  d('#_handleTagsStoreRemoved', tag)
  console.log('TODO')
}

/*
 * UI event handlers
 */

function _onInputKeyup(e) {
  d('#_onInputKeyup')
  let value = this.state.value = this.inputEl.value
  if ((/ /).test(value)) {
    _taggify.bind(this)(value)
    this.state.value = ''
  }
  _render.bind(this)()
}

/*
 * view functions
 */

function _taggify(value) {
  d('#_taggify')
  value.split(/ +/).forEach(function(tag) {
    // TODO dispatch action
    this.tagsStore.push(tag)
    _handleTagsStoreAdded.bind(this)(tag)
  }.bind(this))
}

function _render() {
  d('#_render')
  this.inputEl.value = this.state.value
}

module.exports = TagEditor
