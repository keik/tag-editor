var test = require('tape'),
    jsdom = require('jsdom'),
    TagEditor = require('../src/tag-editor')

var window = global.window = jsdom.jsdom('<input id="target" name="tags" type="text"/>').defaultView,
    document = global.document = window.document

var $ = document.querySelector.bind(document),
    $$ = document.querySelectorAll.bind(document)

test('with default options', function(t) {
  var inputEl = $('#target'),
      tagEditor = new TagEditor(inputEl)

  t.end()
  tagEditor.destroy()
})
