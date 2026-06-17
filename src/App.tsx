import { useState } from 'react';
import { HeroSection } from './components/marketing/HeroSection';

function App() {
  const [dark, setDark] = useState(false);
  return (
    <div className={dark ? 'dark' : ''}>
      <div className="min-h-screen bg-light text-primary dark:bg-navy dark:text-white">
        <div className="absolute right-6 top-6 z-20">
          <button
            type="button"
            onClick={() => setDark(!dark)}
            className="rounded-lg border border-border bg-white px-4 py-2 text-sm font-semibold text-primary hover:border-accent hover:text-accent dark:bg-navy-100 dark:text-white"
          >
            Toggle dark mode
          </button>
        </div>
        <HeroSection />
      </div>
    </div>
  );
}

export default App;
