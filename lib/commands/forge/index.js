'use strict';

const { appDir, appBuildDir, canWrite, Command, exit, exists, forge, rimraf } = require('hephaestus');
const { resolve } = require('path');
const _ = require('underscore');

module.exports = class Forge extends Command {

  get command () {
    return 'forge';
  }

  get alias () {
    return 'fg';
  }

  get description () {
    return 'Forge a project';
  }

  action () {
    try {
      const project = exists(resolve(appDir(), 'hephaestus.js'));
      if (project) {
        if (exists(appBuildDir())) {
           canWrite(appBuildDir()).then((writable) => {
             if (writable) {
               rimraf(appBuildDir(), () => {
                 //_.forEach(agartha._onForge, (callback) => {
                 //  if (agartha._.isFunction(callback.action)) {
                 //    callback.action();
                 //  }
                 //});
                 forge();
               });
             }
           }).catch(error => {
             exit(error);
           });
         }
         else {
           forge();
         }
      } else {
        exit(new Error('Can not forge, make sure you have hephaestus.js in your project.'));
      }
    } 
    catch (error) {
      console.log(error);
      exit(error);
    }
  }
}
