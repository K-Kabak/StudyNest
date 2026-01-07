import { useState, useEffect } from 'react';
/* eslint-disable-next-line no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from '../components/Navigation/Navigation';
import { TimerDisplay } from '../components/Timer/TimerDisplay';
import { TimerControls } from '../components/Timer/TimerControls';
import { TaskList } from '../components/TaskList/TaskList';
import { SoundPanel } from '../components/SoundPanel/SoundPanel';
import { Settings } from '../components/Settings/Settings';
import { StatsPanel } from '../components/StatsPanel/StatsPanel';
import { Modal } from '../components/Modals/Modal';
import { FocusMode } from '../components/FocusMode/FocusMode';
import { useTimer } from '../hooks/useTimer';

import { useSettings } from '../hooks/useLocalStorage';
import { useTasks } from '../hooks/useTasks';
import { useStats } from '../hooks/useStats';
import { useAudio } from '../hooks/useAudio';

/**
 * Dashboard - main application view
 */
export default function Dashboard() {
  const [activeView, setActiveView] = useState('dashboard');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showFocusMode, setShowFocusMode] = useState(false);

  // Hooks
  const { settings, updateSetting } = useSettings();
  const stats = useStats();
  const timer = useTimer(settings.workDuration, settings.breakDuration, (duration) => {
    stats.addSession(duration);
  });
  const tasks = useTasks();
  const audio = useAudio();

  // Handle data import
  const handleImportData = (importedData) => {
    if (importedData.tasks) {
      tasks.setTasks(importedData.tasks);
    }
    if (importedData.stats) {
      stats.setStats(importedData.stats);
    }
    if (importedData.settings) {
      Object.keys(importedData.settings).forEach(key => {
        updateSetting(key, importedData.settings[key]);
      });
    }
    // Refresh page to apply all changes
    window.location.reload();
  };



  // Key bindings
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Don't trigger shortcuts when in focus mode
      if (showFocusMode) return;
      
      if (e.code === 'Space') {
        e.preventDefault();
        timer.toggleTimer();
      }
      if (e.key === 'r' || e.key === 'R') {
        timer.resetTimer();
      }
      if (e.key === 'n' || e.key === 'N') {
        timer.skipSession();
      }
      if (e.key === 't' || e.key === 'T') {
        setActiveView(activeView === 'tasks' ? 'dashboard' : 'tasks');
      }
      if (e.key === 'f' || e.key === 'F') {
        setShowFocusMode(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [timer, activeView, showFocusMode]);

  // Page padding for mobile nav
  const viewContent = (
    <>
      {/* Dashboard View */}
      <motion.div
        key="dashboard"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-8"
      >
        <div className="flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">StudyNest</h1>
          <p className="text-neutral-600 dark:text-neutral-400">Focus better. One session at a time.</p>
        </div>

        {/* Timer */}
        <TimerDisplay
          timeLeft={timer.timeLeft}
          totalDuration={
            timer.isBreak ? settings.breakDuration * 60 : settings.workDuration * 60
          }
          isBreak={timer.isBreak}
          isRunning={timer.isRunning}
        />

        {/* Controls */}
        <TimerControls
          isRunning={timer.isRunning}
          onToggle={timer.toggleTimer}
          onReset={timer.resetTimer}
          onSkip={timer.skipSession}
          onFocusMode={() => setShowFocusMode(true)}
        />

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          <div className="text-center p-4 bg-neutral-50 rounded-lg">
            <p className="text-2xl font-bold text-primary-600">{timer.sessionsCompleted}</p>
            <p className="text-xs text-neutral-600 mt-1">Sessions</p>
          </div>
          <div className="text-center p-4 bg-neutral-50 rounded-lg">
            <p className="text-2xl font-bold text-success-600">{tasks.completedCount}</p>
            <p className="text-xs text-neutral-600 mt-1">Tasks Done</p>
          </div>
          <div className="text-center p-4 bg-neutral-50 rounded-lg">
            <p className="text-2xl font-bold text-primary-600">{settings.workDuration}</p>
            <p className="text-xs text-neutral-600 mt-1">Min/Session</p>
          </div>
        </div>
      </motion.div>

      {/* Tasks View */}
      <AnimatePresence>
        {activeView === 'tasks' && (
          <motion.div
            key="tasks"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6 max-w-2xl"
          >
            <h2 className="text-2xl font-bold text-neutral-900">Tasks</h2>
            <TaskList 
              tasks={tasks.tasks}
              currentTask={tasks.currentTask}
              onAddTask={tasks.addTask}
              onDeleteTask={tasks.deleteTask}
              onToggleTask={tasks.toggleTask}
              onUpdateTask={tasks.updateTask}
              onClearCompleted={tasks.clearCompleted}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sounds View */}
      <AnimatePresence>
        {activeView === 'sounds' && (
          <motion.div
            key="sounds"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-neutral-900">Ambient Sounds</h2>
            <SoundPanel
              currentSound={audio.currentSound}
              isPlaying={audio.isPlaying}
              volume={audio.volume}
              onSelectSound={(id, path) => {
                audio.playSound(path);
              }}
              onTogglePlay={audio.togglePlayPause}
              onVolumeChange={audio.setVolume}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats View */}
      <AnimatePresence>
        {activeView === 'stats' && (
          <motion.div
            key="stats"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6 max-w-md"
          >
            <h2 className="text-2xl font-bold text-neutral-900">Statistics</h2>
            <StatsPanel
              stats={stats.stats}
              todaySessions={stats.stats.todaySessions || 0}
              todayMinutes={stats.stats.todayMinutes || 0}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <div className="w-full min-h-screen bg-neutral-100 dark:bg-neutral-900 pb-24 md:pb-0">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8 md:flex gap-8">
        {/* Navigation - Desktop Sidebar */}
        <div className="hidden md:block flex-shrink-0">
          <Navigation 
            activeView={activeView} 
            onNavigate={setActiveView}
            onSettingsClick={() => setShowSettingsModal(true)}
          />
        </div>

        {/* Content */}
        <motion.main className="flex-1 space-y-8">
          <AnimatePresence mode="wait">{viewContent}</AnimatePresence>
        </motion.main>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Navigation 
          activeView={activeView} 
          onNavigate={setActiveView}
          onSettingsClick={() => setShowSettingsModal(true)}
        />
      </div>

      {/* Settings Modal */}
      <Modal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        title="Settings"
        size="md"
      >
        <Settings
          settings={settings}
          onSettingChange={updateSetting}
          tasks={tasks.tasks}
          stats={stats}
          onImportData={handleImportData}
        />
      </Modal>

      {/* Focus Mode */}
      <FocusMode
        isOpen={showFocusMode}
        onClose={() => setShowFocusMode(false)}
        timer={timer}
        audio={audio}
        onTimerToggle={timer.toggleTimer}
        onSoundSelect={audio.playSound}
        onVolumeChange={audio.setVolume}
      />
    </div>
  );
}
