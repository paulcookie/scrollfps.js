/* ==========================================================
 * scrollfps.js - v0.2.0 - 2014-01-21
 * https://github.com/graycoder/scrollfps.js
 * ==========================================================
 * Copyright (c) 2013 Paul Pechenin <paul.pechenin@gmail.com>
 * Licensed under the MIT license
 * ========================================================== */

+function(win, doc, body) { "use strict";

  var support = (function() {
    var element = doc.createElement('x')
    element.style.cssText = 'pointer-events:auto'
    return element.style.pointerEvents === 'auto'
  }())

  if (!support || body.dataset.scrollfps === undefined)
    return

  doc.addEventListener('DOMContentLoaded', function() {
    var cover = doc.createElement('div'),
        scrollStarted = false,
        clicked = false,
        pos = {x: 0, y: 0},
        timer

    cover.style.cssText = [
      '-webkit-transform: translate3d(0,0,0);',
      'transform: translate3d(0,0,0);',
      'position: fixed;',
      'top: 0;',
      'right: 0;',
      'left: 0;',
      'bottom: 0;',
      'opacity: 0;',
      'z-index: 9999;',
      'pointer-events: none;'
    ].join('')

    body.appendChild(cover)

    win.addEventListener('scroll', function() {
      if (!scrollStarted) {
        cover.style.pointerEvents = 'auto'
        scrollStarted = true
      }
      clearTimeout(timer)

      timer = setTimeout(function() {
        cover.style.pointerEvents = 'none'
        scrollStarted = false
        if (clicked) {
          dispatchClick(pos)
          clicked = false
        }
      }, 200)
    }, false)

    doc.addEventListener('click', function(e) {
      if (e.target === cover && !e.synthetic) {
        pos.x = e.clientX
        pos.y = e.clientY
        clicked = true
      }
    }, false)
  }, false)

  function dispatchClick(pos) {
    var event = doc.createEvent('MouseEvent'),
        element = doc.elementFromPoint(pos.x, pos.y)

    event.initMouseEvent(
      'click',  // type
      true,     // canBubble
      true,     // cancelable
      win,      // view
      null,     // detail
      pos.x,    // screenX
      pos.y,    // screenY
      0,        // clientX
      0,        // clientY
      false,    // ctrlKey
      false,    // altKey
      false,    // shiftKey
      false,    // metaKey
      0,        // button
      null      // relatedTarget
    )
    event.synthetic = true
    element.dispatchEvent(event)
  }

}(window, document, document.body);
