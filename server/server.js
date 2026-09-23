// require("dotenv").config();

// const app = require("./app");
// const connectDB = require("./config/db");
// const seedCatalog = require("./utils/seedCatalog");

// const PORT = process.env.PORT || 5000;

// const startServer = async () => {
//   try {
//     await connectDB();
//     await seedCatalog();

//     app.listen(PORT, () => {
//       console.log(`🚀 CineRate API running on http://localhost:${PORT}`);
//     });
//   } catch (error) {
//     console.error("Server startup failed:", error.message);
//     process.exit(1);
//   }
// };

// startServer();


require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const seedCatalog = require("./utils/seedCatalog");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Seed movie/catalog data
    await seedCatalog();

    // Start Express server
    app.listen(PORT, () => {
      console.log(
        `🚀 CineRate API running on port ${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "Server startup failed:",
      error.message
    );

    process.exit(1);
  }
};

startServer();