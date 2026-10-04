/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserProfile, SearchRecord, KnowledgeResult, Protocol } from './types';
import { AuthService } from './services/authService';
import { SearchService } from './services/searchService';
import { ProtocolService } from './services/protocolService';
import { activeKnowledgeProvider } from './providers/knowledgeProvider';

import { AppShell, NavTab } from './components/AppShell';
import { LandingCarouselPage } from './pages/LandingCarouselPage';
import { DashboardPage } from './pages/DashboardPage';
import { SearchPage } from './pages/SearchPage';
import { ProtocolsPage } from './pages/ProtocolsPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminService } from './services/adminService';
import { ResultView } from './components/ResultView';
import { ProtocolDetailModal } from './components/ProtocolDetailModal';
import { OfflineIndicatorBanner } from './components/OfflineIndicatorBanner';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { SomaticSOSModal } from './components/SomaticSOSModal';
import { MindfulNotificationsModal } from './components/MindfulNotificationsModal';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(() => AuthService.getCurrentUser());
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [searches, setSearches] = useState<SearchRecord[]>([]);

  // Search execution state
  const [isSearching, setIsSearching] = useState(false);
  const [activeResult, setActiveResult] = useState<KnowledgeResult | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [lastQuery, setLastQuery] = useState<string>('');

  // Selected protocol modal state
  const [activeProtocol, setActiveProtocol] = useState<Protocol | null>(null);

  // Somatic SOS 60s emergency modal state
  const [isSOSOpen, setIsSOSOpen] = useState(false);

  // Profile-based SOS setting
  const [profileSosEnabled, setProfileSosEnabled] = useState(() => {
    return localStorage.getItem('biopnl_show_sos_button') === 'true' || Boolean(user?.showAnxietySos);
  });

  useEffect(() => {
    const handleStorage = () => {
      setProfileSosEnabled(localStorage.getItem('biopnl_show_sos_button') === 'true' || Boolean(user?.showAnxietySos));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [user]);

  const hasAnxietySymptom =
    lastQuery.toLowerCase().includes('ansiedad') ||
    lastQuery.toLowerCase().includes('panico') ||
    lastQuery.toLowerCase().includes('angustia') ||
    (activeResult?.title?.toLowerCase().includes('ansiedad') ?? false);

  const shouldShowSos = profileSosEnabled || hasAnxietySymptom;

  // Mindful conscious notifications modal state
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Sync auth state
  useEffect(() => {
    const unsubscribe = AuthService.subscribe((u) => {
      setUser(u);
      if (u) {
        setSearches(SearchService.getRecentSearches(u.userId));
      } else {
        setSearches([]);
        setActiveResult(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Update searches whenever user changes
  useEffect(() => {
    if (user) {
      setSearches(SearchService.getRecentSearches(user.userId));
    }
  }, [user]);

  // Search handler
  const handlePerformSearch = async (queryText: string) => {
    if (!queryText.trim()) return;

    setLastQuery(queryText);
    setIsSearching(true);
    setSearchError(null);

    try {
      const result = await activeKnowledgeProvider.search(queryText);
      setActiveResult(result);

      // Save to search service (enforces strict maximum 5 records)
      if (user) {
        SearchService.saveSearch(user.userId, result.query, result.title, result.summary);
        setSearches(SearchService.getRecentSearches(user.userId));
        AdminService.recordSearch(user.email, result.query);
      }
    } catch (err) {
      console.error('Search error:', err);
      setSearchError(
        err instanceof Error
          ? err.message
          : 'No pudimos completar la búsqueda. Por favor intentá nuevamente.'
      );
    } finally {
      setIsSearching(false);
    }
  };

  // Re-open past search
  const handleSelectRecentSearch = (record: SearchRecord) => {
    handlePerformSearch(record.query);
  };

  // Delete search from history
  const handleDeleteSearch = (e: React.MouseEvent, recordId: string) => {
    e.stopPropagation();
    if (user) {
      const updated = SearchService.deleteSearch(user.userId, recordId);
      setSearches(updated);
    }
  };

  // Navigation handlers
  const handleTabChange = (tab: NavTab) => {
    setCurrentTab(tab);
    // If switching tabs, clear active single result view
    if (activeResult) {
      setActiveResult(null);
    }
  };

  // Protocol selection handler
  const handleOpenProtocol = (protocol: Protocol) => {
    setActiveProtocol(protocol);
    if (user) {
      AdminService.recordProtocol(user.email, protocol.title);
    }
  };

  const handleSignOut = async () => {
    await AuthService.signOut();
  };

  // If user is not authenticated, display the interactive landing carousel experience
  if (!user) {
    return <LandingCarouselPage onLoginSuccess={(u) => setUser(u)} />;
  }

  const featuredProtocols = ProtocolService.getAll();

  return (
    <AppShell
      currentTab={currentTab}
      onTabChange={handleTabChange}
      user={user}
      onSignOut={handleSignOut}
    >
      {/* Offline Status Reassurance Banner */}
      <OfflineIndicatorBanner />

      {/* PWA In-App Install Prompt Banner */}
      <PWAInstallBanner />

      {/* Protocol Detail Modal */}
      <ProtocolDetailModal
        protocol={activeProtocol}
        onClose={() => setActiveProtocol(null)}
      />

      {/* Main Content Router */}
      {isSearching ? (
        <LoadingState
          message="Estamos buscando en la biblioteca..."
          submessage={`Consultando interpretaciones de biodecodificación para "${lastQuery}"`}
        />
      ) : searchError ? (
        <ErrorState
          message={searchError}
          onRetry={() => handlePerformSearch(lastQuery)}
        />
      ) : activeResult ? (
        <ResultView
          result={activeResult}
          onBack={() => setActiveResult(null)}
          onOpenProtocol={handleOpenProtocol}
          onNewSearch={() => {
            setActiveResult(null);
            setCurrentTab('search');
          }}
        />
      ) : (
        <>
          {currentTab === 'dashboard' && (
            <DashboardPage
              user={user}
              searches={searches}
              onSearch={handlePerformSearch}
              onSelectSearch={handleSelectRecentSearch}
              onDeleteSearch={handleDeleteSearch}
              onNavigateToProtocols={() => setCurrentTab('protocols')}
              onOpenProtocol={handleOpenProtocol}
              featuredProtocols={featuredProtocols}
              isSearching={isSearching}
            />
          )}

          {currentTab === 'search' && (
            <SearchPage
              onSearch={handlePerformSearch}
              isSearching={isSearching}
            />
          )}

          {currentTab === 'protocols' && (
            <ProtocolsPage
              onOpenProtocol={handleOpenProtocol}
            />
          )}

          {currentTab === 'profile' && (
            <ProfilePage
              user={user}
              onSignOut={handleSignOut}
              searchesCount={searches.length}
              onNavigateToAdmin={() => setCurrentTab('admin')}
            />
          )}

          {currentTab === 'admin' && (
            <AdminDashboardPage currentUser={user} />
          )}
        </>
      )}

      {/* Floating Anxiety SOS 60s Button (Only visible if enabled in profile or when exploring anxiety symptoms) */}
      {shouldShowSos && (
        <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 pointer-events-auto">
          <button
            type="button"
            onClick={() => setIsSOSOpen(true)}
            className="min-h-[50px] px-5 rounded-full bg-[#8F3722] hover:bg-[#7A2818] active:scale-95 text-white shadow-xl flex items-center gap-2.5 text-sm font-bold transition-all cursor-pointer group"
            title="Iniciar reseteo de calma inmediata en 60 segundos"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FAF3EE] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FAF3EE]" />
            </span>
            <span>🆘 Reseteo SOS 60s</span>
          </button>
        </div>
      )}

      {/* Somatic SOS Modal */}
      <SomaticSOSModal isOpen={isSOSOpen} onClose={() => setIsSOSOpen(false)} />

      {/* Mindful Notifications Modal */}
      <MindfulNotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </AppShell>
  );
}
