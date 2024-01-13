import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import User from '#models/User';
import { generateEmbed } from '#utils/embed';

@ApplyOptions<Command.Options>({ description: 'credit' })
export default class EconomyCommand extends Command {
  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(builder => builder.setName(this.name).setDescription(this.description), {
      guildIds: ['1179130438116196362'],
    });
  }

  public override async chatInputRun(ctx: Command.ChatInputCommandInteraction) {
    const options = { guildId: ctx.guildId, userId: ctx.user.id };
    let user = await User.findOne(options);
    if (!user) user = await User.create(options);
    await ctx.reply({
      embeds: [
        generateEmbed({
          title: `Баланс ${user.money} \n Кредит ${user.credit}`,
        }),
      ],
    });
  }
}
