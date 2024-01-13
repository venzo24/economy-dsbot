import Biz, { bizTypes } from '#lib/models/Biz';
import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework';
import { type ButtonInteraction } from 'discord.js';
import User from '#lib/models/User';

export class ButtonHandler extends InteractionHandler {
  public constructor(ctx: InteractionHandler.LoaderContext, options: InteractionHandler.Options) {
    super(ctx, {
      ...options,
      interactionHandlerType: InteractionHandlerTypes.Button,
    });
  }

  public override parse(interaction: ButtonInteraction<'cached'>) {
    if (interaction.customId.startsWith('buy_biz')) return this.some();
    return this.none();
  }

  public async run(ctx: ButtonInteraction<'cached'>) {
    const options = { guildId: ctx.guildId, userId: ctx.user.id };
    let user = await User.findOne(options);
    if (!user) user = await User.create(options);

    const bizType = +ctx.customId[ctx.customId.length - 1];
    const bizInfo = bizTypes[bizType];
    if (!bizInfo) {
      await ctx.reply('Информация о выбранном бизнесе не найдена');
      return;
    }
    if (user.money < bizInfo.price) {
      await ctx.reply(`У вас недостаточно денег. Вам нужно ${bizInfo.price}`);
      return;
    }
    const [, biz] = await Promise.all([
      await user.updateOne({ $inc: { money: -bizInfo.price } }),
      await Biz.create({ ...options, bizId: bizType }),
    ]);

    await ctx.reply(`Вы купили бизнесс ${bizInfo.name} \`[${biz._id}]\` за ${bizInfo.price}`);
  }
}
