import pool from "../modules/pool";
import { card } from "../constants/types";
import axios from "axios";
import { PoolClient } from "pg";
// NOTE: calling this function will download every oracle card from MTG. This is like 1gb.
// I'd reccomend closing memory intensive things to prevent crashing your computer. This gets stored into ram before
// getting shoved into the database.
export async function updateLocalCardDatabase() {
  // This is the latest set from MTG. We can check this against our database,
  // And if it's there, we're probably good.
  const lastSet = "fdn";

  // This query grabs one card from the database from the last set.
  const sqlText = 'SELECT * FROM "cards" WHERE "set" = $1 LIMIT 1';
  try {
    const lastSetResult = await pool.query(sqlText, [lastSet]);
    if (!lastSetResult.rows[0]) await fetchCardData(); // If we ain't got the data, let's go fetch it.
    return true;
  } catch (error) {
    throw new Error(
      `Error verifying and updating local card database: ${error}`
    );
  }
}

async function fetchCardData() {
  // Headers declaration we'll need for scryfall's api
  const headers = {
    "User-Agent": "mtg-draftbot/1",
    Accept: "application/json;q=0.9,*/*;q=0.8",
  };
  const linkToCardData = await axios.get(
    "https://api.scryfall.com/bulk-data/unique-artwork",
    { headers }
  );
  // I don't exactly know why scryfall's api works like this, but let's roll with it.
  const downloadUri = linkToCardData.data.download_uri;
  const cardData = await axios.get(downloadUri, { headers });
  const connection: PoolClient = await pool.connect();
  try {
    await connection.query("BEGIN;");
    await connection.query('DROP TABLE IF EXISTS "cards";');
    await connection.query(`
CREATE TABLE "cards" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR,
    "scryfall_id" VARCHAR, 
    "object" VARCHAR, 
    "image_uris" VARCHAR, 
    "type_line" VARCHAR, 
    "set" VARCHAR, 
    "scryfall_url" VARCHAR, 
    "rarity" VARCHAR, 
    "cmc" VARCHAR, 
    "colors" VARCHAR, 
    "mana_cost" VARCHAR, 
    "layout" VARCHAR );`);
    await Promise.all(
      cardData.data.map((card: card) => {
        const {
          name,
          id,
          object,
          image_uris,
          type_line,
          set,
          scryfall_uri,
          rarity,
          cmc,
          colors,
          mana_cost,
          layout,
        } = card;
        const sqlText = `INSERT INTO "cards"
        ("name", "scryfall_id", "object", "image_uris", "type_line", "set", "scryfall_url", "rarity", "cmc", "colors", "mana_cost", "layout")
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`;
        return connection.query(sqlText, [
          name,
          id,
          object,
          image_uris,
          type_line,
          set,
          scryfall_uri,
          rarity,
          cmc,
          colors,
          mana_cost,
          layout,
        ]);
      })
    );
    await connection.query("COMMIT;");
  } catch (error) {
    connection.query("ROLLBACK;");
    throw new Error(
      `Oopsie! You goofed inserting into SQL you dingus! ${error}`
    );
  } finally {
    connection.release();
  }
}
