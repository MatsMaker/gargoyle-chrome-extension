'use strict';

class Dummy {

  constructor(settings){
    this._$ = require('jquery');
    let self = this;
    let $ = this._$;

    this.conf = $.extend({
      /*position: {
        x: 0,
        y: 0
      },
      'background-image': 'url("./img/demonscrestsheet7.gif")',
      animationState: [{
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
      }]*/
    }, settings);

    let newBody = $('<div>').addClass('griffin');

    newBody.css({
      'position': 'absolute',
      'background-image': this.conf['background-image']
    });

    this.body = newBody;
    this._position = (this.conf.position) ? this.conf.position : {x: 0, y:0};
    this.body.animationState = (this.conf.animationState) ? this.conf.animationState : [];

    this._animationMark;
    this._positionMark;
  };

  _calcPositionOfStyles (position, styles){
    let newStyle =  Object.assign({}, styles);
    newStyle.top += (position.y + styles.top);
    newStyle.left += (position.x + styles.left);

    return newStyle;
  };

  _animateState(state){
    let animState = this.body.animationState.find(function(animState){
      return animState.id == state;
    });

    let calcPositionOfStyles = this._calcPositionOfStyles({
        x: this._position.x,
        y: this._position.y - animState.css.height * 2.4
      }, animState.css);

    this.body.css(calcPositionOfStyles);
    this._state = animState.id;

    return this;
  }

  _animate(anim){
    let self = this;
    if(anim == 'stop'){
      clearInterval(self._animationMark);
      return self;
    };

    let animStateList = (anim.states) ? anim.states : [1, 2, 3, 4];
    let speed = (anim.speed) ? anim.speed : 70;
    let repeat = (anim.repeat) ? anim.repeat : false;
    let curentStete = 0;

    var step = function(){
      if(curentStete < animStateList.length){
        self._animateState(animStateList[curentStete]);
        curentStete ++;
      }else{
        clearInterval(self._animationMark);
        curentStete = 1;
        if(repeat){
          self._animationMark = setInterval(step, speed);
        }
      }
    };

    self._animationMark = setInterval(step, speed);

    return self;
  };

  position (point){
    if(point === undefined){
      return this._position;
    }else{
      this._position = point;
      this._refresh();
      return this;
    }
  };

  state (numberState){
    if(numberState === undefined){
      return this._state;
    }else{
      this._state = numberState;
      this._animateState(numberState);
      return this;
    }
  }

  appendTo(obj){
    obj.append(this.body);

    return this;
  };

  _refresh(){
    let curentState = this._state;
    this.state(curentState);

    return this;
  };

  goTo (position, callback, velocity){
    let self = this;
    clearInterval(self._positionMark);
    let endPosition = position;
    let cb = (callback) ? callback : () => {};
    let speed = (velocity) ? velocity : 1;
    let curentStete = 0;
    let nexPoz = {
        x: 0,
        y:0
    };
    let currentPosition = this._position;

    let findNexPosition = (currentP, goalP, step) => {

      let calcForPoint = (cP, gP, s) => {
        let diff = cP - gP;
        if(Math.abs(diff) > s){
          return (diff > 0) ? cP - s : cP + s;
        }else{
          return gP;
        }
      };

      let findX = calcForPoint(currentP.x, goalP.x, step);
      let findY = calcForPoint(currentP.y, goalP.y, step);

      return {
        x: findX,
        y: findY
      };
    };

    var step = function(){
      if(currentPosition.x == endPosition.x && currentPosition.y == endPosition.y){
        clearInterval(self._positionMark);
        curentStete = 0;
        callback(self);
      }else{
        currentPosition = findNexPosition(currentPosition, endPosition, speed);
        self.position(currentPosition);
        self._refresh();
        curentStete ++;
      }
    };

    self._positionMark = setInterval(step, speed);

    return this
  };


};

module.exports = Dummy;
