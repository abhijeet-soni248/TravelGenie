import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { DestinationShowcase } from "./components/DestinationShowcase";
import { BudgetCalculator } from "./components/BudgetCalculator";
import { ItineraryDisplay } from "./components/ItineraryDisplay";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { AuthModal } from "./components/AuthModal";
import { AIChatbot } from "./components/AIChatbot";
import { WelcomePage } from "./components/WelcomePage";
import { WeatherAI } from "./components/WeatherAI";
import { UserProvider, useUser } from "./components/UserContext";
import { Button } from "./components/ui/button";
import { CloudRain } from "lucide-react";

function AppContent() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [weatherAIOpen, setWeatherAIOpen] = useState(false);
  const { user, login } = useUser();

  // Check if user has completed welcome flow
  useEffect(() => {
    const hasCompletedWelcome = localStorage.getItem("travelgenie_welcome_completed");
    const savedUser = localStorage.getItem("travelgenie_user");
    
    if (hasCompletedWelcome || savedUser) {
      setShowWelcome(false);
    }
  }, []);

  const handleWelcomeComplete = (userData: any) => {
    login(userData);
    localStorage.setItem("travelgenie_welcome_completed", "true");
    setShowWelcome(false);
  };

  if (showWelcome) {
    return <WelcomePage onGetStarted={handleWelcomeComplete} />;
  }

  return (
    <div className="min-h-screen bg-background font-['Open_Sans']">
      {/* Add Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;600;700&family=Open+Sans:wght@300;400;500;600;700&display=swap');
      `}</style>
      
      <Header onAuthModalOpen={() => setAuthModalOpen(true)} />
      
      <main>
        <HeroSection />
        <DestinationShowcase />
        <Features />
        <BudgetCalculator />
        <ItineraryDisplay />
      </main>
      
      <Footer />
      
      <AuthModal 
        open={authModalOpen} 
        onOpenChange={setAuthModalOpen} 
      />
      
      <AIChatbot />
      
      {/* Weather AI Button */}
      <Button
        onClick={() => setWeatherAIOpen(true)}
        className="fixed bottom-4 right-20 z-50 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
        size="icon"
      >
        <CloudRain className="h-6 w-6 text-white" />
      </Button>
      
      <WeatherAI isOpen={weatherAIOpen} onClose={() => setWeatherAIOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}