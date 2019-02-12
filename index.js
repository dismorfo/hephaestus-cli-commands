'use strict';

class HephaestusCommands {
  constructor (program) {
    const { appDir, exists, readdirSync } = require('hephaestus');
    const pkg = require('./package.json');
    const { join } = require('path');
    const _ = require('underscore');
    this.version = pkg.version;
    this.name = pkg.name;
    try {
      const defaultCommands = join(__dirname, 'lib/commands');
      const localCommands = join(appDir(), 'app', 'commands');
      _.each([defaultCommands, localCommands], (path) => {
        if (exists(path)) {
            _.each(readdirSync(path), (directory) => {
              const commandsExists = join(path, directory, 'index.js');
            if (exists(commandsExists)) {
              const SubCommand = require(commandsExists);
              const subcommand = new SubCommand();
              subcommand.options.forEach((option) => {
                program.option(option.flag, option.description);
              });

              // if (_.isBoolean(subcommand.onDone)) {
                // if (subcommand.onDone) {
                  // process.agartha._onDone.push({ action: subcommand.action, command: subcommand.command});
                //}
              //}

              //if (_.isBoolean(subcommand.onForge)) {
                 // if (subcommand.onForge) {
                  // process.agartha._onForge.push({ action: subcommand.action, command: subcommand.command});
                // }
              //}
              // register command
              // .list = true or command was passed as argument

              if (subcommand.list || (!subcommand.list && !_.isUndefined(process.argv[2]) && process.argv[2] == subcommand.command)) {
                program.command(subcommand.command)
                  .description(subcommand.description)
                  .alias(subcommand.alias)
                  .action(subcommand.action);
                }
              }
            });
          }
      })
      program.parse(process.argv);
    }
    catch (e) {
      console.error(e);
    }
  }
}

exports = module.exports = HephaestusCommands;