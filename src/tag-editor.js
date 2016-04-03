let d = require('debug')('tag-editor')

module.exports = TagEditor

function TagEditor() {
  d('#TagEditor')
}

TagEditor.prototype.destroy = function() {
  d('#destroy')
}
