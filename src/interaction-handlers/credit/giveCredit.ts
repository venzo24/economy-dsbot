import { ActionRowBuilder, type ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';
import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework';
// import User from '#models/User';

export class ButtonHandler extends InteractionHandler {
  public constructor(ctx: InteractionHandler.LoaderContext, options: InteractionHandler.Options) {
    super(ctx, {
      ...options,
      interactionHandlerType: InteractionHandlerTypes.Button,
    });
  }

  public override parse(interaction: ButtonInteraction<'cached'>) {
    if (interaction.customId === 'give_credit') return this.some();
    return this.none();
  }

  public async run(interaction: ButtonInteraction<'cached'>) {
    // const credit = await User.findOne({ guildId: interaction.guildId, userId: interaction.user.id });

    await interaction.showModal(
      new ModalBuilder({
        custom_id: 'giveCredit',
        title: 'Кредит',
        components: [
          new ActionRowBuilder<TextInputBuilder>({
            components: [
              new TextInputBuilder({
                custom_id: 'CreditInput',
                label: 'Введите сумму кредита ниже в поле',
                style: TextInputStyle.Short,
              }),
            ],
          }),
        ],
      }),
    );
  }
}
