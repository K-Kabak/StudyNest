import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { ExportImport } from '../ExportImport/ExportImport';
import { DEFAULT_WORK_DURATION, DEFAULT_BREAK_DURATION } from '../../utils/constants';

/**
 * Settings component - app configuration
 */
export const Settings = ({
  settings = {},
  onSettingChange = () => {},
  tasks = [],
  stats = {},
  onImportData = () => {},
}) => {
  const handleWorkDurationChange = (e) => {
    onSettingChange('workDuration', parseInt(e.target.value) || DEFAULT_WORK_DURATION);
  };

  const handleBreakDurationChange = (e) => {
    onSettingChange('breakDuration', parseInt(e.target.value) || DEFAULT_BREAK_DURATION);
  };

  const handleThemeChange = (theme) => {
    onSettingChange('theme', theme);
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      {/* Timer Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-900">Timer Settings</h3>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Work Duration (minutes)
          </label>
          <Input
            type="number"
            min="1"
            max="60"
            value={settings.workDuration || DEFAULT_WORK_DURATION}
            onChange={handleWorkDurationChange}
          />
          <p className="text-xs text-neutral-500 mt-1">
            How long should each focus session be?
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Break Duration (minutes)
          </label>
          <Input
            type="number"
            min="1"
            max="30"
            value={settings.breakDuration || DEFAULT_BREAK_DURATION}
            onChange={handleBreakDurationChange}
          />
          <p className="text-xs text-neutral-500 mt-1">
            How long should breaks be?
          </p>
        </div>
      </div>

      {/* Theme Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-900">Theme</h3>

        <div className="flex gap-2">
          {['light', 'dark'].map((theme) => (
            <button
              key={theme}
              onClick={() => handleThemeChange(theme)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                settings.theme === theme
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-200 text-neutral-900 hover:bg-neutral-300'
              }`}
            >
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Export/Import Section */}
      <div className="pt-6 border-t border-neutral-200 dark:border-neutral-700">
        <ExportImport
          tasks={tasks}
          settings={settings}
          stats={stats}
          onImport={onImportData}
        />
      </div>

      {/* Info */}
      <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
        <p className="text-xs text-neutral-600 dark:text-neutral-400">
          <strong>Tip:</strong> All your data is stored locally in your browser. No account needed!
        </p>
      </div>
    </div>
  );
};
