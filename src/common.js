'use strict';

let help = {
  getRandomInt: function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
};

module.exports = help; 
