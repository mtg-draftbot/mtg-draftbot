-- Database name: draftbot
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
    "layout" VARCHAR;)

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "account_created" timestamptz DEFAULT NOW();
)
