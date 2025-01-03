import { useDroppable } from '@dnd-kit/core';
import Card from "./Card"
import { CardArea as CardAreaType, MTGCard } from '../types';

type CardAreaProps = {
  cardarea: CardAreaType;
  mtgcards: MTGCard[];
};

export default function CardArea({ cardarea, mtgcards }: CardAreaProps) {
  const { setNodeRef } = useDroppable({
    id: cardarea.id,
  });

  return (
    <>
      <h2 className="area-title">{cardarea.title}</h2>
      <div ref={setNodeRef} className={cardarea.id}>
        {mtgcards.map((card) => {
          return <Card key={card.id} card={card} />;
        })}
      </div>
    </>
  );
}