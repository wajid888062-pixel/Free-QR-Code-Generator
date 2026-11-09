import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QRGenerator } from './components/QRGenerator/QRGenerator';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { FreeTools } from './components/FreeTools';
import { AboutUs } from './components/AboutUs';
import { AboutFounder } from './components/AboutFounder';
import { FAQ } from './components/FAQ';
import { ContactUs } from './components/ContactUs';
import { Footer } from './components/Footer';
import { QRHistory } from './components/QRHistory';
import { LegalModal } from './components/LegalModals';
import { QRCategory, QRHistoryItem } from './types/qr';

export default function App() {

  // Theme state: dark vs light mode
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('qrcraft_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // History state: stored in localStorage
  const [historyItems, setHistoryItems] = useState<QRHistoryItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('qrcraft_history');
        if (saved) return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [activeSection, setActiveSection] = useState<string>('hero');
  const [historyModalOpen, setHistoryModalOpen] = useState<boolean>(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const [activeCategory, setActiveCategory] = useState<QRCategory>('url');

  // Sync dark class on document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('qrcraft_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('qrcraft_theme', 'light');
    }
  }, [darkMode]);

  // Sync history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('qrcraft_history', JSON.stringify(historyItems));
    } catch {
      // ignore potential quota errors
    }
  }, [historyItems]);

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddToHistory = (newItem: QRHistoryItem) => {
    setHistoryItems((prev) => {
      // Don't add duplicate payloads within 10 seconds
      if (prev.length > 0 && prev[0].encodedData === newItem.encodedData) {
        return prev;
      }
      const updated = [newItem, ...prev.slice(0, 24)]; // Keep top 25 items
      return updated;
    });
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistoryItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearHistory = () => {
    setHistoryItems([]);
  };

  const handleActivateTool = (toolId: string) => {
    handleNavigate('generator');
    // If it's customizer, scroll to generator and open customizer
    const gen = document.getElementById('generator');
    if (gen) gen.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors">
      {/* Hidden printable area for direct paper printing */}
      <div id="printable-qr-area" className="hidden" />

      {/* Navigation Bar */}
      <Navbar
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenHistory={() => setHistoryModalOpen(true)}
        historyCount={historyItems.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <div id="hero" className="scroll-mt-20">
          <Hero
            onGenerateClick={() => handleNavigate('generator')}
            onExploreFeaturesClick={() => handleNavigate('features')}
            onOpenQuickType={(cat) => {
              setActiveCategory(cat as QRCategory);
              handleNavigate('generator');
            }}
          />
        </div>

        {/* Advanced QR Code Generator (Core Feature) */}
        <QRGenerator
          key={activeCategory}
          initialCategory={activeCategory}
          onOpenHistory={() => setHistoryModalOpen(true)}
          historyCount={historyItems.length}
          onAddToHistory={handleAddToHistory}
        />

        {/* Features Section */}
        <Features />

        {/* How It Works (3 Steps) */}
        <HowItWorks onStartNow={() => handleNavigate('generator')} />

        {/* Additional Free QR Tools */}
        <FreeTools onActivateTool={handleActivateTool} />

        {/* About Us Page */}
        <AboutUs />

        {/* Meet the Founder Section */}
        <AboutFounder />

        {/* FAQ Accordion (12 Questions) */}
        <FAQ />

        {/* Contact Page */}
        <ContactUs />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
      />

      {/* QR History Drawer Modal */}
      <QRHistory
        isOpen={historyModalOpen}
        onClose={() => setHistoryModalOpen(false)}
        items={historyItems}
        onDeleteItem={handleDeleteHistoryItem}
        onClearAll={handleClearHistory}
      />

      {/* Privacy Policy & Terms Modal */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}
