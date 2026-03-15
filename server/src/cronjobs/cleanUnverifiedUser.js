const cron = require("node-cron");
const User = require("../models/user.model");

const cleanUnverifiedUser = () => {
    cron.schedule("0 * * * *", async () => {
        try {
            logger.info("cron job is running!")
            const result = await User.deleteMany({
                isVerified: false,
                createdAt: {
                    $lt: new Date(Date.now() - 24 * 60 * 60 * 1000),
                },
            });

            console.log(`Deleted ${result.deletedCount} unverified users`);
        } catch (error) {
            console.error("Cleanup job failed:", error);
        }
    });
};

module.exports = { cleanUnverifiedUser };