'use strict';

const { agartha } = require('hephaestus');

module.exports = class Craft extends agartha.Command {

  get list () {
    // do not register command if hephaestus.js does not exists
    if (!agartha.exists(agartha.path.join(agartha.appDir(), 'hephaestus.js'))) {
      return false;
    }
    return true;
  }

  get command () {
    return 'craft';
  }

  get description () {
    return 'Craft componets';
  }

  action () {
    agartha.log(this.description(), 'ok');
    const componet = (!agartha._.isUndefined(this.parent.args[0])) ? this.parent.args[0] : false;
    const componets = [ 'page', 'command' ]; 
    if (agartha._.contains(componets, componet)) {
      switch (componet) {
        case 'page':
          const route = (!agartha._.isUndefined(this.parent.args[1])) ? this.parent.args[1] : false;
          console.log(componet)
          console.log(route)
          break;
      }
    }
  }

}
