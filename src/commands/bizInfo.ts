import { ApplyOptions } from '@sapphire/decorators';
import Biz from '#lib/models/Biz';
import BizLog from '#lib/models/BizLog';
import { Command } from '@sapphire/framework';
import User from '#models/User';
import { generateEmbed } from '#utils/embed';

@ApplyOptions<Command.Options>({ description: 'biz info' })
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

    const bizInfo = await Biz.findOne(options);
    const logs = await BizLog.find(options);
    await ctx.reply({
      embeds: [
        generateEmbed({
          title: 'Информация о ваших бизнесах',
          description: `Прибыль: ${bizInfo?.bizfin}
            Налог ${bizInfo?.bizNalog}
            Ваши заместители: ${bizInfo?.bizZam.map(id => `<@${id}>`).join(', ')}`,
          color: 0xeed6ea,
          fields: logs.length
            ? [
                {
                  name: 'Последние логи',
                  value: `\`\`\`${logs
                    .sort((log1, log2) => +log1.createdAt - +log2.createdAt)
                    .map(
                      log =>
                        `[${log.createdAt.toLocaleDateString('ru-US', {
                          timeZone: 'Europe/Kiev',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}] Ваш бизнес [${log.bizId}] принес ${log.bizfin[1] - log.bizfin[0]}`,
                    )
                    .slice(0, 10)
                    .join('\n')}\`\`\``,
                },
              ]
            : [],
        }),
      ],
    });
  }
}
