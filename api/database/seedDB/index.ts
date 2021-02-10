// Since this is being utilized by "jest.json", paths must be relative
import "snackables";
import mongoose from "mongoose";
import { connectToDB, createConnectionToDatabase } from "../index";
import { logErrorMessage, logInfoMessage } from "../../../logger";
import User from "../../models/user";
import seedEvents from "./events";
import seedForms from "./forms";
import seedMail from "./mail";
import seedSeasons from "./seasons";
import seedTeams from "./teams";
import seedTokens from "./tokens";
import seedUsers, { admin } from "./users";

const { DATABASE, EXIT, SEED } = process.env;

/**
 * Function to seed the testing Mongo database.
 *
 * @function
 * @returns {string} - displays a:  PASS  utils/seedDB.js message to console.
 * @throws {error} - displays a:  FAIL  utils/seedDB.js message to console with the error.
 */
const seedDB = async (): Promise<any> => {
  try {
    await connectToDB();
    const db = await createConnectionToDatabase();

    const databaseExists = User.findOne({ email: admin.email });
    if (databaseExists) await db.dropDatabase();

    const currentSeason = await seedSeasons();

    await seedTokens();

    const scheduledUser = await seedUsers();

    await seedEvents(currentSeason, scheduledUser);

    await seedTeams();

    await seedForms(currentSeason);

    await seedMail();

    await db.close();

    logInfoMessage(
      `\x1b[2mutils/\x1b[0m\x1b[1mseedDB.js\x1b[0m (${DATABASE})\n`
    );

    await mongoose.connection.close();

    if (EXIT) process.exit(0);

    return null;
  } catch (err) {
    logErrorMessage(`seedDB.js\x1b[0m\x1b[31m\n${err.toString()}\x1b[0m\n`);

    mongoose.connection.close();

    process.exit(0);
  }
};

if (SEED) seedDB();

export default seedDB;
