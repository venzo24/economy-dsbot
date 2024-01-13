import { ApplicationCommandRegistries, LogLevel, RegisterBehavior, SapphireClient } from '@sapphire/framework';
import { connect, set } from 'mongoose';
import { Partials } from 'discord.js';
import type { SapphireClientOptions } from '@sapphire/framework';

ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.BulkOverwrite);

export default class AdvancedClient<Ready extends boolean = boolean> extends SapphireClient<Ready> {
  public constructor(options: SapphireClientOptions = {}) {
    super({
      intents: ['Guilds', 'GuildMembers'],
      sweepers: { messages: { interval: 120, lifetime: 60 } },
      partials: [Partials.Message, Partials.Channel, Partials.GuildMember],

      logger: { level: process.env.NODE_ENV === 'development' ? LogLevel.Debug : undefined },

      ...options,
    });
  }

  public override login() {
    this.connectDatabase();
    return super.login();
  }

  private connectDatabase() {
    set('strictQuery', true);
    connect((process.env.DATABASE_URL ??= ''), {}).catch(err => {
      if (err) throw err;
      else this.logger.info('[Database] MongoDB successfully connected.');
    });
  }
}
