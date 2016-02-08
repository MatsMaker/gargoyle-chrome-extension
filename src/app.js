'use strict';

/*
*  sprite map http://retrogamezone.co.uk/
*/
import WormOfTags from './WormOfTags';

// require("./styles/main.css");

let wormOfTags = new WormOfTags();

chrome.extension.sendRequest('app_id', function(app_id){
    wormOfTags.init({
      app_id: app_id
    });
});

exports.wormOfTags = wormOfTags;
