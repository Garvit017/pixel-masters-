import React from 'react';
import { useBoard } from '../context/BoardContext';
import { BarChart3, CheckCircle, Clock, AlertTriangle, Users, Calendar } from 'lucide-react';

interface BoardStatsProps {
  onClose: () => void;
}

export function BoardStats({ onClose }: BoardStatsProps) {
  const { state } = useBoard();

  const totalCards = state.board.columns.reduce((sum, column) => sum + column.cards.length, 0);
  const completedCards = state.board.columns.find(col => col.title.toLowerCase().includes('done'))?.cards.length || 0;
  const inProgressCards = state.board.columns.find(col => col.title.toLowerCase().includes('progress'))?.cards.length || 0;
  const todoCards = state.board.columns.find(col => col.title.toLowerCase().includes('todo'))?.cards.length || 0;
  
  const overdueCards = state.board.columns.reduce((sum, column) => {
    return sum + column.cards.filter(card => 
      card.dueDate && new Date() > card.dueDate
    ).length;
  }, 0);

  const completionRate = totalCards > 0 ? Math.round((completedCards / totalCards) * 100) : 0;

  const highPriorityCards = state.board.columns.reduce((sum, column) => {
    return sum + column.cards.filter(card => card.priority === 'high').length;
  }, 0);

  const stats = [
    {
      title: 'Total Cards',
      value: totalCards,
      icon: BarChart3,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Completed',
      value: completedCards,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'In Progress',
      value: inProgressCards,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Overdue',
      value: overdueCards,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Board Statistics</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.title} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium text-gray-900">Completion Rate</h3>
              <span className="text-sm text-gray-600">{completionRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>

          {/* Column Breakdown */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Cards by Column</h3>
            <div className="space-y-3">
              {state.board.columns.map((column) => {
                const percentage = totalCards > 0 ? Math.round((column.cards.length / totalCards) * 100) : 0;
                return (
                  <div key={column.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: column.color }}
                      />
                      <span className="text-gray-700">{column.title}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{ 
                            backgroundColor: column.color,
                            width: `${percentage}%`
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-8 text-right">
                        {column.cards.length}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Team Members */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Team Members</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {state.board.members.map((member) => (
                <div key={member.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                    style={{ backgroundColor: member.color }}
                  >
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Priority Distribution */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Priority Distribution</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-semibold text-red-600">{highPriorityCards}</div>
                <div className="text-sm text-red-600">High Priority</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-semibold text-yellow-600">
                  {state.board.columns.reduce((sum, column) => {
                    return sum + column.cards.filter(card => card.priority === 'medium').length;
                  }, 0)}
                </div>
                <div className="text-sm text-yellow-600">Medium Priority</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-semibold text-green-600">
                  {state.board.columns.reduce((sum, column) => {
                    return sum + column.cards.filter(card => card.priority === 'low').length;
                  }, 0)}
                </div>
                <div className="text-sm text-green-600">Low Priority</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
