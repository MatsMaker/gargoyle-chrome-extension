'use strict';


class WormOfTags{

  constructor(){
    this.griffin;
  };

  init(opt){
    let $ = require('jquery');
    let help = require('./common');
    let Griffin = require('./Griffin');

    let getRandomElement = function(){
      let allEl = $('body *');
      let randBob = help.getRandomInt(0, allEl.length);
      let $randEl = $(allEl[randBob]);
      return $randEl;
    };

    let griffin = new Griffin({
      url: 'chrome-extension://' + opt.app_id,
      position: {
        x: 0,
        y: 61
      }
    });

    griffin
      .freeze()
      .appendTo($('body'));

    let viewPort = $('body');

    let maxX = viewPort.width();
    let maxY = viewPort.height();

    let randomEl = getRandomElement();

    $('body').on('click', function(ev){
      griffin.notMove();
      if(ev.ctrlKey === true){
        ev.preventDefault();
        griffin.stealEl(ev.target,function(){
          console.log('steal');
        });
      }else{
        let positionEl = $(ev.target).offset();
        griffin.moveTo({x:positionEl.left, y:positionEl.top}, function(){
          griffin.freeze();
        });
      }
    });

  }

};

export default WormOfTags;
