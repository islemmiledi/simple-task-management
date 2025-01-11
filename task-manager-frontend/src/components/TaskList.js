import React from 'react';
import TaskItem from './TaskItem';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '../services/taskService';
import { toast } from 'react-hot-toast';

const TaskList = ({ tasks }) => {
  const queryClient = useQueryClient();

  const updateTaskMutation = useMutation({
    ...taskService.mutations.update(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('✨ Tâche modifiée avec succès!');
    },
    onError: () => {
      toast.error('Update Error: Erreur lors de la modification de la tâche');
    }
  }); 

  const deleteTaskMutation = useMutation({
    ...taskService.mutations.delete(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('✨ Tâche supprimée avec succès!');
    },
    onError: () => {
      toast.error('Delete Error: Erreur lors de la suppression de la tâche');
    }
  });

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune tâche</h3>
        <p className="mt-1 text-sm text-gray-500">
          Commencez par créer une nouvelle tâche.
        </p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          updateTaskMutation={updateTaskMutation}
          deleteTaskMutation={deleteTaskMutation}
        />
      ))}
    </ul>
  );
};

export default TaskList; 