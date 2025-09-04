import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Column } from './Column';
import { BoardStats } from './BoardStats';
import { AddColumnModal } from './AddColumnModal';
import { Plus, Users, BarChart3 } from 'lucide-react';
import { useBoard } from '../context/BoardContext';
import { DragResult } from '../types';

export function Board() {
  const { state, dispatch } = useBoard();
  const [showAddColumn, setShowAddColumn] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const handleDragEnd = (result: DragResult) => {
    dispatch({ type: 'MOVE_CARD', payload: result });
  };

  const totalCards = state.board.columns.reduce((sum, column) => sum + column.cards.length, 0);
  const completedCards = state.board.columns.find(col => col.title.toLowerCase().includes('done'))?.cards.length || 0;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">{state.board.title}</h1>
              <span className="text-sm text-gray-500">{totalCards} cards</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Users size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600">{state.board.members.length} members</span>
              </div>
              <button
                onClick={() => setShowStats(true)}
                className="flex items-center space-x-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                <BarChart3 size={16} />
                <span>Stats</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Board Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="board" type="column" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`flex space-x-6 overflow-x-auto pb-4 ${
                  snapshot.isDraggingOver ? 'bg-blue-50 rounded-lg' : ''
                }`}
              >
                {state.board.columns.map((column, index) => (
                  <Column key={column.id} column={column} index={index} />
                ))}
                {provided.placeholder}

                {/* Add Column Button */}
                <div className="min-w-[300px]">
                  <button
                    onClick={() => setShowAddColumn(true)}
                    className="w-full flex items-center justify-center space-x-2 py-8 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg border-2 border-dashed border-gray-300 transition-colors"
                  >
                    <Plus size={20} />
                    <span>Add a column</span>
                  </button>
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {/* Modals */}
      {showAddColumn && (
        <AddColumnModal onClose={() => setShowAddColumn(false)} />
      )}

      {showStats && (
        <BoardStats onClose={() => setShowStats(false)} />
      )}
    </div>
  );
}
