import pool from "../pool.ts";
import { card } from "../../constants/types.ts";

export async function generateDraftBoosterPacks(set: string) {
  // Grab the cards from our database
  const sqlText = `SELECT * FROM "cards" WHERE "set" = $1`;
  const dbRes = await pool.query(sqlText, [set]);
  const cards = dbRes.rows;

  // Little error checking, if we don't have cards, then there's an issue.
  if(!cards[0]){
    throw new Error('Verify local database is updated.')
  }

  // Now, filter them by rarity.
  const mythics = cards.filter((card: card) => (card.rarity = "mythic"));
  const rares = cards.filter((card: card) => (card.rarity = "rare"));
  const uncommons = cards.filter((card: card) => (card.rarity = "uncommon"));
  const commons = cards
    .filter((card: card) => (card.rarity = "common"))
    .filter((card: card) => {
      if (card.type_line.includes("Basic Land")) return false;
      return true;
    }); // For commons, basic lands are also grabbed. We don't want them.
  const basicLands = cards.filter((card: card) =>
    card.type_line.includes("Basic Land")
  );

  // Generating packs depends on which set we're on... because things can't be easy, can they?
  // For now, we're pretending that all sets play by the same rules. This will be updated later.

  const packs = new Array(8); // Make an empty array 8 long, since there'll be 8 packs.
  const newPacks = packs.map(() => {
    // For the rare, there's a chance it's a  mythic... about a 1/8. So, we can do a quick generate based on that.
    const generatedRare =
      getRandomArbitrary(0, 100) > 12.5
        ? rares[getRandomInt(0, rares.length)]
        : mythics[getRandomInt(0, mythics.length)];

    // Three uncommons go in... it's ugly don't look at it.
    const generatedUncommons = [
      uncommons[getRandomInt(0, uncommons.length)],
      uncommons[getRandomInt(0, uncommons.length)],
      uncommons[getRandomInt(0, uncommons.length)],
    ];

    //Now the commons... this is uglier, don't look at it.
    const generatedCommons = [
      commons[getRandomInt(0, commons.length)],
      commons[getRandomInt(0, commons.length)],
      commons[getRandomInt(0, commons.length)],
      commons[getRandomInt(0, commons.length)],
      commons[getRandomInt(0, commons.length)],
      commons[getRandomInt(0, commons.length)],
      commons[getRandomInt(0, commons.length)],
      commons[getRandomInt(0, commons.length)],
      commons[getRandomInt(0, commons.length)],
      commons[getRandomInt(0, commons.length)],
    ];

    // And the basic that nobody wants.
    const generatedBasicLand = basicLands[getRandomInt(0, basicLands.length)];

    // Now return it, because this is a callback function.
    return [
      generatedRare,
      ...generatedUncommons,
      ...generatedCommons,
      generatedBasicLand,
    ];
  });
  return newPacks;
}

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}
