import React, { useState } from 'react';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandStory } from './components/BrandStory';
import { MoreThanCoffee } from './components/MoreThanCoffee';
import { FiveTables } from './components/FiveTables';
import { Menu } from './components/Menu';
import { SignatureWall } from './components/SignatureWall';
import { IdeaWall } from './components/IdeaWall';
import { CafeExperience } from './components/CafeExperience';
import { Gallery } from './components/Gallery';
import { Reservation } from './components/Reservation';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-offwhite text-espresso selection:bg-olive selection:text-cream">
      {/* Editorial Custom Mouse Cursor */}
      <CustomCursor />

      {/* Preloader Animation */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* Main Website View */}
      <div className={isLoading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100 transition-opacity duration-700'}>
        <Navbar onOpenReservation={() => setIsReservationOpen(true)} />
        
        <main>
          <Hero onOpenReservation={() => setIsReservationOpen(true)} />
          <BrandStory />
          <MoreThanCoffee />
          <FiveTables />
          <Menu onOpenReservation={() => setIsReservationOpen(true)} />
          <SignatureWall />
          <IdeaWall />
          <CafeExperience />
          <Gallery />
          <Reservation />
          <LocationSection />
        </main>

        <Footer onOpenReservation={() => setIsReservationOpen(true)} />

        {/* Global Reservation Modal when triggered via buttons */}
        {isReservationOpen && (
          <Reservation
            isOpenModal={true}
            onCloseModal={() => setIsReservationOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
