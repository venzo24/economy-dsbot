import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';

@ApplyOptions<Command.Options>({ description: 'biz info' })
export default class EconomyCommand extends Command {
  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(builder => builder.setName(this.name).setDescription(this.description), {
      guildIds: ['1179130438116196362'],
    });
  }
}
