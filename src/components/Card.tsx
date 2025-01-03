import { useDraggable } from '@dnd-kit/core';
import { MTGCard } from '../types';

type MTGCardProps = {
  card: MTGCard;
};

export default function Card({ card }: MTGCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: card.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="mtg-card"
      style={style}
    >
      <h3 >{card.title}</h3>
      <p className="">{card.description}</p>
    </div>
  );
}