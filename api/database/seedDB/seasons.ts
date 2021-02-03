import Season from "../../models/season";
import { moment } from "../../helpers";

/**
 * Function to seed the testing Mongo database with seasons.
 *
 * @function
 * @returns {string} current season
 */
export const seedSeasons = async (): Promise<string> => {
  const newSeason = {
    seasonId: "20002001",
    startDate: new Date(2000, 8, 26),
    endDate: new Date(2001, 5, 12)
  };

  const newSeason2 = {
    seasonId: "20052006",
    startDate: new Date(2005, 8, 26),
    endDate: new Date(2006, 5, 12)
  };

  const newSeason3 = {
    seasonId: "20112012",
    startDate: new Date(2011, 8, 26),
    endDate: new Date(2012, 5, 12)
  };

  const newSeason4 = {
    seasonId: "19801981",
    startDate: new Date(1980, 8, 26),
    endDate: new Date(1981, 5, 12)
  };

  const currentYearDate = moment().format("YYYY");
  const nextYearDate = moment().add(1, "year").format("YYYY");
  const currentSeason = `${currentYearDate}${nextYearDate}`;

  const currentYear = {
    seasonId: currentSeason,
    startDate: moment().startOf("year").format(),
    endDate: moment().add(1, "year").endOf("year").format()
  };

  await Season.insertMany([
    newSeason,
    newSeason2,
    newSeason3,
    newSeason4,
    currentYear
  ]);

  return currentSeason;
};

export default seedSeasons;
