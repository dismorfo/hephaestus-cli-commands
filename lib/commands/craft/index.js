'use strict';

const agartha = require('hephaestus');

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

    agartha.log(this.description(), 'command');

    // see https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
    function capitalizeFirstLetter (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const componet = (!agartha._.isUndefined(this.parent.args[0])) ? this.parent.args[0] : false;

    const componets = [ 'page', 'command' ];

    if (agartha._.contains(componets, componet)) {
      switch (componet) {
        case 'page':
          const route = (!agartha._.isUndefined(this.parent.args[1])) ? this.parent.args[1] : false;
          const url = agartha.appUrl() + route;
          // do we have a valid URL?
          if (agartha.isUrl.isUri(url) && route.match('/index.html')) {
            // const re = new RegExp('\{([a-zA-Z]+)\}', 'g');            
            // console.log(re.exec(url));
            const re = /\{([a-zA-Z]+)\}/g;
            const dynamic = url.match(re);
            if (agartha._.isNull(dynamic)) {
              agartha._.templateSettings = {
                interpolate: /\{\{(.+?)\}\}/g
              };
              const template = agartha._.template(agartha.read.text(agartha.path.join(__dirname, 'templates/index.js.hbs')));
              let id = route.replace('/index.html', '');
                  id = id.slice(id.lastIndexOf('/'), id.length).replace('/', '');
              agartha.mkdir(agartha.path.join(agartha.appDir(), 'app/pages', id), () => {
                agartha.write(agartha.path.join(agartha.appDir(), 'app/pages', id, 'index.js'), template({
                    id: id,
                    title: capitalizeFirstLetter(id),
                    route: route
                  })
                );
              });
            }
          }
          else {
            agartha.log('Not a valid route', 'error');
          }
          break;
      }
    }
  }

}
