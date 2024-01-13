import '@sapphire/plugin-logger/register';
import 'dotenv/config';
import AdvancedClient from '#lib/AdvancedClient';

const client = new AdvancedClient<true>();

client.login().catch(() => process.exit(0));

process.on('unhandledRejection', (error: Error) => {
  client.logger.error(`unhandledRejection: ${error.stack}`);
  process.exit(1);
});

process.on('uncaughtException', error => {
  client.logger.error(`uncaughtException: ${error.stack}`);
  process.exit(1);
});

export { client };
