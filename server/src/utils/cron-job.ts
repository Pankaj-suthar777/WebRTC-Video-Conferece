import cron from "node-cron";
import { subDays } from "date-fns";
import roomModel from "#/model/room.model";

const deleteRoomFunction = async () => {
  try {
    const oneDayAgo = subDays(new Date(), 1);

    const result = await roomModel.deleteMany({
      createdAt: { $lte: oneDayAgo },
    });

    console.log(`${result.deletedCount} rooms deleted.`);
  } catch (error) {
    console.error("Error deleting old rooms:", error);
  }
};
cron.schedule("0 0 * * *", async () => {
  await deleteRoomFunction();
});
