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
import { ResultView } from './components/ResultView';
import { ProtocolDetailModal } from './components/ProtocolDetailModal';
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
          onOpenProtocol={(p) => setActiveProtocol(p)}
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
              onOpenProtocol={(p) => setActiveProtocol(p)}
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
              onOpenProtocol={(p) => setActiveProtocol(p)}
            />
          )}

          {currentTab === 'profile' && (
            <ProfilePage
              user={user}
              onSignOut={handleSignOut}
              searchesCount={searches.length}
            />
          )}
        </>
      )}
    </AppShell>
  );
}
