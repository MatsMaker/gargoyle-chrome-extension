'use strict';

import Dummy from './Dummy';

class Griffin extends Dummy{

  constructor(settings){
    let appUrl = settings.url;
    let configurate = {
      position: {
        x: 0,
        y: 0
      },
      'background-image': 'url("'+ appUrl + '/img/demonscrestsheet7.gif")',
      animationState: [{
        id: -7,
        css: {
          'width': 143,
          'height': 61,
          'top': 39,
          'left': -28,
          'background-position-x': -207,
          'background-position-y': 60,
          'z-index': 9999
        }
      },{
        id: -6,
        css: {
          'width': 145,
          'height': 61,
          'top': 49,
          'left': 0,
          'background-position-x': -262,
          'background-position-y': 116,
          'z-index': 9999
        }
      },{
        id: -5,
        css: {
          'width': 62,
          'height': 60,
          'top': 45,
          'left': 0,
          'background-position-x': 260,
          'background-position-y': 0,
          'z-index': 9999
        }
      },{
        id: -4,
        css: {
          'width': 61,
          'height': 83,
          'top': 49,
          'left': 0,
          'background-position-x': 260,
          'background-position-y': -331,
          'z-index': 9999
        }
      },{
        id: -3,
        css: {
          'width': 61,
          'height': 61,
          'top': 39,
          'left': 0,
          'background-position-x': -328,
          'background-position-y': -53,
          'z-index': 9999
        }
      },{
        id: -2,
        css: {
          'width': 61,
          'height': 61,
          'top': 39,
          'left': 0,
          'background-position-x': -393,
          'background-position-y': -53,
          'z-index': 9999
        }
      },{
        id: -1,
        css: {
          'width': 61,
          'height': 100,
          'top': 43,
          'left': 0,
          'background-position-x': 61,
          'background-position-y': -15,
          'z-index': 9999
        }
      },{
        id: 1,
        css: {
          'width': 61,
          'height': 100,
          'top': 43,
          'left': 0,
          'background-position-x': -1,
          'background-position-y': -15,
          'z-index': 9999
        }
      },{
        id: 2,
        css: {
          'width': 61,
          'height': 61,
          'top': 39,
          'left': 0,
          'background-position-x': -67,
          'background-position-y': -53,
          'z-index': 9999
        }
      },{
        id: 3,
        css: {
          'width': 61,
          'height': 61,
          'top': 39,
          'left': 0,
          'background-position-x': -133,
          'background-position-y': -53,
          'z-index': 9999
        }
      },{
        id: 4,
        css: {
          'width': 61,
          'height': 83,
          'top': 49,
          'left': 0,
          'background-position-x': -199,
          'background-position-y': -331,
          'z-index': 9999
        }
      },{
        id: 5,
        css: {
          'width': 62,
          'height': 60,
          'top': 45,
          'left': 0,
          'background-position-x': -200,
          'background-position-y': 0,
          'z-index': 9999
        }
      },{
        id: 6,
        css: {
          'width': 145,
          'height': 61,
          'top': 49,
          'left': -47,
          'background-position-x': -115,
          'background-position-y': 116,
          'z-index': 9999
        }
      },{
        id: 7,
        css: {
          'width': 143,
          'height': 61,
          'top': 39,
          'left': -28,
          'background-position-x': -117,
          'background-position-y': 60,
          'z-index': 9999
        }
      }]
    };
    let state = Object.assign(configurate, settings);
    state.animationState.sort(function(a, b) {
      return a.id - b.id;
    });
    super(state);

  };

  fly (){
    let states = this.state();
    if(states > 0){
      states = [1,1,2,3,4,4,3,2,1,1];
    }else{
      states = [-1,-2,-3,-4,-4,-3,-2,-1];
    }
    this._animate({states: states, repeat: true});

    return this;
  };

  glide (){
    this._animate('stop');
    this.state(2);
  };

  freeze (){
    this._animate('stop');
    if(this.state() > 0){
      this.state(5);
    }else{
      this.state(-5);
    }
    return this;
  };

  blowAway () {
    this._animate('stop');
    let states = this.state();
    if(states > 0){
      states = [1,3,4,6,4,3,1];
    }else{
      states = [-1,-3,-4,-6,-4,-3,-1];
    }
    this._animate({states: states, repeat: true});

    return this;
  };

  notMove (){
    this._animate('stop');
  };

  _moveTo (position, callback, velocity){
    if(this._position.x > position.x){
      this.state(1);
    }else{
      this.state(-1);
    }

    this.fly();

    let cbFunction = function(bummy){
      bummy.notMove();
      callback(bummy);
    };
    this.goTo(position, cbFunction, velocity);
  };

  moveTo (position, callback, velocity){
    this._moveTo(position, callback, velocity);
  };

  stealEl (element, cb){
    let posEl = this._$(element).offset();
    let self = this;

    self._moveTo({
      x: posEl.left,
      y: posEl.top
    }, function(){
        self.blowAway();
        self._$(element).fadeOut(3000, function(){
        self.freeze();
        cb();
      });
    });
  };

};

module.exports = Griffin;
