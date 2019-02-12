'use strict';

const { appDir, Command, exists, log, rimraf, readdirSync } = require('hephaestus');
const { resolve } = require('path');

class HephaestusBareSite extends Command {

  get list () {
    // do not register command if app directory already have hephaestus.js
    if (exists(resolve(appDir(), 'hephaestus.js'))) {
      return false;
    }
    return true;
  }

  get command () {
    return 'hephaestus-site-bare';
  }

  get description () {
    return 'Build simple site using hephaestus-cli';
  }

  action () {
    log(this.description(), 'ok');
    const { ncp } = require('ncp');
    const _ = require('underscore');
    const admZip = require('adm-zip');
    const request = require('request');
    const fs = require('fs');
    const repoName = 'hephaestus-site-bare';
    const nodeCleanup = require('node-cleanup');
    const href = `https://github.com/dismorfo/${repoName}/archive/master.zip`;
    const zipFile = 'master.zip';
    const dir = agartha.path.join(agartha.appDir(), `${repoName}-master`);
    const exec = require('child_process').exec;
    request
      .get(href)
      .on('error', error => {
        console.log(error);
      })
      .pipe(fs.createWriteStream(zipFile))
      .on('finish', () => {
        const zip = new admZip(zipFile);
        zip.extractAllTo(agartha.appDir(), true);
        rimraf(resolve(appDir(), zipFile), () => {
          _.each(readdirSync(dir), (item) => {
            const destination = resolve(agartha.appDir(), item)
            const source = resolve(dir, item);
            if (exists(source)) {
              ncp(source, destination, (err) => {
                if (err) return console.error(err)
              });
            }
          })
        });
      });
    
    nodeCleanup(() => {
      exec(`rm -r ${dir}`, (err, stdout, stderr) => {
        console.log(stdout)
      });
    });

  }

}

module.exports = HephaestusBareSite;
