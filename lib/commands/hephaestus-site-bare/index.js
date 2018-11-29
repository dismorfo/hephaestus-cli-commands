'use strict';

const { agartha } = require('hephaestus');

exports = module.exports = class HephaestusBareSite extends agartha.Command {

  get command () {
    return 'hephaestus-site-bare';
  }

  get description () {
    return 'Build simple site using hephaestus-cli';
  }

  action () {
    agartha.log(this.description(), 'ok');
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
      .on('error', (error) => {
        console.log(error);
      })
      .pipe(fs.createWriteStream(zipFile))
      .on('finish', function() {
        const zip = new admZip(zipFile);
        zip.extractAllTo(agartha.appDir(), true);
        agartha.rimraf(agartha.path.join(agartha.appDir(), zipFile), () => {
          _.each(agartha.readdirSync(dir), (item) => {
            const destination = agartha.path.join(agartha.appDir(), item)
            const source = agartha.path.join(dir, item);
            if (agartha.exists(source)) {
              ncp(source, destination, (err) => {
                if (err) return console.error(err)
              });
            }
          })
        });
      });
    
    nodeCleanup(() => {
      exec(`rm -r ${dir}`, function (err, stdout, stderr) {
        console.log(stdout)
      });
    });

  }

}
