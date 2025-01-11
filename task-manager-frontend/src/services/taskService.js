import api from '../config/axios';

export const taskService = {
  queries: {

    all: (sortBy) => ({
      queryKey: ['tasks', sortBy],
      queryFn: async () => {
        const response = await api.get('/tasks', {
          params: { sortBy }
        });
        return response.data;
      }
    })
  },

  mutations: {
    create: () => ({
      mutationFn: async (taskData) => {
        const response = await api.post('/tasks', taskData);
        return response.data;
      }
    }),
    
    update: () => ({
      mutationFn: async ({ id, taskData }) => {
        const response = await api.put(`/tasks/${id}`, taskData);
        return response.data;
      }
    }),
    
    delete: () => ({
      mutationFn: async (id) => {
        await api.delete(`/tasks/${id}`);
      }
    })
  }

 
}; 