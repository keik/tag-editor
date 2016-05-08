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
  }

  this.options = objectAssign({
    // TODO define defaults
  }, options)

  /*
   * initialize DOM elements
   */

  this.inputEl = inputEl

  /*
   * UI event handler
   */

  this.inputEl.addEventListener('keyup', _onInputKeyup.bind(this));
}

/*
 * methods
 */

TagEditor.prototype.destroy = function() {
  d('#destroy')
}

/*
 * UI event handlers
 */

function _onInputKeyup(e) {
  d('#_onInputKeyup')
}

module.exports = TagEditor
