/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KantorKu - Game Simulasi Karier Kantor Main App Shell
 */

import React, { useEffect, Suspense, lazy } from 'react';
import { useGameStore, AppView } from './store/useGameStore';
import { HeaderNav } from './components/layout/HeaderNav';
import { OnboardingView } from './components/onboarding/OnboardingView';
import { OfficeHubView } from './components/office/OfficeHubView';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { OfflineIndicator } from './components/pwa/OfflineIndicator';

// Lazy-loaded secondary views for high performance & clean code-splitting
const SkillsMapView = lazy(() =>
  import('./components/skills/SkillsMapView').then((m) => ({ default: m.SkillsMapView }))
);
const CareerMapView = lazy(() =>
  import('./components/career/CareerMapView').then((m) => ({ default: m.CareerMapView }))
);
const MissionPlayView = lazy(() =>
  import('./components/mission/MissionPlayView').then((m) => ({ default: m.MissionPlayView }))
);
const CaseFileView = lazy(() =>
  import('./components/cases/CaseFileView').then((m) => ({ default: m.CaseFileView }))
);
const LearningCenterView = lazy(() =>
  import('./features/learning/components/LearningCenterView').then((m) => ({
    default: m.LearningCenterView,
  }))
);
const DictionaryView = lazy(() =>
  import('./components/dictionary/DictionaryView').then((m) => ({ default: m.DictionaryView }))
);
const SettingsView = lazy(() =>
  import('./components/settings/SettingsView').then((m) => ({ default: m.SettingsView }))
);
const AchievementsView = lazy(() =>
  import('./components/achievements/AchievementsView').then((m) => ({ default: m.AchievementsView }))
);
const PortfolioView = lazy(() =>
  import('./components/portfolio/PortfolioView').then((m) => ({ default: m.PortfolioView }))
);
const ShopView = lazy(() =>
  import('./components/shop/ShopView').then((m) => ({ default: m.ShopView }))
);
const DuelView = lazy(() =>
  import('./components/duel/DuelView').then((m) => ({ default: m.DuelView }))
);
const SpeedAttackView = lazy(() =>
  import('./components/speed/SpeedAttackView').then((m) => ({ default: m.SpeedAttackView }))
);
const DetectiveView = lazy(() =>
  import('./components/detective/DetectiveView').then((m) => ({ default: m.DetectiveView }))
);
const MentorView = lazy(() =>
  import('./components/mentor/MentorView').then((m) => ({ default: m.MentorView }))
);
const ZenModeView = lazy(() =>
  import('./components/zen/ZenModeView').then((m) => ({ default: m.ZenModeView }))
);
const ExamCertificationView = lazy(() =>
  import('./components/exam/ExamCertificationView').then((m) => ({
    default: m.ExamCertificationView,
  }))
);
const LevelCreatorView = lazy(() =>
  import('./components/creator/LevelCreatorView').then((m) => ({ default: m.LevelCreatorView }))
);
const RefleksiNotebookView = lazy(() =>
  import('./components/notebook/RefleksiNotebookView').then((m) => ({
    default: m.RefleksiNotebookView,
  }))
);
const DailyChallengeView = lazy(() =>
  import('./components/daily/DailyChallengeView').then((m) => ({ default: m.DailyChallengeView }))
);
const AboutView = lazy(() =>
  import('./components/about/AboutView').then((m) => ({ default: m.AboutView }))
);

export default function App() {
  const { profile, currentView, setView, completeOnboarding, startMission, activeLevelId } = useGameStore();

  // Query parameter support: autostart & view routing
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const autostart = params.get('autostart');
    const targetView = params.get('view') as AppView | null;
    const targetLevel = params.get('level');

    if (autostart === '1') {
      if (!profile.hasCompletedOnboarding) {
        completeOnboarding('Budi Pratama', 'player', 1);
      }
      if (targetLevel) {
        startMission(targetLevel);
      } else if (targetView) {
        if (targetView === 'mission' && !activeLevelId) {
          startMission('excel-t1-01');
        } else {
          setView(targetView);
        }
      }
    } else if (targetLevel) {
      startMission(targetLevel);
    } else if (targetView && profile.hasCompletedOnboarding) {
      if (targetView === 'mission' && !activeLevelId) {
        startMission('excel-t1-01');
      } else {
        setView(targetView);
      }
    }
  }, [profile.hasCompletedOnboarding, setView, completeOnboarding, startMission, activeLevelId]);

  // Show onboarding if not yet completed and not autostarted
  const isAutostart =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('autostart') === '1';

  if (!profile.hasCompletedOnboarding && !isAutostart) {
    return (
      <ErrorBoundary>
        <OfflineIndicator />
        <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4">
          <OnboardingView />
        </div>
      </ErrorBoundary>
    );
  }

  const renderActiveView = () => {
    switch (currentView) {
      case 'office':
        return <OfficeHubView />;
      case 'skills-map':
        return <SkillsMapView />;
      case 'career-map':
        return <CareerMapView />;
      case 'mission':
        return <MissionPlayView />;
      case 'case-file':
        return <CaseFileView />;
      case 'learning':
        return <LearningCenterView />;
      case 'dictionary':
        return <DictionaryView />;
      case 'settings':
        return <SettingsView />;
      case 'achievements':
        return <AchievementsView />;
      case 'portfolio':
        return <PortfolioView />;
      case 'shop':
        return <ShopView />;
      case 'duel':
        return <DuelView />;
      case 'speed':
        return <SpeedAttackView />;
      case 'detective':
        return <DetectiveView />;
      case 'mentor':
        return <MentorView />;
      case 'zen':
        return <ZenModeView />;
      case 'exam':
        return <ExamCertificationView />;
      case 'creator':
        return <LevelCreatorView />;
      case 'errors':
        return <RefleksiNotebookView />;
      case 'daily':
        return <DailyChallengeView />;
      case 'about':
        return <AboutView />;
      default:
        return <OfficeHubView />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
        <OfflineIndicator />
        <HeaderNav />
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8">
          <Suspense
            fallback={
              <div className="min-h-[50vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-emerald-500 border-t-transparent" />
              </div>
            }
          >
            {renderActiveView()}
          </Suspense>
        </main>
      </div>
    </ErrorBoundary>
  );
}
