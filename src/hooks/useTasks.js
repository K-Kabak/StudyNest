import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '../utils/constants';

/**
 * Hook for managing tasks
 */
export const useTasks = () => {
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEYS.TASKS, []);

  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  };

  const updateTask = (id, text) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, text } : task)));
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  const currentTask = tasks.find((task) => !task.completed) || null;
  const completedCount = tasks.filter((task) => task.completed).length;

  return {
    tasks,
    addTask,
    deleteTask,
    toggleTask,
    updateTask,
    clearCompleted,
    currentTask,
    completedCount,
    totalCount: tasks.length,
    setTasks,
  };
};
