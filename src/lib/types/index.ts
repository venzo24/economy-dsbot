import type {
  CacheType,
  ChatInputCommandInteraction,
  CommandInteraction,
  EmbedData,
  GuildMember,
  Message,
  MessageComponentInteraction,
  ModalSubmitInteraction,
} from 'discord.js';

export type Context<InGuild extends boolean = true, Cached extends CacheType = 'cached'> =
  | ChatInputCommandInteraction<Cached>
  | Message<InGuild>;

export interface sendErrorMessageOptions {
  ctx:
    | Context
    | CommandInteraction<'cached'>
    | MessageComponentInteraction<'cached'>
    | ModalSubmitInteraction<'cached'>;
  content?: string;
  data?: EmbedData;
  follow?: boolean;
  member?: GuildMember;
  emoji?: string;
  react?: boolean;
}
