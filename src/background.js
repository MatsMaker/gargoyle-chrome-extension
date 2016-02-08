'use strict';

var extension_id = chrome.runtime.id;
localStorage.setItem("app_id", extension_id);

chrome.extension.onRequest.addListener(function(request, sender, callback) {
  console.log(request, sender, callback);
  if(request == "app_id")
    callback(chrome.runtime.id);
})
