export interface card {
  name: string;
  id: number; // This is our database's id. IDK if we need it.
  scryfall_id: string; // This is scryfall's ID system.
  object: string; // This describes from Scryfall's POV what the card is.
  // This will usually be a card, but can also be bulk data, a set, a token, or an emblem, etc.
  image_uris: image_types; // This is an object that will contain urls to the various image types.
  type_line: string; // Contains the type line from the card. Not sure if this is actually useful.
  set: string; // Which set this card is from.
  scryfall_uri: string; // Link to the scryfall page of a card.
  rarity: "common" | "uncommon" | "rare" | "special" | "mythic" | "bonus";
  cmc: number;
  colors: string[];
  mana_cost: string;
  layout: string;
}

export interface image_types {
  small: string;
  normal: string;
  large: string;
  png: string;
  art_crop: string;
  border_crop: string;
}
