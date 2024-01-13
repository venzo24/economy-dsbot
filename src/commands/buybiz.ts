import { ActionRowBuilder, ButtonBuilder } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import User from '#models/User';
import { generateEmbed } from '#utils/embed';

@ApplyOptions<Command.Options>({ description: 'buy biz' })
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
          title: 'Меню покупки бизнеса',
          description: `Выберите ниже бизнес который хотите купить`,
        }),
      ],
      components: [
        new ActionRowBuilder<ButtonBuilder>({
          components: [
            new ButtonBuilder({ custom_id: 'buy_biz1', style: 3, emoji: '💵', label: 'Купить ID1' }),
            new ButtonBuilder({ custom_id: 'buy_biz2', style: 3, emoji: '💵', label: 'Купить ID2' }),
            new ButtonBuilder({ custom_id: 'buy_biz3', style: 3, emoji: '💵', label: 'Купить ID3' }),
          ],
        }),
      ],
    });
  }
}
