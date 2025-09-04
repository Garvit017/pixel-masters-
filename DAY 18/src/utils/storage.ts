import { Board } from '../types';

const STORAGE_KEY = 'trello-clone-board';

export const saveBoardToStorage = (board: Board): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(board));
  } catch (error) {
    console.error('Failed to save board to localStorage:', error);
  }
};

export const loadBoardFromStorage = (): Board | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const board = JSON.parse(stored);
      // Convert date strings back to Date objects
      board.createdAt = new Date(board.createdAt);
      board.updatedAt = new Date(board.updatedAt);
      board.columns.forEach((column: any) => {
        column.cards.forEach((card: any) => {
          card.createdAt = new Date(card.createdAt);
          card.updatedAt = new Date(card.updatedAt);
          if (card.dueDate) {
            card.dueDate = new Date(card.dueDate);
          }
          card.comments.forEach((comment: any) => {
            comment.createdAt = new Date(comment.createdAt);
          });
        });
      });
      return board;
    }
  } catch (error) {
    console.error('Failed to load board from localStorage:', error);
  }
  return null;
};

export const clearBoardFromStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear board from localStorage:', error);
  }
};
