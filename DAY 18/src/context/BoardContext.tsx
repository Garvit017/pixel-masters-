import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Board, Card, Column, User, DragResult } from '../types';
import { mockBoard } from '../data/mockData';
import { saveBoardToStorage, loadBoardFromStorage } from '../utils/storage';

interface BoardState {
  board: Board;
  currentUser: User;
}

type BoardAction =
  | { type: 'MOVE_CARD'; payload: DragResult }
  | { type: 'ADD_CARD'; payload: { columnId: string; card: Card } }
  | { type: 'UPDATE_CARD'; payload: { cardId: string; updates: Partial<Card> } }
  | { type: 'DELETE_CARD'; payload: { cardId: string; columnId: string } }
  | { type: 'ADD_COLUMN'; payload: Column }
  | { type: 'UPDATE_COLUMN'; payload: { columnId: string; updates: Partial<Column> } }
  | { type: 'DELETE_COLUMN'; payload: string }
  | { type: 'ADD_COMMENT'; payload: { cardId: string; comment: any } };

const getInitialState = (): BoardState => {
  const savedBoard = loadBoardFromStorage();
  return {
    board: savedBoard || mockBoard,
    currentUser: {
      id: 'current-user',
      name: 'Current User',
      email: 'user@example.com',
      color: '#8b5cf6',
    },
  };
};

function boardReducer(state: BoardState, action: BoardAction): BoardState {
  switch (action.type) {
    case 'MOVE_CARD': {
      const { source, destination } = action.payload;
      if (!destination) return state;

      const newColumns = [...state.board.columns];
      const sourceColumn = newColumns.find(col => col.id === source.droppableId);
      const destColumn = newColumns.find(col => col.id === destination.droppableId);

      if (!sourceColumn || !destColumn) return state;

      const [movedCard] = sourceColumn.cards.splice(source.index, 1);
      destColumn.cards.splice(destination.index, 0, movedCard);

      return {
        ...state,
        board: {
          ...state.board,
          columns: newColumns,
          updatedAt: new Date(),
        },
      };
    }

    case 'ADD_CARD': {
      const { columnId, card } = action.payload;
      const newColumns = state.board.columns.map(column =>
        column.id === columnId
          ? { ...column, cards: [...column.cards, card] }
          : column
      );

      return {
        ...state,
        board: {
          ...state.board,
          columns: newColumns,
          updatedAt: new Date(),
        },
      };
    }

    case 'UPDATE_CARD': {
      const { cardId, updates } = action.payload;
      const newColumns = state.board.columns.map(column => ({
        ...column,
        cards: column.cards.map(card =>
          card.id === cardId
            ? { ...card, ...updates, updatedAt: new Date() }
            : card
        ),
      }));

      return {
        ...state,
        board: {
          ...state.board,
          columns: newColumns,
          updatedAt: new Date(),
        },
      };
    }

    case 'DELETE_CARD': {
      const { cardId, columnId } = action.payload;
      const newColumns = state.board.columns.map(column =>
        column.id === columnId
          ? { ...column, cards: column.cards.filter(card => card.id !== cardId) }
          : column
      );

      return {
        ...state,
        board: {
          ...state.board,
          columns: newColumns,
          updatedAt: new Date(),
        },
      };
    }

    case 'ADD_COLUMN': {
      return {
        ...state,
        board: {
          ...state.board,
          columns: [...state.board.columns, action.payload],
          updatedAt: new Date(),
        },
      };
    }

    case 'UPDATE_COLUMN': {
      const { columnId, updates } = action.payload;
      const newColumns = state.board.columns.map(column =>
        column.id === columnId ? { ...column, ...updates } : column
      );

      return {
        ...state,
        board: {
          ...state.board,
          columns: newColumns,
          updatedAt: new Date(),
        },
      };
    }

    case 'DELETE_COLUMN': {
      const newColumns = state.board.columns.filter(column => column.id !== action.payload);
      return {
        ...state,
        board: {
          ...state.board,
          columns: newColumns,
          updatedAt: new Date(),
        },
      };
    }

    case 'ADD_COMMENT': {
      const { cardId, comment } = action.payload;
      const newColumns = state.board.columns.map(column => ({
        ...column,
        cards: column.cards.map(card =>
          card.id === cardId
            ? { ...card, comments: [...card.comments, comment] }
            : card
        ),
      }));

      return {
        ...state,
        board: {
          ...state.board,
          columns: newColumns,
          updatedAt: new Date(),
        },
      };
    }

    default:
      return state;
  }
}

const BoardContext = createContext<{
  state: BoardState;
  dispatch: React.Dispatch<BoardAction>;
} | null>(null);

export function BoardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(boardReducer, getInitialState());

  // Save to localStorage whenever the board changes
  useEffect(() => {
    saveBoardToStorage(state.board);
  }, [state.board]);

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
}

export function useBoard() {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('useBoard must be used within a BoardProvider');
  }
  return context;
}
