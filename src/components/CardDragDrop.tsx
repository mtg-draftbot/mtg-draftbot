import { useState } from 'react';
import type { MTGCard, CardArea as CardAreaType } from '../types';
import  CardArea  from './CardArea';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

const CARD_AREA: CardAreaType[] = [
  { id: 'CURRENT_PACK', title: 'Current pack' },
  { id: 'PLAYER_HAND', title: 'Players Hand' },
  { id: 'PREVIOUS', title: 'previous pack' },
];

const INITIAL_CARDS: MTGCard[] = [
  {
    id: '1',
    title: 'Crazy Card',
    description: 'DESCRIPTION!',
    status: 'CURRENT_PACK',
  },
  {
    id: '2',
    title: 'Cool Card',
    description: 'DESCRIPTION!',
    status: 'CURRENT_PACK',
  },
  {
    id: '3',
    title: 'Wacky Card',
    description: 'DESCRIPTION!',
    status: 'CURRENT_PACK',
  },
  {
    id: '4',
    title: 'Test Card',
    description: 'DESCRIPTION!',
    status: 'CURRENT_PACK',
  },
];

export default function CardDragDrop() {
  const [cards, setCards] = useState<MTGCard[]>(INITIAL_CARDS);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as MTGCard['status'];

    setCards(() =>
        cards.map((card) =>
            card.id === taskId
          ? {
              ...card,
              status: newStatus,
            }
          : card,
      ),
    );
  }

  return (
      <div className="draft-area">
        <DndContext onDragEnd={handleDragEnd}>
          {CARD_AREA.map((card_area) => {
            return (
              <CardArea
                key={card_area.id}
                cardarea={card_area}
                mtgcards={cards.filter((card) => card.status === card_area.id)}
              />
            );
          })}
        </DndContext>
      </div>
  );
}