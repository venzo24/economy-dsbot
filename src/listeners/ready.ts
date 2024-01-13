import type AdvancedClient from '#lib/AdvancedClient';
import { ApplyOptions } from '@sapphire/decorators';
import { Listener } from '@sapphire/framework';
import { schedule } from 'node-cron';
import { updateRecords } from '#handlers/biz';

@ApplyOptions<Listener.Options>({ once: true })
export class ClientListener extends Listener {
  public override run(client: AdvancedClient<true>) {
    client.logger.info(
      [
        `[Commands] Загружено ${this.container.stores.get('commands').size} комманд`,
        `[Listeners] Загружено ${this.container.stores.get('listeners').size} событий`,
        `[Interaction-Handlers] Загружено ${
          this.container.stores.get('interaction-handlers').size
        } обработчиков интеракций`,
      ].join('\n'),
    );

    client.logger.info(
      `[Ready] Бот запущен. Авторизован как ${client.user.username} | Серверов: ${client.guilds.cache.size}`,
    );

    schedule(
      '0 * * * *',
      async () => {
        await this.cron();
      },
      { runOnInit: true },
    );
  }

  private async cron() {
    await updateRecords();
  }
}
