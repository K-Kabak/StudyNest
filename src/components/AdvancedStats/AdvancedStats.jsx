import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from '../ui/Card';
import { useMemo } from 'react';

const COLORS = ['#5b4e9e', '#a8d5ba', '#e8a0a0', '#dcc9c0', '#8b7ebd'];

/**
 * Advanced Statistics Charts Component
 */
export const AdvancedStats = ({ stats = {} }) => {
  const sessionData = useMemo(() => {
    const history = stats.history || [];

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      const dateStr = date.toISOString().split('T')[0];
      const dayName = date.toLocaleDateString(undefined, { weekday: 'short' });

      const dayData = history.find((h) => h.date === dateStr);

      return {
        day: dayName,
        sessions: dayData ? dayData.sessions : 0,
        focusTime: dayData ? dayData.minutes : 0,
      };
    });
  }, [stats]);

  const taskData = useMemo(() => [
    { name: 'Completed', value: stats.tasksCompleted || 0 },
    { name: 'Pending', value: stats.tasksPending || 0 },
  ], [stats]);

  const focusTimeData = useMemo(() => sessionData.map((d) => ({ day: d.day, minutes: d.focusTime })), [sessionData]);

  return (
    <div className="space-y-6">
      {/* Sessions per Day - Bar Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
          Sessions This Week
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={sessionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="day" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #ddd',
                borderRadius: '8px'
              }} 
            />
            <Legend />
            <Bar dataKey="sessions" fill="#5b4e9e" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Focus Time Trend - Line Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
          Focus Time Trend
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={focusTimeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="day" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #ddd',
                borderRadius: '8px'
              }} 
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="minutes" 
              stroke="#a8d5ba" 
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Task Completion - Pie Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
          Task Completion Rate
        </h3>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={taskData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value, percent }) => 
                  `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {taskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Summary Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-primary-600">{stats.totalSessions || 0}</p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Total Sessions</p>
        </Card>
        
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-success-600">{stats.totalFocusTime || 0}</p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Focus Hours</p>
        </Card>
        
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-primary-600">{stats.tasksCompleted || 0}</p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Tasks Done</p>
        </Card>
        
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-success-600">
            {stats.averageSession || '25'} min
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Avg Session</p>
        </Card>
      </div>
    </div>
  );
};
