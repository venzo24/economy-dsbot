import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework';
import type { ModalSubmitInteraction } from 'discord.js';
import User from '#models/User';

export class ModalHandler extends InteractionHandler {
  public constructor(ctx: InteractionHandler.LoaderContext, options: InteractionHandler.Options) {
    super(ctx, {
      ...options,
      interactionHandlerType: InteractionHandlerTypes.ModalSubmit,
    });
  }

  public override parse(interaction: ModalSubmitInteraction<'cached'>) {
    if (interaction.customId === 'giveCredit') return this.some();
    return this.none();
  }

  public async run(ctx: ModalSubmitInteraction<'cached'>) {
    const amountRaw = ctx.fields.getTextInputValue('CreditInput');
    const amount = +amountRaw;
    if (amount < 0 || amount > 50000) {
      await ctx.reply({
        content: `Вы ввели некоректно${amount}`,
        ephemeral: true,
      });
      return;
    }

    const options = { guildId: ctx.guildId, userId: ctx.user.id };
    let user = await User.findOne(options);
    if (!user) user = await User.create(options);

    await user.updateOne({ $inc: { credit: amount, money: amount } });

    await ctx.reply({
      content: `${amount}`,
      ephemeral: true,
    });
  }
}
