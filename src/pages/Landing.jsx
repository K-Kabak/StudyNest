/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Clock, Volume2, ListTodo, Zap } from 'lucide-react';

/**
 * Landing Page - entry point for new users
 */
export default function Landing() {
  const features = [
    {
      icon: Clock,
      title: 'Focus Timer',
      description: 'Pomodoro timer optimized for deep work. 25 min focus + 5 min breaks.',
    },
    {
      icon: Volume2,
      title: 'Ambient Sounds',
      description: 'Curated sounds to enhance your focus. Rain, café, forest, and more.',
    },
    {
      icon: ListTodo,
      title: 'Task Manager',
      description: 'Keep track of your goals. Simple, distraction-free task list.',
    },
    {
      icon: Zap,
      title: 'Zero Setup',
      description: 'No account needed. All data stored locally in your browser.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full bg-neutral-100">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-br from-primary-50 via-neutral-100 to-success-50">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 leading-tight">
              Focus Better with <span className="text-primary-600">StudyNest</span>
            </h1>
            <p className="text-xl text-neutral-600 mt-6">
              A minimal, premium study app designed for deep work. Pomodoro timer, ambient sounds, and task management—all without distractions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/dashboard">
              <Button variant="primary" size="lg">
                Start Your Session
              </Button>
            </Link>
            <button className="px-6 py-3 rounded-lg bg-white border-2 border-neutral-300 text-neutral-900 font-semibold hover:bg-neutral-50 transition-all">
              Learn More
            </button>
          </motion.div>

          {/* Hero Illustration Placeholder */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="mt-12 text-6xl"
          >
            🎯
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-neutral-900 mb-4">Why StudyNest?</h2>
          <p className="text-center text-neutral-600 text-lg mb-12 max-w-2xl mx-auto">
            Everything you need to maintain focus and track your progress.
          </p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  className="p-8 rounded-xl bg-neutral-50 border border-neutral-200 hover:border-primary-600 hover:shadow-lg transition-all"
                >
                  <Icon className="w-12 h-12 text-primary-600 mb-4" />
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">{feature.title}</h3>
                  <p className="text-neutral-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-neutral-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-neutral-900 mb-12">How It Works</h2>

          <div className="space-y-8">
            {[
              {
                step: 1,
                title: 'Set Your Focus',
                description: 'Choose your task and start a 25-minute focus session.',
              },
              {
                step: 2,
                title: 'Stay in the Zone',
                description: 'Play ambient sounds to enhance your concentration.',
              },
              {
                step: 3,
                title: 'Take a Break',
                description: 'Relax for 5 minutes. Track your completed tasks and sessions.',
              },
              {
                step: 4,
                title: 'Build Your Streak',
                description: 'Repeat. Watch your productivity metrics grow.',
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-600 text-white font-bold flex items-center justify-center">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">{item.title}</h3>
                  <p className="text-neutral-600 mt-2">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold text-neutral-900">Ready to Focus?</h2>
          <p className="text-lg text-neutral-600">
            No account. No distractions. Just focus. Start your first session today.
          </p>

          <Link to="/dashboard">
            <Button variant="primary" size="lg">
              Start Free Now
            </Button>
          </Link>

          <p className="text-sm text-neutral-500">
            All your data is stored locally. Privacy guaranteed.
          </p>
        </div>
      </section>
    </div>
  );
}
