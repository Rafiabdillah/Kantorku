/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KantorKu - Main Application Root
 * Features Code Splitting (React.lazy), Global Error Boundary & Responsive Shell.
 */

import React, { useEffect, Suspense, lazy } from 'react';
import { useGameStore, AppView } from './store/useGameStore';
import { LEVELS } from './content/levels';
import { HeaderNav } from './components/layout/HeaderNav';
import { OnboardingView } from './components/onboarding/OnboardingView';
import { OfficeHubView } from './components/office/OfficeHubView';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { OfflineIndicator } from './components/pwa/OfflineIndicator';
import { settingsRepo } from './features/settings/settingsRepository';

// Code Splitting for secondary views
const LearningCenterView = lazy(() =>
  import('./features/learning/components/LearningCenterView').then((m) => ({ default: m.LearningCenterView }))
);
const CareerMapView = lazy(() =>
  import('./components/career/CareerMapView').then((m) => ({ default: m.CareerMapView }))
);
const SkillsMapView = lazy(() =>
  import('./components/skills/SkillsMapView').then((m) => ({ default: m.SkillsMapView }))
);
const MissionPlayView = lazy(() =>
  import('./components/mission/MissionPlayView').then((m) => ({ default: m.MissionPlayView }))
);
const CaseFileView = lazy(() =>
  import('./components/cases/CaseFileView').then((m) => ({ default: m.CaseFileView }))
);
const DailyChallengeView = lazy(() =>
  import('./components/daily/DailyChallengeView').then((m) => ({ default: m.DailyChallengeView }))
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
const ExamCertificationView = lazy(() =>
  import('./components/exam/ExamCertificationView').then((m) => ({ default: m.ExamCertificationView }))
);
const ShopView = lazy(() =>
  import('./components/shop/ShopView').then((m) => ({ default: m.ShopView }))
);
const AchievementsView = lazy(() =>
  import('./components/achievements/AchievementsView').then((m) => ({ default: m.AchievementsView }))
);
const DictionaryView = lazy(() =>
  import('./components/dictionary/DictionaryView').then((m) => ({ default: m.DictionaryView }))
);
const PortfolioView = lazy(() =>
  import('./components/portfolio/PortfolioView').then((m) => ({ default: m.PortfolioView }))
);
const ErrorNotebookView = lazy(() =>
  import('./components/errors/ErrorNotebookView').then((m) => ({ default: m.default || m.ErrorNotebookView }))
);
const DuelView = lazy(() =>
  import('./components/duel/DuelView').then((m) => ({ default: m.DuelView }))
);
const LevelCreatorView = lazy(() =>
  import('./components/creator/LevelCreatorView').then((m) => ({ default: m.LevelCreatorView }))
);
const ZenModeView = lazy(() =>
  import('./components/zen/ZenModeView').then((m) => ({ default: m.ZenModeView }))
);
const SettingsView = lazy(() =>
  import('./components/settings/SettingsView').then((m) => ({ default: m.SettingsView }))
);

const ViewLoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center animate-in fade-in">
    <div className="w-10 h-10 border-3 border-emerald-500/20 border-t-emerald-600 rounded-full animate-spin mb-3" />
    <span className="text-xs font-semibold text-slate-500 tracking-wide">Memuat ruangan kantor...</span>
  </div>
);

export default function App() {
  const { currentView, profile, setView, completeOnboarding } = useGameStore();

  useEffect(() => {
    // Synchronize settings profile changes with game store
    const unsubSettings = settingsRepo.subscribe(() => {
      const activeProf = settingsRepo.getActiveProfile();
      if (activeProf && activeProf.name && activeProf.name !== useGameStore.getState().profile.name) {
        useGameStore.getState().setProfileName(activeProf.name);
      }
    });

    // Autostart support for automated testing, Playwright & quick access
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('autostart') === '1') {
      const levelParam = urlParams.get('level');
      const viewParam = urlParams.get('view');
      const targetView = (viewParam || (levelParam ? 'mission' : 'office')) as AppView;
      const targetLvl = levelParam ? LEVELS.find((l) => l.id === levelParam) : null;

      useGameStore.setState((state) => ({
        ...state,
        profile: {
          ...state.profile,
          name: state.profile.hasCompletedOnboarding ? state.profile.name : 'Budi Pratama',
          avatar: state.profile.hasCompletedOnboarding ? state.profile.avatar : 'player',
          currentTier: state.profile.hasCompletedOnboarding ? state.profile.currentTier : 1,
          hasCompletedOnboarding: true,
        },
        currentView: targetView,
        ...(targetLvl
          ? {
              activeLevelId: targetLvl.id,
              activeSheet: targetLvl.initialData.excel
                ? JSON.parse(JSON.stringify(targetLvl.initialData.excel))
                : {},
              activeCode: targetLvl.initialData.code || '',
              activeWord: targetLvl.initialData.word || '',
              activeHtml: targetLvl.initialData.html || '',
              activeCss: targetLvl.initialData.css || '',
              missionFailCount: 0,
              unlockedHintLevel: 0,
            }
          : {}),
      }));
    }

    return () => unsubSettings();
  }, []);

  const showOnboarding =
    currentView === 'onboarding' || !profile.hasCompletedOnboarding;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-emerald-500/20 selection:text-emerald-950 overflow-x-hidden">
      {/* Global Header HUD */}
      {!showOnboarding && <HeaderNav />}

      {/* Main Content Area */}
      <main className="flex-1 p-3 md:p-6 max-w-7xl w-full mx-auto overflow-x-hidden">
        <ErrorBoundary onReturnToOffice={() => setView('office')}>
          <Suspense fallback={<ViewLoadingSpinner />}>
            {showOnboarding && <OnboardingView />}
            {!showOnboarding && currentView === 'office' && <OfficeHubView />}
            {!showOnboarding && currentView === 'skills-map' && <SkillsMapView />}
            {!showOnboarding && currentView === 'learning' && <LearningCenterView />}
            {!showOnboarding && currentView === 'career-map' && <CareerMapView />}
            {!showOnboarding && currentView === 'mission' && <MissionPlayView />}
            {!showOnboarding && currentView === 'case-file' && <CaseFileView />}
            {!showOnboarding && currentView === 'daily' && <DailyChallengeView />}
            {!showOnboarding && currentView === 'speed' && <SpeedAttackView />}
            {!showOnboarding && currentView === 'detective' && <DetectiveView />}
            {!showOnboarding && currentView === 'mentor' && <MentorView />}
            {!showOnboarding && currentView === 'exam' && <ExamCertificationView />}
            {!showOnboarding && currentView === 'shop' && <ShopView />}
            {!showOnboarding && currentView === 'achievements' && <AchievementsView />}
            {!showOnboarding && currentView === 'dictionary' && <DictionaryView />}
            {!showOnboarding && currentView === 'portfolio' && <PortfolioView />}
            {!showOnboarding && currentView === 'errors' && <ErrorNotebookView />}
            {!showOnboarding && currentView === 'duel' && <DuelView />}
            {!showOnboarding && currentView === 'creator' && <LevelCreatorView />}
            {!showOnboarding && (currentView === 'zen' || currentView === 'sandbox') && <ZenModeView />}
            {!showOnboarding && currentView === 'settings' && <SettingsView />}
          </Suspense>
        </ErrorBoundary>
      </main>

      {/* Global PWA Offline Connectivity Indicator */}
      <OfflineIndicator />
    </div>
  );
}
