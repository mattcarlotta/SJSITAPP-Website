import Team from "../../models/team";

const teams = [
  { team: "Anaheim Ducks", league: "NHL", name: "anaheim-ducks" },
  { team: "Arizona Coyotes", league: "NHL", name: "arizona-coyotes" },
  { team: "Bakersfield Condors", league: "AHL", name: "bakersfield-condors" },
  { team: "Belleville Senators", league: "AHL", name: "belleville-senators" },
  { team: "Binghamton Devils", league: "AHL", name: "binghamton-devils" },
  { team: "Boston Bruins", league: "NHL", name: "boston-bruins" },
  {
    team: "Bridgeport Sound Tigers",
    league: "AHL",
    name: "bridgeport-sound-tigers"
  },
  { team: "Buffalo Sabres", league: "NHL", name: "buffalo-sabres" },
  { team: "Calgary Flames", league: "NHL", name: "calgary-flames" },
  { team: "Carolina Hurricanes", league: "NHL", name: "carolina-hurricanes" },
  { team: "Charlotte Checkers", league: "AHL", name: "charlotte-checkers" },
  { team: "Chicago Blackhawks", league: "NHL", name: "chicago-blackhawks" },
  { team: "Chicago Wolves", league: "AHL", name: "chicago-wolves" },
  { team: "Cleveland Monsters", league: "AHL", name: "cleveland-monsters" },
  { team: "Colorado Avalanche", league: "NHL", name: "colorado-avalanche" },
  { team: "Colorado Eagles", league: "AHL", name: "colorado-eagles" },
  {
    team: "Columbus Blue Jackets",
    league: "NHL",
    name: "columbus-blue-jackets"
  },
  { team: "Dallas Stars", league: "NHL", name: "dallas-stars" },
  { team: "Detroit Red Wings", league: "NHL", name: "detroit-red-wings" },
  { team: "Edmonton Oilers", league: "NHL", name: "edmonton-oilers" },
  { team: "Florida Panthers", league: "NHL", name: "florida-panthers" },
  {
    team: "Grand Rapids Griffins",
    league: "AHL",
    name: "grand-rapids-griffins"
  },
  { team: "Hartford Wolf Pack", league: "AHL", name: "hartford-wolf-pack" },
  { team: "Hershey Bears", league: "AHL", name: "hershey-bears" },
  { team: "Iowa Wild", league: "AHL", name: "iowa-wild" },
  { team: "Laval Rocket", league: "AHL", name: "laval-rocket" },
  {
    team: "Lehigh Valley Phantoms",
    league: "AHL",
    name: "lehigh-valley-phantoms"
  },
  { team: "Los Angeles Kings", league: "NHL", name: "los-angeles-kings" },
  { team: "Manitoba Moose", league: "AHL", name: "manitoba-moose" },
  { team: "Milwaukee Admirals", league: "AHL", name: "milwaukee-admirals" },
  { team: "Minnesota Wild", league: "NHL", name: "minnesota-wild" },
  { team: "Montreal Canadiens", league: "NHL", name: "montreal-canadiens" },
  { team: "Nashville Predators", league: "NHL", name: "nashville-predators" },
  { team: "New Jersey Devils", league: "NHL", name: "new-jersey-devils" },
  { team: "New York Islanders", league: "NHL", name: "new-york-islanders" },
  { team: "New York Rangers", league: "NHL", name: "new-york-tangers" },
  { team: "Ontario Reign", league: "NHL", name: "ontario-reign" },
  { team: "Ottawa Senators", league: "NHL", name: "ottawa-senators" },
  { team: "Philadelphia Flyers", league: "NHL", name: "philadelphia-flyers" },
  { team: "Pittsburgh Penguins", league: "NHL", name: "pittsburgh-penguins" },
  { team: "Providence Bruins", league: "AHL", name: "providence-bruins" },
  { team: "Rochester Americans", league: "AHL", name: "rochester-americans" },
  { team: "Rockford Ice Hogs", league: "AHL", name: "rockford-ice-hogs" },
  { team: "San Antonio Rampage", league: "AHL", name: "san-antonio-rampage" },
  { team: "San Diego Gulls", league: "AHL", name: "san-diego-gulls" },
  { team: "San Jose Barracuda", league: "AHL", name: "san-jose-barracuda" },
  { team: "San Jose Sharks", league: "NHL", name: "san-jose-sharks" },
  { team: "Seattle Kraken", league: "NHL", name: "seattle-kraken" },
  {
    team: "Springfield Thunderbirds",
    league: "AHL",
    name: "springfield-thunderbirds"
  },
  { team: "St. Louis Blues", league: "NHL", name: "st-louis-blues" },
  { team: "Stockton Heat", league: "AHL", name: "stockton-heat" },
  { team: "Syracuse Crunch", league: "AHL", name: "syracuse-crunch" },
  { team: "Tampa Bay Lightning", league: "NHL", name: "tampa-bay-lightning" },
  { team: "Texas Stars", league: "AHL", name: "texas-stars" },
  { team: "Toronto Maple Leafs", league: "NHL", name: "toronto-maple-leafs" },
  { team: "Toronto Marlies", league: "AHL", name: "toronto-marlies" },
  { team: "Tucson Roadrunners", league: "AHL", name: "tucson-roadrunners" },
  { team: "Utica Comets", league: "AHL", name: "utica-comets" },
  { team: "Vancouver Canucks", league: "NHL", name: "vancouver-canucks" },
  { team: "Vegas Golden Knights", league: "NHL", name: "vegas-golden-knights" },
  { team: "Washington Capitals", league: "NHL", name: "washington-capitals" },
  {
    team: "Wilkes Barre Scranton Penguins",
    league: "AHL",
    name: "wilkes-barre-scranton-penguins"
  },
  { team: "Winnipeg Jets", league: "NHL", name: "winnipeg-jets" }
];

/**
 * Function to seed the testing Mongo database with teams.
 *
 * @function
 * @returns {Promise} any
 */
const seedTeams = (): Promise<any> => Team.insertMany(teams);

export default seedTeams;
