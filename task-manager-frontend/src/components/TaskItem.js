import React, { useState } from 'react';
import { PencilIcon, TrashIcon, ClockIcon } from '@heroicons/react/24/outline';
import TaskEdit from './TaskEdit';
import { PRIORITY_STYLES, STATUS_STYLES } from '../constants/taskConstants';

const TaskItem = ({ task, deleteTaskMutation, updateTaskMutation }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const priorityStyle = PRIORITY_STYLES[task.priority];
  const statusStyle = STATUS_STYLES[task.status];

  const handleStatusChange = () => {
    const newStatus = task.status === 'COMPLETED' ? 'TODO' : 'COMPLETED';
    updateTaskMutation.mutate({ 
      id: task.id, 
      taskData: { status: newStatus }
    });
  };

  const formatDate = (date) => {
    const taskDate = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (taskDate.toDateString() === today.toDateString()) {
      return "Aujourd'hui";
    } else if (taskDate.toDateString() === tomorrow.toDateString()) {
      return "Demain";
    }
    return taskDate.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <>
      <div className={`
        p-4 mb-3 rounded-lg border transition-all duration-200
        ${task.status === 'COMPLETED' ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200 hover:border-indigo-200 hover:shadow-md'}
      `}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleStatusChange}
              className={`
                w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${task.status === 'COMPLETED' 
                  ? 'bg-green-500 border-green-500 text-white' 
                  : 'border-gray-300 hover:border-indigo-500'}
              `}
            >
              {task.status === 'COMPLETED' && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
              )}
            </button>
            <div className={task.status === 'COMPLETED' ? 'line-through text-gray-500' : ''}>
              <h3 className="font-medium text-gray-900">{task.title}</h3>
              <p className="text-sm text-gray-500">{task.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityStyle.bg} ${priorityStyle.text}`}>
              {priorityStyle.icon} {priorityStyle.label}
            </span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
              {statusStyle.icon} {statusStyle.label}
            </span>
          </div>
        </div>
        
        <div className="mt-3 flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-500">
            <ClockIcon className="w-4 h-4 mr-1" />
            <span>{formatDate(task.dueDate)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsEditOpen(true)}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-indigo-600"
            >
              <PencilIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => deleteTaskMutation.mutate(task.id)}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-red-600"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <TaskEdit
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        task={task}
        updateTaskMutation={updateTaskMutation}
      />
    </>
  );
};

export default TaskItem; 