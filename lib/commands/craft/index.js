'use strict';

const { Command, appDir, appUrl, exists, isUrl, log, mkdir, read, write } = require('hephaestus');
const { join, resolve } = require('path');
const _ = require('underscore');

class Craft extends Command {

  get list () {
    // do not register command if hephaestus.js does not exists
    if (!exists(resolve(appDir(), 'hephaestus.js'))) {
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

    log(this.description(), 'command');

    // see https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
    function capitalizeFirstLetter (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const componet = (!_.isUndefined(this.parent.args[0])) ? this.parent.args[0] : false;

    const componets = [ 'page', 'command' ];

    if (_.contains(componets, componet)) {
      switch (componet) {
        case 'page':
          const route = (!_.isUndefined(this.parent.args[1])) ? this.parent.args[1] : false;
          const url = appUrl() + route;
          // do we have a valid URL?
          if (isUrl.isUri(url) && route.match('/index.html')) {
            const re = /\{([a-zA-Z]+)\}/g;
            const dynamic = url.match(re);
            if (_.isNull(dynamic)) {
              _.templateSettings = { interpolate: /\{\{(.+?)\}\}/g };
              const template = _.template(read.text(resolve(__dirname, 'templates/index.js.hbs')));
              let id = route.replace('/index.html', '');
                  id = id.slice(id.lastIndexOf('/'), id.length).replace('/', '');
              mkdir(join(appDir(), 'app/pages', id), () => {
                write(join(appDir(), 'app/pages', id, 'index.js'), template({
                    id: id,
                    title: capitalizeFirstLetter(id),
                    route: route
                  })
                );
              });
            }
          }
          else {
            log('Not a valid route', 'error');
          }
          break;
      }
    }
  }

}

module.exports = Craft;
