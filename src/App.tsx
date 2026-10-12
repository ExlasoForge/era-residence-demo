import { useState, useEffect, useCallback } from 'react';
import { PersistentRail } from './components/PersistentRail';
import { HeroSection } from './components/HeroSection';
import { ArchIntroSection } from './components/ArchIntroSection';
import { LocationSection } from './components/LocationSection';
import { ResidencesCarouselSection } from './components/ResidencesCarouselSection';
import { AmenitiesSection } from './components/AmenitiesSection';
import { SpecificationsSection } from './components/SpecificationsSection';
import { ArchitectureSection } from './components/ArchitectureSection';
import { DeveloperSection } from './components/DeveloperSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { MenuModal } from './components/MenuModal';
import { BookCallModal } from './components/BookCallModal';
import { HeroPinModal } from './components/HeroPinModal';
import { ApartmentDetailModal } from './components/ApartmentDetailModal';
import { ApartmentsView } from './components/ApartmentsView';
import { ContactView } from './components/ContactView';
import { Preloader } from './components/Preloader';
import { useLenis } from './hooks/useLenis';
import { IntroContext } from './hooks/useScrollReveal';
import { ScrollTrigger, scrollToTop, scrollToElement } from './lib/anim';
import { Apartment, PinItem } from './types';

type View = 'home' | 'apartments' | 'contact';

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [introReady, setIntroReady] = useState(false);
  const [activeView, setActiveView] = useState<View>('home');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  useLenis();

  const handlePreloaderReveal = useCallback(() => setIntroReady(true), []);
  const handlePreloaderComplete = useCallback(() => setShowPreloader(false), []);

  const handleReplayIntro = useCallback(() => {
    setActiveView('home');
    scrollToTop();
    setIntroReady(false);
    setShowPreloader(true);
  }, []);

  // Modals state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);
  const [bookCallApartmentId, setBookCallApartmentId] = useState<string | undefined>(undefined);
  const [selectedHeroPin, setSelectedHeroPin] = useState<PinItem | null>(null);
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);

  // Page height changes completely between views; re-measure every trigger
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [activeView]);

  const showView = useCallback((view: View) => {
    setActiveView(view);
    scrollToTop();
  }, []);

  const handleOpenBookCall = (aptId?: string) => {
    setBookCallApartmentId(aptId);
    setIsBookCallOpen(true);
  };

  const handleNavigate = (view: View, sectionId?: string) => {
    setActiveView(view);
    if (view === 'home' && sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) scrollToElement(el);
        else scrollToTop(false);
      }, 50);
    } else {
      scrollToTop();
    }
  };

  const handleSelectTypologyFromHome = (typeCode: string) => {
    setTypeFilter(typeCode);
    showView('apartments');
  };

  const exploreApartments = () => {
    setTypeFilter('all');
    showView('apartments');
  };

  return (
    <IntroContext.Provider value={introReady}>
      <div className="min-h-screen bg-[#f3f3ec] text-[#17233b] selection:bg-[#340c24] selection:text-white flex flex-col">
        <PersistentRail
          onOpenBookCall={() => handleOpenBookCall()}
          onOpenContact={() => showView('contact')}
          onSelectApartment={exploreApartments}
          onOpenMenu={() => setIsMenuOpen(true)}
          onGoHome={() => showView('home')}
          activeView={activeView}
        />

        <main className="flex-1">
          {activeView === 'home' && (
            <>
              <HeroSection onSelectPin={(pin) => setSelectedHeroPin(pin)} onExploreApartments={exploreApartments} />
              <ArchIntroSection />
              <LocationSection onExploreApartments={exploreApartments} />
              <ResidencesCarouselSection onSelectTypology={handleSelectTypologyFromHome} />
              <AmenitiesSection onBookCall={() => handleOpenBookCall()} />
              <SpecificationsSection onExploreApartments={exploreApartments} />
              <ArchitectureSection onBookCall={() => handleOpenBookCall()} />
              <DeveloperSection />
              <CtaSection onExploreApartments={exploreApartments} />
            </>
          )}

          {activeView === 'apartments' && (
            <ApartmentsView
              initialTypeFilter={typeFilter}
              onSelectApartment={(apt) => setSelectedApartment(apt)}
              onBookCallForApartment={(id) => handleOpenBookCall(id)}
            />
          )}

          {activeView === 'contact' && <ContactView />}
        </main>

        <Footer
          overlapCta={activeView === 'home'}
          onNavigate={handleNavigate}
          onReplayIntro={handleReplayIntro}
        />

        {showPreloader && <Preloader onReveal={handlePreloaderReveal} onComplete={handlePreloaderComplete} />}

        <MenuModal
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onNavigate={handleNavigate}
          onOpenBookCall={() => handleOpenBookCall()}
          onReplayIntro={() => {
            setIsMenuOpen(false);
            handleReplayIntro();
          }}
        />

        <BookCallModal
          isOpen={isBookCallOpen}
          onClose={() => setIsBookCallOpen(false)}
          selectedApartmentId={bookCallApartmentId}
        />

        <HeroPinModal
          pin={selectedHeroPin}
          onClose={() => setSelectedHeroPin(null)}
          onSelectApartment={() => {
            setSelectedHeroPin(null);
            exploreApartments();
          }}
        />

        <ApartmentDetailModal
          apartment={selectedApartment}
          onClose={() => setSelectedApartment(null)}
          onBookCallForApartment={(id) => handleOpenBookCall(id)}
        />
      </div>
    </IntroContext.Provider>
  );
}
