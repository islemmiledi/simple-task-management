export const PRIORITY_STYLES = {
  LOW: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    icon: '🟢',
    label: 'Basse'
  },
  MEDIUM: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    icon: '🟡',
    label: 'Moyenne'
  },
  HIGH: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    icon: '🔴',
    label: 'Haute'
  }
};

export const STATUS_STYLES = {
  TODO: {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    icon: '📝',
    label: 'À faire'
  },
  IN_PROGRESS: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    icon: '⏳',
    label: 'En cours'
  },
  COMPLETED: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    icon: '✅',
    label: 'Terminé'
  }
};

export const PRIORITY_OPTIONS = [
  { id: 'LOW', name: 'Basse priorité', icon: '🟢', color: 'text-green-600 bg-green-50' },
  { id: 'MEDIUM', name: 'Priorité moyenne', icon: '🟡', color: 'text-yellow-600 bg-yellow-50' },
  { id: 'HIGH', name: 'Haute priorité', icon: '🔴', color: 'text-red-600 bg-red-50' }
];

export const STATUS_OPTIONS = [
  { id: 'TODO', name: 'À faire', icon: '📝', color: 'text-gray-600 bg-gray-50' },
  { id: 'IN_PROGRESS', name: 'En cours', icon: '⏳', color: 'text-blue-600 bg-blue-50' },
  { id: 'COMPLETED', name: 'Terminé', icon: '✅', color: 'text-green-600 bg-green-50' }
]; 