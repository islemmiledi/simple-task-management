import React, { useState, Fragment } from 'react';
import { Dialog, Transition, Listbox } from '@headlessui/react';
import { XMarkIcon, CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '../constants/taskConstants';

const TaskForm = ({ isOpen, onClose, createTaskMutation }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: STATUS_OPTIONS[0].id,
    priority: PRIORITY_OPTIONS[1].id,
    dueDate: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    createTaskMutation.mutate(formData);
      
      setFormData({
        title: '',
        description: '',
        status: STATUS_OPTIONS[0].id,
        priority: PRIORITY_OPTIONS[1].id,
        dueDate: new Date().toISOString().split('T')[0]
      });
  };

  // Helper function to find the full option object by ID
  const findOptionById = (options, id) => {
    return options.find(option => option.id === id);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all">
                <div className="absolute right-4 top-4">
                  <button
                    onClick={onClose}
                    className="rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <Dialog.Title as="h3" className="text-2xl font-semibold leading-6 text-gray-900 mb-8">
                  ✨ Nouvelle tâche
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Titre */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titre
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      placeholder="Entrez le titre de la tâche"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      placeholder="Décrivez la tâche..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Priorité */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Priorité
                      </label>
                      <Listbox
                        value={findOptionById(PRIORITY_OPTIONS, formData.priority)}
                        onChange={(option) => setFormData({ ...formData, priority: option.id })}
                      >
                        <div className="relative">
                          <Listbox.Button className="relative w-full cursor-pointer rounded-xl bg-white py-3 pl-4 pr-10 text-left shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm">
                            <span className="flex items-center">
                              <span className="mr-2">{findOptionById(PRIORITY_OPTIONS, formData.priority).icon}</span>
                              <span className={`block truncate ${findOptionById(PRIORITY_OPTIONS, formData.priority).color}`}>
                                {findOptionById(PRIORITY_OPTIONS, formData.priority).name}
                              </span>
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                          </Listbox.Button>
                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                              {PRIORITY_OPTIONS.map((option) => (
                                <Listbox.Option
                                  key={option.id}
                                  className={({ active }) =>
                                    `relative cursor-pointer select-none py-2 pl-4 pr-9 ${
                                      active ? 'bg-indigo-50' : 'text-gray-900'
                                    }`
                                  }
                                  value={option}
                                >
                                  {({ selected }) => (
                                    <>
                                      <div className="flex items-center">
                                        <span className="mr-2">{option.icon}</span>
                                        <span className={`block truncate ${option.color}`}>
                                          {option.name}
                                        </span>
                                      </div>
                                      {selected && (
                                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-indigo-600">
                                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                      )}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
                    </div>

                    {/* Statut */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Statut
                      </label>
                      <Listbox
                        value={findOptionById(STATUS_OPTIONS, formData.status)}
                        onChange={(option) => setFormData({ ...formData, status: option.id })}
                      >
                        <div className="relative">
                          <Listbox.Button className="relative w-full cursor-pointer rounded-xl bg-white py-3 pl-4 pr-10 text-left shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm">
                            <span className="flex items-center">
                              <span className="mr-2">{findOptionById(STATUS_OPTIONS, formData.status).icon}</span>
                              <span className={`block truncate ${findOptionById(STATUS_OPTIONS, formData.status).color}`}>
                                {findOptionById(STATUS_OPTIONS, formData.status).name}
                              </span>
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                          </Listbox.Button>
                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                              {STATUS_OPTIONS.map((option) => (
                                <Listbox.Option
                                  key={option.id}
                                  className={({ active }) =>
                                    `relative cursor-pointer select-none py-2 pl-4 pr-9 ${
                                      active ? 'bg-indigo-50' : 'text-gray-900'
                                    }`
                                  }
                                  value={option}
                                >
                                  {({ selected }) => (
                                    <>
                                      <div className="flex items-center">
                                        <span className="mr-2">{option.icon}</span>
                                        <span className={`block truncate ${option.color}`}>
                                          {option.name}
                                        </span>
                                      </div>
                                      {selected && (
                                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-indigo-600">
                                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                      )}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
                    </div>
                  </div>

                  {/* Date d'échéance */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date d'échéance
                    </label>
                    <input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                      className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      required
                    />
                  </div>

                  <div className="mt-8 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Créer la tâche
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TaskForm;