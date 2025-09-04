import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Column as ColumnType, Card as CardType } from '../types';
import { Card } from './Card';
import { Plus, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { useBoard } from '../context/BoardContext';
import { v4 as uuidv4 } from 'uuid';

interface ColumnProps {
  column: ColumnType;
  index: number;
}

export function Column({ column, index }: ColumnProps) {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { state, dispatch } = useBoard();

  const handleAddCard = () => {
    if (newCardTitle.trim()) {
      const newCard: CardType = {
        id: uuidv4(),
        title: newCardTitle,
        description: '',
        priority: 'medium',
        assignees: [],
        comments: [],
        labels: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      dispatch({ type: 'ADD_CARD', payload: { columnId: column.id, card: newCard } });
      setNewCardTitle('');
      setIsAddingCard(false);
    }
  };

  const handleDeleteColumn = () => {
    if (window.confirm('Are you sure you want to delete this column? All cards will be lost.')) {
      dispatch({ type: 'DELETE_COLUMN', payload: column.id });
    }
  };

  const handleUpdateColumn = (title: string) => {
    if (title !== column.title) {
      dispatch({
        type: 'UPDATE_COLUMN',
        payload: {
          columnId: column.id,
          updates: { title },
        },
      });
    }
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`bg-gray-50 rounded-lg p-4 min-w-[300px] ${
            snapshot.isDragging ? 'shadow-lg' : ''
          }`}
        >
          <div
            {...provided.dragHandleProps}
            className="flex items-center justify-between mb-4"
          >
            {isEditing ? (
              <input
                type="text"
                defaultValue={column.title}
                className="font-semibold text-gray-900 bg-transparent border-none outline-none"
                onBlur={(e) => handleUpdateColumn(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.currentTarget.blur();
                  }
                }}
                autoFocus
              />
            ) : (
              <h2 className="font-semibold text-gray-900">{column.title}</h2>
            )}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                {column.cards.length}
              </span>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={handleDeleteColumn}
                className="p-1 text-gray-400 hover:text-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          <Droppable droppableId={column.id} type="card">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`min-h-[100px] space-y-3 ${
                  snapshot.isDraggingOver ? 'bg-blue-50 rounded-lg' : ''
                }`}
              >
                {column.cards.map((card, cardIndex) => (
                  <Draggable key={card.id} draggableId={card.id} index={cardIndex}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`${
                          snapshot.isDragging ? 'rotate-2 shadow-lg' : ''
                        }`}
                      >
                        <Card card={card} columnId={column.id} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}

                {isAddingCard ? (
                  <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-4">
                    <input
                      type="text"
                      value={newCardTitle}
                      onChange={(e) => setNewCardTitle(e.target.value)}
                      placeholder="Enter card title..."
                      className="w-full font-medium text-gray-900 border-none outline-none mb-3"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleAddCard();
                        } else if (e.key === 'Escape') {
                          setIsAddingCard(false);
                          setNewCardTitle('');
                        }
                      }}
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={handleAddCard}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                      >
                        Add Card
                      </button>
                      <button
                        onClick={() => {
                          setIsAddingCard(false);
                          setNewCardTitle('');
                        }}
                        className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsAddingCard(true)}
                    className="w-full flex items-center justify-center space-x-2 py-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Plus size={16} />
                    <span>Add a card</span>
                  </button>
                )}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
