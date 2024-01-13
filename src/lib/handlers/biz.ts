import Biz, { bizTypes } from '#lib/models/Biz';
import BizLog from '#lib/models/BizLog';

export async function updateRecords() {
  try {
    // Найдем записи, у которых bizFin был обновлен
    const oneHourAgo = Date.now() + 60 * 60 * 1000;
    const recordsToUpdate = await Biz.find();

    for (const biz of recordsToUpdate) {
      const bizInfo = bizTypes[biz.bizId];

      if (!bizInfo) {
        console.log('bizinfonet');
        continue;
      }
      if (biz.bizNalog + bizInfo.nalog >= bizInfo.nalog * 10) {
        await biz.deleteOne();
        continue;
      }
      const logs = await BizLog.findOne({ bizId: biz._id });

      console.log(logs);
      if (!logs || logs.createdAt.getTime() <= oneHourAgo) {
        // Действия, если время в logs.updatedAt равно oneHourAgo
        await biz.updateOne({ $inc: { bizfin: bizInfo.fin, bizNalog: bizInfo.nalog } });
        await BizLog.create({
          guildId: biz.guildId,
          userId: biz.userId,
          bizId: biz._id,
          bizZam: biz.bizZam,
          bizfin: [biz.bizfin, biz.bizfin + bizInfo.fin],
          bizNalog: [biz.bizNalog, biz.bizNalog + bizInfo.nalog],
        });
        continue;
      }
    }
  } catch (error) {
    console.error('Error updating records:', error);
  }
}
