import React, { useState } from 'react';
import { Card as CardType, User } from '../types';
import { Calendar, MessageCircle, Users, Tag, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { useBoard } from '../context/BoardContext';

interface CardProps {
  card: CardType;
  columnId: string;
}

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

const labelColors = [
  'bg-blue-100 text-blue-800',
  'bg-green-100 text-green-800',
  'bg-yellow-100 text-yellow-800',
  'bg-red-100 text-red-800',
  'bg-purple-100 text-purple-800',
  'bg-pink-100 text-pink-800',
];

export function Card({ card, columnId }: CardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { dispatch } = useBoard();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      dispatch({ type: 'DELETE_CARD', payload: { cardId: card.id, columnId } });
    }
  };

  const isOverdue = card.dueDate && new Date() > card.dueDate;

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                defaultValue={card.title}
                className="w-full font-medium text-gray-900 border-none outline-none bg-transparent"
                onBlur={(e) => {
                  if (e.target.value !== card.title) {
                    dispatch({
                      type: 'UPDATE_CARD',
                      payload: {
                        cardId: card.id,
                        updates: { title: e.target.value },
                      },
                    });
                  }
                  setIsEditing(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.currentTarget.blur();
                  }
                }}
                autoFocus
              />
            ) : (
              <h3
                className="font-medium text-gray-900 cursor-pointer hover:text-blue-600"
                onClick={() => setShowDetails(true)}
              >
                {card.title}
              </h3>
            )}
          </div>
          <div className="flex items-center space-x-1">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColors[card.priority]}`}>
              {card.priority}
            </span>
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <Edit2 size={14} />
            </button>
            <button
              onClick={handleDelete}
              className="p-1 text-gray-400 hover:text-red-600"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        {card.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {card.description}
          </p>
        )}

        {card.labels.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {card.labels.map((label, index) => (
              <span
                key={label}
                className={`px-2 py-1 text-xs font-medium rounded-full ${labelColors[index % labelColors.length]}`}
              >
                {label}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            {card.dueDate && (
              <div className={`flex items-center space-x-1 ${isOverdue ? 'text-red-600' : ''}`}>
                <Calendar size={14} />
                <span>{format(card.dueDate, 'MMM d')}</span>
              </div>
            )}
            {card.comments.length > 0 && (
              <div className="flex items-center space-x-1">
                <MessageCircle size={14} />
                <span>{card.comments.length}</span>
              </div>
            )}
          </div>

          {card.assignees.length > 0 && (
            <div className="flex items-center space-x-1">
              <Users size={14} />
              <div className="flex -space-x-1">
                {card.assignees.slice(0, 3).map((assignee) => (
                  <div
                    key={assignee.id}
                    className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-white"
                    style={{ backgroundColor: assignee.color }}
                    title={assignee.name}
                  >
                    {assignee.name.charAt(0).toUpperCase()}
                  </div>
                ))}
                {card.assignees.length > 3 && (
                  <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-400 flex items-center justify-center text-xs font-medium text-white">
                    +{card.assignees.length - 3}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {showDetails && (
        <CardDetailsModal
          card={card}
          columnId={columnId}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
}

function CardDetailsModal({ card, columnId, onClose }: { card: CardType; columnId: string; onClose: () => void }) {
  const [newComment, setNewComment] = useState('');
  const { state, dispatch } = useBoard();

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now().toString(),
        text: newComment,
        author: state.currentUser,
        createdAt: new Date(),
      };
      dispatch({ type: 'ADD_COMMENT', payload: { cardId: card.id, comment } });
      setNewComment('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">{card.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          {card.description && (
            <div className="mb-4">
              <h3 className="font-medium text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600">{card.description}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Priority</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColors[card.priority]}`}>
                {card.priority}
              </span>
            </div>
            {card.dueDate && (
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Due Date</h3>
                <p className="text-gray-600">{format(card.dueDate, 'MMM d, yyyy')}</p>
              </div>
            )}
          </div>

          {card.assignees.length > 0 && (
            <div className="mb-4">
              <h3 className="font-medium text-gray-900 mb-2">Assignees</h3>
              <div className="flex flex-wrap gap-2">
                {card.assignees.map((assignee) => (
                  <div
                    key={assignee.id}
                    className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-full"
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white"
                      style={{ backgroundColor: assignee.color }}
                    >
                      {assignee.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm text-gray-700">{assignee.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-4">
            <h3 className="font-medium text-gray-900 mb-2">Comments</h3>
            <div className="space-y-3">
              {card.comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white flex-shrink-0"
                    style={{ backgroundColor: comment.author.color }}
                  >
                    {comment.author.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900">{comment.author.name}</span>
                      <span className="text-xs text-gray-500">
                        {format(comment.createdAt, 'MMM d, h:mm a')}
                      </span>
                    </div>
                    <p className="text-gray-600">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex space-x-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddComment();
                  }
                }}
              />
              <button
                onClick={handleAddComment}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
