import { useState } from 'react';
/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Trash2, Edit2 } from 'lucide-react';

/**
 * TaskList component
 */
export const TaskList = ({
  tasks = [],
  currentTask = null,
  onAddTask = () => {},
  onDeleteTask = () => {},
  onToggleTask = () => {},
  onUpdateTask = () => {},
  onClearCompleted = () => {},
}) => {
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleAddTask = () => {
    if (inputValue.trim()) {
      onAddTask(inputValue);
      setInputValue('');
    }
  };

  const handleUpdateTask = (id) => {
    const trimmedValue = editValue.trim();
    if (trimmedValue) {
      onUpdateTask(id, trimmedValue);
    } else {
      // If empty, delete the task
      onDeleteTask(id);
    }
    setEditingId(null);
    setEditValue('');
  };

  const handleKeyPress = (e, callback) => {
    if (e.key === 'Enter') {
      callback();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="w-full space-y-4">
      {/* Current Task Highlight */}
      {currentTask && (
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="p-4 rounded-lg bg-primary-100 dark:bg-primary-900/20 border-2 border-primary-600"
          role="status"
          aria-label="Current active task"
        >
          <p className="text-xs uppercase tracking-widest font-semibold text-primary-700 dark:text-primary-400">Current Task</p>
          <p className="text-lg font-semibold text-primary-900 dark:text-primary-100 mt-1">{currentTask.text}</p>
        </motion.div>
      )}

      {/* Add Task Input */}
      <div className="flex gap-2" role="form" aria-label="Add new task">
        <Input
          placeholder="Add a new task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e, handleAddTask)}
          aria-label="New task title"
        />
        <Button variant="primary" onClick={handleAddTask} aria-label="Add task">
          Add
        </Button>
      </div>

      {/* Task List */}
      {tasks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-neutral-500 dark:text-neutral-400"
          role="status"
        >
          <p>No tasks added. Add one to focus better.</p>
        </motion.div>
      ) : (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-2" role="list" aria-label="Task list">
          {tasks.map((task) => (
            <motion.div key={task.id} variants={itemVariants} className="flex items-center gap-3">
              {/* Checkbox */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onToggleTask(task.id)}
                aria-label={`Toggle task ${task.text}`}
                data-testid="toggle-task"
                className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                  task.completed
                    ? 'bg-success-500 border-success-500'
                    : 'border-neutral-300 hover:border-success-500'
                }`}
              >
                {task.completed && <span className="text-white text-sm">✓</span>}
              </motion.button>

              {/* Task text or edit input */}
              {editingId === task.id ? (
                <Input
                  autoFocus
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, () => handleUpdateTask(task.id))}
                  onBlur={() => handleUpdateTask(task.id)}
                  className="flex-1"
                />
              ) : (
                <span
                  className={`flex-1 ${
                    task.completed ? 'text-neutral-500 line-through' : 'text-neutral-900'
                  }`}
                >
                  {task.text}
                </span>
              )}

              {/* Edit/Delete buttons */}
              <div className="flex gap-2">
                {!task.completed && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setEditingId(task.id);
                      setEditValue(task.text);
                    }}
                    aria-label="Edit task"
                    data-testid="edit-task"
                    className="text-neutral-600 hover:text-primary-600 transition-colors"
                  >
                    <Edit2 size={16} />
                  </motion.button>
                )}

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onDeleteTask(task.id)}
                  aria-label="Delete task"
                  data-testid="delete-task"
                  className="text-neutral-600 hover:text-danger-600 transition-colors"
                >
                  <Trash2 size={16} />
                </motion.button>
              </div>
            </motion.div>
          ))}
          
          {tasks.some(task => task.completed) && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="pt-4 flex justify-end"
            >
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClearCompleted}
                className="text-neutral-500 hover:text-danger-600"
              >
                Clear Completed
              </Button>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};
