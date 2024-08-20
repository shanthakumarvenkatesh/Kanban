import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import Card from '../Card';
import IStatus from '../../interfaces/IStatus';
import ICard from '../../interfaces/ICard';
import { CardsList, Container } from './styles';

const Column = ({ status, cards, index }) => {
  return (
    <Container isFirstColumn={index === 0}>
      <h2>{status}</h2>
      <Droppable droppableId={status}>
        {(provided) => (
          <CardsList 
            ref={provided.innerRef} 
            {...provided.droppableProps}
          >
            {cards
              .filter(card => card.status === status)
              .map((card, cardIndex) => (
                <Card 
                  key={card.id} 
                  card={card} 
                  index={cardIndex}
                />
              ))
            }
            {provided.placeholder}
          </CardsList>
        )}
      </Droppable>
    </Container>
  );
};

export default Column;
