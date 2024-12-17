export type CardStatus = 'CURRENT_PACK' | 'PLAYER_HAND' | 'PREVIOUS';

export type MTGCard = {
  id: string;
  status: CardStatus;
  title: string;
  description: string;
};

export type CardArea = {
  id: CardStatus;
  title: string;
};