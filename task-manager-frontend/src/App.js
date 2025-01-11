import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { taskService } from './services/taskService';
import { PlusIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, ClockIcon, ExclamationTriangleIcon, ChartBarIcon } from '@heroicons/react/24/solid';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading } = useQuery({
    ...taskService.queries.all(sortBy),
    staleTime: 5000,
  });

  
  const stats = {
    completed: tasks.filter(task => task.status === 'COMPLETED').length,
    inProgress: tasks.filter(task => task.status === 'IN_PROGRESS').length,
    highPriority: tasks.filter(task => task.priority === 'HIGH').length,
    total: tasks.length
  };

  const createTaskMutation = useMutation({

    ...taskService.mutations.create(),
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('✨ Tâche créée avec succès!');
      setIsFormOpen(false);
      
    },
    onError: () => {
      toast.error('Create Error: Erreur lors de la création de la tâche');
    }
  });



  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      <header className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 pb-32">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-white flex items-center space-x-3">
              <span className="text-5xl">✨</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                Gestionnaire de Tâches
              </span>
            </h1>
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center px-6 py-3 border-2 border-white text-sm font-medium rounded-full text-white hover:bg-white hover:text-indigo-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
              Nouvelle Tâche
            </button>
          </div>
        </div>
      </header>

      <main className="-mt-32 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 p-3 bg-green-100 rounded-xl">
                    <CheckCircleIcon className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Terminées
                      </dt>
                      <dd className="flex items-baseline mt-1">
                        <div className="text-3xl font-extrabold text-gray-900">
                          {stats.completed}
                        </div>
                        <div className="ml-2 text-sm text-gray-600">
                          sur {stats.total}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 px-6 py-2">
                <div className="text-sm text-green-600 font-medium">
                  {((stats.completed / stats.total) * 100).toFixed(0)}% complété
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 p-3 bg-blue-100 rounded-xl">
                    <ClockIcon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                        En cours
                      </dt>
                      <dd className="flex items-baseline mt-1">
                        <div className="text-3xl font-extrabold text-gray-900">
                          {stats.inProgress}
                        </div>
                        <div className="ml-2 text-sm text-gray-600">
                          tâches actives
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 px-6 py-2">
                <div className="text-sm text-blue-600 font-medium">
                  En progression
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 p-3 bg-red-100 rounded-xl">
                    <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Prioritaires
                      </dt>
                      <dd className="flex items-baseline mt-1">
                        <div className="text-3xl font-extrabold text-gray-900">
                          {stats.highPriority}
                        </div>
                        <div className="ml-2 text-sm text-gray-600">
                          urgentes
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-red-50 px-6 py-2">
                <div className="text-sm text-red-600 font-medium">
                  Haute priorité
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 p-3 bg-purple-100 rounded-xl">
                    <ChartBarIcon className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </dt>
                      <dd className="flex items-baseline mt-1">
                        <div className="text-3xl font-extrabold text-gray-900">
                          {stats.total}
                        </div>
                        <div className="ml-2 text-sm text-gray-600">
                          tâches
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 px-6 py-2">
                <div className="text-sm text-purple-600 font-medium">
                  Vue d'ensemble
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">
                  Mes Tâches
                </h2>
                <div className="flex items-center space-x-2">
                  <FunnelIcon className="h-5 w-5 text-gray-400" />
                  <select
                    value={sortBy || ''}
                    onChange={(e) => setSortBy(e.target.value || null)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="">Trier par</option>
                    <option value="dueDate">Date d'échéance</option>
                    <option value="priority">Priorité</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="px-4 py-5 sm:p-6">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-100 border-t-indigo-500"></div>
                </div>
              ) : (
                <TaskList 
                  tasks={tasks} 
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <TaskForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        createTaskMutation={createTaskMutation}
      />
    </div>
  );
}

export default App; 