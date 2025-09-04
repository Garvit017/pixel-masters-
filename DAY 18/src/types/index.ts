export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  color: string;
}

export interface Comment {
  id: string;
  text: string;
  author: User;
  createdAt: Date;
}

export interface Card {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
  assignees: User[];
  comments: Comment[];
  labels: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Column {
  id: string;
  title: string;
  cards: Card[];
  color: string;
  maxCards?: number;
}

export interface Board {
  id: string;
  title: string;
  description?: string;
  columns: Column[];
  members: User[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DragResult {
  draggableId: string;
  type: string;
  source: {
    droppableId: string;
    index: number;
  };
  destination?: {
    droppableId: string;
    index: number;
  };
}

export interface BoardStats {
  totalCards: number;
  completedCards: number;
  overdueCards: number;
  completionRate: number;
  averageCompletionTime: number;
}
