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

/*
 * load modules
 */

let ActionDispatcher = require('./action-dispatcher')
let TagsStore = require('./tags-store')

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

  this.action = ActionDispatcher.getInstance()
  this.tagsStore = new TagsStore()

  /*
   * initialize DOM elements
   */

  this.inputEl = inputEl
  this.styleEl = document.createElement('style')
  this.tagsContainerEl = document.createElement('ul')

  let computed = window.getComputedStyle(this.inputEl)
  this.styleEl.textContent = `
.${this.options.tagsContainerClass} {
  display: flex;
  align-items: center;
  position: absolute;
  top: ${this.inputEl.offsetTop}px;
  left: ${this.inputEl.offsetLeft}px;
  height: ${this.inputEl.offsetHeight}px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.${this.options.tagsContainerClass} > li {
  display: flex;
  align-items: center;
  padding: 2px;
  margin-left: 4px;
  height: ${parseInt(computed.fontSize, 0) + 8}px;
  max-height: ${computed.height};
  font-size: ${computed.fontSize};
  background-color: lightblue;
  border-radius: 3px;
  box-sizing: border-box;
}
.${this.options.tagsContainerClass} > li > button {
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0 2px;

  font-size: ${computed.fontSize};
  background-color: lightblue;
  border: none;
  cursor: pointer;
}
.${this.options.tagsContainerClass} > li > button:after {
  content: '×';
}`

  this.tagsContainerEl.className = this.options.tagsContainerClass

  document.body.appendChild(this.tagsContainerEl)
  document.querySelector('head').appendChild(this.styleEl)

  /*
   * UI event handler
   */

  this.inputEl.addEventListener('keyup', _onInputKeyup.bind(this))

  /*
   * model event handler
   */

  this.tagsStore.on('add', _handleTagsStoreAdd.bind(this))
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

function _handleTagsStoreAdd(tag) {
  d('#_handleTagsStoreAdd', tag)
  let tagEl = document.createElement('li'),
      removeBtnEl = document.createElement('button')
  tagEl.textContent = tag
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
      this.action.add(tag)
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
