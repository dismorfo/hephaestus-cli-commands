'use strict';

const { agartha } = require('hephaestus');

exports = class HephaestusBareSite extends agartha.Command {

  get command () {
    return 'hephaestus-site-bare';
  }

  get description () {
    return 'Build simple site using hephaestus-cli';
  }

  action () {
    agartha.log(this.description(), 'ok');
    // const Git = require('nodegit');
    // Git.Clone('https://github.com/dismorfo/hephaestus-site-bare', 'hephaestus-site-bare').then((repository) => {
      // mkdir: commands, helpers, public, images, javascript, localsource, pages, pages/front, pages/search, partials, sass
      // commands/hephaestus-example/index.js
      // helpers/Handlebars.isHome.js
      // javascript/ui.js
      // localsource/projects.js
      // pages/front
      // pages/search (use https://lunrjs.com/)
      // partials/
      // sass/style.scss
      // sass/_functions.scss
      // agartha._.each(agartha.readdirSync(path), (directory) => {
    // });
  }

}
