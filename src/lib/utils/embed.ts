import { type APIEmbed, EmbedBuilder, type EmbedData, Message } from 'discord.js';
import { client } from '#root/index';
import { random } from '#utils/index';
import type { sendErrorMessageOptions } from '#types/index';

export const generateEmbed = (options: EmbedData | APIEmbed) => {
  if (!options.footer) options.footer = { text: `${client.user.username}`, icon_url: client.user.displayAvatarURL() };
  else if (options.footer && !('iconURL' in options.footer || 'icon_url' in options.footer)) {
    options.footer = { text: options.footer.text, icon_url: client.user.displayAvatarURL() };
  }
  return new EmbedBuilder(options);
};

export const sendErrorMessage = async ({
  ctx,
  content,
  data,
  emoji,
  follow,
  member,
  react,
}: sendErrorMessageOptions) => {
  if (!emoji) emoji = random(['😥', '😔', '🤔', '⚠️', '⛔', '🚫']);
  const isMessage = ctx instanceof Message;
  if ((react || react === undefined) && isMessage) ctx.react(emoji).catch(() => null);

  const embed = generateEmbed({
    ...(data ? data : {}),
    color: data && data.color ? data.color : 0xed4245,
    title: data && data.title ? data.title : `**${emoji} | Произошла ошибка**`,
    description: data && data.description ? data.description : content ? `**${content}**` : content,
    footer: { text: `${ctx.client.user.username} | Ошибка` },
  });

  if (isMessage) {
    await ctx.channel
      .send({ content: `${member ?? ctx.member}`, embeds: [embed] })
      .then(msg => setTimeout(() => msg.delete().catch(() => null), 20 * 1000));
  } else if ((ctx.replied || ctx.deferred) && !follow) await ctx.editReply({ embeds: [embed] });
  else if ((ctx.replied || ctx.deferred) && follow) await ctx.followUp({ embeds: [embed], ephemeral: true });
  else await ctx.reply({ embeds: [embed], ephemeral: true });
};
