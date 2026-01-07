# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-12-31

### Added

#### Core Features (MVP)
- **Pomodoro Timer** - 25-minute work sessions with 5-minute breaks (customizable durations)
- **Circular Progress Indicator** - Visual timer display with percentage completion
- **Task Management** - Add, edit, complete, delete, and clear completed tasks
- **localStorage Persistence** - All data automatically saved to browser storage
- **Settings Panel** - Customize work/break durations per session

#### Premium Features
- **Focus Mode** - Fullscreen immersive timer view (Press F to activate)
- **Dark Mode** - System preference detection with manual toggle and smooth transitions
- **Ambient Sounds** - 5 preset soundscapes (Rain, Café, Forest, White Noise, Ocean)
  - Web Audio API fallback for procedural sound generation
  - Volume control with persistent settings
- **Advanced Statistics** - Interactive charts powered by Recharts
  - Weekly sessions bar chart
  - Focus time trend line chart
  - Task completion rate pie chart
  - Summary cards (total sessions, focus hours, completed tasks, average session)
- **Export/Import** - JSON backup and restore for all app data (tasks, settings, statistics)
- **PWA Support** - Installable application with offline capability
  - Service worker caching strategy
  - Custom add-to-home-screen prompt
  - App manifest with icons and theme colors

#### User Experience
- **Keyboard Shortcuts** - Space (play/pause), R (reset), N (skip), T (toggle tasks), F (focus mode), Esc (exit)
- **Responsive Design** - Mobile-first approach with optimized layouts for all screen sizes
- **Framer Motion Animations** - Smooth transitions and micro-interactions (60fps)
- **Smooth Scrolling** - Lenis library integration for fluid scroll behavior
- **Dual Navigation** - Sidebar navigation for desktop, bottom sheet for mobile

#### Technical
- **Build Optimization** - Terser minification, tree-shaking, 68% gzip compression
  - JS Bundle: 769 KB (233 KB gzipped)
  - CSS Bundle: 22.6 KB (5 KB gzipped)
- **Code Quality** - ESLint configuration with React hooks best practices
- **End-to-End Testing** - Playwright test suite for task management flows
- **CI/CD Pipelines** - GitHub Actions for build and deployment
- **Deployment Ready** - Netlify and Vercel configurations included

### Technical Stack

- **Frontend Framework** - React 19.2.0
- **Build Tool** - Vite 7.2 (Rolldown variant)
- **Styling** - Tailwind CSS 3.4.19
- **Routing** - React Router DOM 7.11.0
- **Animations** - Framer Motion 12.23.26
- **Charts** - Recharts 3.6.0
- **Icons** - Lucide React 0.562.0
- **Smooth Scroll** - Lenis 1.3.17
- **Testing** - Playwright 1.57.0

### Performance

- Lighthouse readiness (pending production HTTPS deployment)
- Fast build times with Rolldown
- Optimized bundle size under 250 KB gzipped
- Service worker offline-first strategy

[1.0.0]: https://github.com/kacper/StudyNest/releases/tag/v1.0.0
