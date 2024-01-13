import { ActionRowBuilder, ButtonBuilder } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
// import User from '#models/User';
import { generateEmbed } from '#utils/index';

@ApplyOptions<Command.Options>({ description: 'credit' })
export default class EconomyCommand extends Command {
  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(builder => builder.setName(this.name).setDescription(this.description), {
      guildIds: ['1179130438116196362'],
    });
  }

  public override async chatInputRun(ctx: Command.ChatInputCommandInteraction) {
    // const credit = await User.findOne({ guildId: ctx.guildId, userId: ctx.user.id });
    await ctx.reply({
      embeds: [
        generateEmbed({
          title: 'кредит?',
        }),
      ],
      components: [
        new ActionRowBuilder<ButtonBuilder>({
          components: [new ButtonBuilder({ custom_id: 'give_credit', style: 3, emoji: '💵', label: 'Взять кредит' })],
        }),
      ],
    });
  }
}
