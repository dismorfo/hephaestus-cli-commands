'use strict';

exports = module.exports = class HephaestusCommands {
  constructor (program) {
    const agartha = require('hephaestus');
    const pkg = require('./package.json');
    this.version = pkg.version;
    this.name = pkg.name;
    try {
      const defaultCommands = agartha.path.join(__dirname, 'lib/commands');
      const isProject = agartha.isProject();
      const localCommands = agartha.path.join(agartha.appDir(), 'app', 'commands');
      agartha._.each([defaultCommands, localCommands], (path) => {
        if (agartha.exists(path)) {
            agartha._.each(agartha.readdirSync(path), (directory) => {
            const exists = agartha.path.join(path, directory, 'index.js');
            if (agartha.exists(exists)) {
              const SubCommand = require(exists);
              const subcommand = new SubCommand();
              subcommand.options.forEach((option) => {
                program.option(option.flag, option.description);
              });
              if (agartha._.isBoolean(subcommand.onDone)) {
                if (subcommand.onDone) {
                  process.agartha._onDone.push({ action: subcommand.action, command: subcommand.command});
                }
              }
              if (agartha._.isBoolean(subcommand.onForge)) {
                if (subcommand.onForge) {
                  process.agartha._onForge.push({ action: subcommand.action, command: subcommand.command});
                }
              }
              // register command
              // .list = true or command was passed as argument
              if (subcommand.list || (!subcommand.list && !agartha._.isUndefined(process.argv[2]) && process.argv[2] == subcommand.command)) {
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
      console.error(e)
    }
  }
}
