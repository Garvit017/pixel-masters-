import { Board, User, Column, Card } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    color: '#3b82f6',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    color: '#ef4444',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    color: '#10b981',
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    color: '#f59e0b',
  },
];

export const mockCards: Card[] = [
  {
    id: '1',
    title: 'Design new landing page',
    description: 'Create a modern and responsive landing page design',
    dueDate: new Date('2024-01-15'),
    priority: 'high',
    assignees: [mockUsers[0], mockUsers[1]],
    comments: [],
    labels: ['design', 'frontend'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    title: 'Implement user authentication',
    description: 'Add login and registration functionality',
    dueDate: new Date('2024-01-20'),
    priority: 'high',
    assignees: [mockUsers[2]],
    comments: [],
    labels: ['backend', 'security'],
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
  },
  {
    id: '3',
    title: 'Write API documentation',
    description: 'Document all API endpoints and usage examples',
    dueDate: new Date('2024-01-25'),
    priority: 'medium',
    assignees: [mockUsers[3]],
    comments: [],
    labels: ['documentation'],
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
  },
  {
    id: '4',
    title: 'Setup CI/CD pipeline',
    description: 'Configure automated testing and deployment',
    dueDate: new Date('2024-01-30'),
    priority: 'medium',
    assignees: [mockUsers[2], mockUsers[3]],
    comments: [],
    labels: ['devops', 'automation'],
    createdAt: new Date('2024-01-04'),
    updatedAt: new Date('2024-01-04'),
  },
  {
    id: '5',
    title: 'Code review for PR #123',
    description: 'Review the authentication implementation',
    dueDate: new Date('2024-01-12'),
    priority: 'low',
    assignees: [mockUsers[0]],
    comments: [],
    labels: ['review'],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
];

export const mockColumns: Column[] = [
  {
    id: '1',
    title: 'To Do',
    cards: [mockCards[0], mockCards[1]],
    color: '#6b7280',
  },
  {
    id: '2',
    title: 'In Progress',
    cards: [mockCards[2]],
    color: '#3b82f6',
  },
  {
    id: '3',
    title: 'Review',
    cards: [mockCards[4]],
    color: '#f59e0b',
  },
  {
    id: '4',
    title: 'Done',
    cards: [mockCards[3]],
    color: '#10b981',
  },
];

export const mockBoard: Board = {
  id: '1',
  title: 'Project Alpha',
  description: 'Main project board for our web application',
  columns: mockColumns,
  members: mockUsers,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-10'),
};
