'use strict';

const { agartha } = require('hephaestus');

exports = class Upgrade extends agartha.Command {

  get command () {
    return 'upgrade';
  }

  get alias () {
    return 'up';
  }

  get description () {
    return 'Upgrade application';
  }

  action () {
    try {
      const AutoUpdate = require('./autoupdater');
      new AutoUpdate().on('finish', () => console.log('Finished updating'));
    } 
    catch (e) {
      agartha.exit(e);
    }
  }

}
