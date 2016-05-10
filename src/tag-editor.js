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
    tagsContainerClass: 'te-tags-container'
  }, options)

  // TODO modular
  this.tagsStore = []

  /*
   * initialize DOM elements
   */

  this.inputEl = inputEl
  this.styleEl = document.createElement('style')
  this.tagsContainerEl = document.createElement('ul')

  this.styleEl.textContent = `
.${this.options.tagsContainerClass} {
  position: absolute;
  top: ${this.inputEl.offsetTop}px;
  left: ${this.inputEl.offsetLeft}px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.${this.options.tagsContainerClass} > li {
  display: inline-block;
  margin-left: 4px;
  background-color: lightblue;
  border-radius: 3px;
}`

  this.tagsContainerEl.className = this.options.tagsContainerClass

  document.body.appendChild(this.tagsContainerEl)
  document.querySelector('head').appendChild(this.styleEl)

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
  let tagEl = document.createElement('li'),
      removeBtnEl = document.createElement('button')
  tagEl.textContent = tag
  removeBtnEl.textContent = '×'
  tagEl.appendChild(removeBtnEl)
  this.tagsContainerEl.appendChild(tagEl)
  _render.bind(this)()
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
  value.split(/ +/)
    .filter(tag => tag !== '')
    .forEach(tag => {
      // TODO dispatch action
      this.tagsStore.push(tag)
      _handleTagsStoreAdded.bind(this)(tag)
    })
}

function _render() {
  d('#_render')
  this.inputEl.value = this.state.value
  let lastTagEl = this.tagsContainerEl.lastChild
  if (lastTagEl)
    this.inputEl.style.paddingLeft = lastTagEl.offsetLeft + lastTagEl.offsetWidth + 2 + 'px'
}

module.exports = TagEditor
