import { ApplyOptions } from '@sapphire/decorators';
import Biz from '#lib/models/Biz';
import { Command } from '@sapphire/framework';

@ApplyOptions<Command.Options>({ description: 'buy biz' })
export default class EconomyCommand extends Command {
  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      builder =>
        builder
          .setName(this.name)
          .setDescription(this.description)
          .addUserOption(option => option.setName('member').setDescription('zam id').setRequired(true)),
      {
        guildIds: ['1179130438116196362'],
      },
    );
  }

  public override async chatInputRun(ctx: Command.ChatInputCommandInteraction) {
    const target = ctx.options.getUser('member', true);
    const biz = await Biz.findOne({ guildId: ctx.guildId, userId: ctx.user.id });

    if (!biz) {
      await ctx.reply({ content: 'У вас нет бизнеса', ephemeral: true });
      return;
    } else if (ctx.user.id === target.id) {
      await ctx.reply({ content: 'Вы не можете сделать себя заместителем', ephemeral: true });
      return;
    } else if (biz.bizZam.includes(target.id)) {
      await ctx.reply({ content: 'Пользователь уже являться заместителем', ephemeral: true });
      return;
    }

    await biz.updateOne({ $push: { bizZam: target } });
    await ctx.reply({ content: `Вы назначили <@${target.id}> на замку`, ephemeral: true });
  }
}
