'use strict'
const Commands = class {
  constructor (program) {
    this.version = '2.0.1'
    this.name = 'agartha-cli-commands'
    try {
      const agartha = process.agartha
      const defaultCommands = agartha.path.join(__dirname, 'lib/commands')
      const isProject = agartha.isProject()
      const localCommands = agartha.path.join(agartha.appDir(), 'app', 'commands')
      let relicCommands = null      
      if (isProject) {
        relicCommands = agartha.relicDir()
      }
      agartha._.each([defaultCommands, relicCommands, localCommands], (path) => {
        if (agartha.exists(path)) {
            agartha._.each(agartha.readdirSync(path), (directory) => {
            const exists = agartha.path.join(path, directory, 'index.js')
            if (agartha.exists(exists)) {
              const SubCommand = require(exists)
              const subcommand = new SubCommand()
              subcommand.options.forEach((option) => {
                program.option(option.flag, option.description)
              })
              if (agartha._.isBoolean(subcommand.onDone)) {
                if (subcommand.onDone) {
                  process.agartha._onDone.push({ action: subcommand.action, command: subcommand.command})
                }
              }
              if (agartha._.isBoolean(subcommand.onForge)) {
                if (subcommand.onForge) {
                  process.agartha._onForge.push({ action: subcommand.action, command: subcommand.command})
                }
              }              
              program.command(subcommand.command)
                .description(subcommand.description)
                .alias(subcommand.alias)
                .action(subcommand.action)
              }
            })
          }
      })
      program.parse(process.argv)    
    } catch (e) {
      console.error('outer', e.message)
    }
  }
}

exports = module.exports = Commands
