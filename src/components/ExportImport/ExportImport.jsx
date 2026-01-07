import { Download, Upload } from 'lucide-react';
/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { useState } from 'react';

/**
 * Export/Import component for session data
 */
export const ExportImport = ({ tasks, settings, stats, onImport }) => {
  const [importStatus, setImportStatus] = useState(null);

  const handleExport = () => {
    const exportData = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      tasks: tasks,
      settings: settings,
      stats: stats,
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `studynest-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setImportStatus({ type: 'success', message: 'Data exported successfully!' });
    setTimeout(() => setImportStatus(null), 3000);
  };

  const handleImport = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result);
        
        // Validate data structure
        if (!importedData.version || !importedData.tasks) {
          throw new Error('Invalid backup file format');
        }

        // Call the import handler
        onImport(importedData);

        setImportStatus({ type: 'success', message: 'Data imported successfully!' });
        setTimeout(() => setImportStatus(null), 3000);
      } catch (error) {
        setImportStatus({ 
          type: 'error', 
          message: `Import failed: ${error.message}` 
        });
        setTimeout(() => setImportStatus(null), 5000);
      }
    };

    reader.onerror = () => {
      setImportStatus({ type: 'error', message: 'Failed to read file' });
      setTimeout(() => setImportStatus(null), 3000);
    };

    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
          Backup & Restore
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
          Export your tasks, settings, and stats to a JSON file, or import from a previous backup.
        </p>
      </div>

      {/* Export/Import buttons */}
      <div className="flex gap-4 flex-wrap">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="primary"
            onClick={handleExport}
            className="flex items-center gap-2"
          >
            <Download size={18} />
            Export Data
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <label className="cursor-pointer">
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
            <Button
              as="span"
              variant="secondary"
              className="flex items-center gap-2"
            >
              <Upload size={18} />
              Import Data
            </Button>
          </label>
        </motion.div>
      </div>

      {/* Status message */}
      {importStatus && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className={`p-4 rounded-lg ${
            importStatus.type === 'success'
              ? 'bg-success-50 text-success-600 border border-success-200'
              : 'bg-danger-50 text-danger-600 border border-danger-200'
          }`}
        >
          <p className="text-sm font-medium">{importStatus.message}</p>
        </motion.div>
      )}

      {/* Info box */}
      <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
        <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
          What's included:
        </h4>
        <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
          <li>• All tasks (completed and pending)</li>
          <li>• Timer settings (work/break duration)</li>
          <li>• Session statistics</li>
          <li>• Theme preferences</li>
        </ul>
      </div>
    </div>
  );
};
