// Copyright Muxup contributors.
// Distributed under the terms of the MIT license, see LICENSE for details.
// SPDX-License-Identifier: MIT

// Set to true to enable reloading from first load.
const enableByDefault = false;
// Firefox triggers blur/focus events when resizing, so we ignore a focus
// following a blur within 200ms (assumed to be generated by resizing rather
// than human interaction).
let blurTimeStamp = null;
function focusListener(ev) {
  if (ev.timeStamp - blurTimeStamp >= 200) {
    location.reload();
  }
}
function blurListener(ev) {
  if (blurTimeStamp === null) {
    window.addEventListener("focus", focusListener);
  }
  blurTimeStamp = ev.timeStamp;
}
function deactivate() {
  sessionStorage.removeItem("simple-reload");
  window.removeEventListener("focus", focusListener);
  window.removeEventListener("blur", blurListener);
  document.title = document.title.replace(/^\u27F3 /, "");
  window.addEventListener("dblclick", activate, { once: true });
}
function activate() {
  sessionStorage.setItem("simple-reload", "activated");
  location.reload();
}
if (enableByDefault || sessionStorage.getItem("simple-reload") == "activated") {
  document.title = "\u27F3 " + document.title;
  sessionStorage.setItem("simple-reload", "activated");
  window.addEventListener("blur", blurListener);
  window.addEventListener("dblclick", deactivate, { once: true });
} else {
  window.addEventListener("dblclick", activate);
}