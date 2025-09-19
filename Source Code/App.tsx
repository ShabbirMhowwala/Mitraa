import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { LandingPage } from "./components/LandingPage";
import { AuthPage } from "./components/AuthPage";
import { CommunityPage } from "./components/CommunityPage";
import { SelfAssessmentPage } from "./components/SelfAssessmentPage";
import { AIChatPage } from "./components/AIChatPage";
import { VolunteersPage } from "./components/VolunteersPage";
import { SelfHelpPage } from "./components/SelfHelpPage";
import { ResourcesPage } from "./components/ResourcesPage";
import { Footer } from "./components/Footer";
import { BackgroundPattern } from "./components/BackgroundPattern";
import { BackgroundShowcase } from "./components/BackgroundShowcase";
import { ProgressTrackingPage } from "./components/ProgressTrackingPage";
import { ChallengeSelectionPage } from "./components/ChallengeSelectionPage";
import { ChallengeStreakPage } from "./components/ChallengeStreakPage";
import { SpecializedHelpPage } from "./components/SpecializedHelpPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("Home");
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing user session on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('mitraa_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('mitraa_user');
      }
    }
    setIsLoading(false);
  }, []);

  const handleAuthenticated = (userData: any) => {
    setUser(userData);
    setCurrentPage("Home");
  };

  const handleLogout = () => {
    localStorage.removeItem('mitraa_user');
    setUser(null);
    setCurrentPage("Home");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <BackgroundPattern />
        <div className="text-center relative z-10">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Mitraa...</p>
        </div>
      </div>
    );
  }

  // Show auth page if user is not authenticated
  if (!user) {
    return (
      <div className="relative min-h-screen">
        <BackgroundPattern />
        <AuthPage onAuthenticated={handleAuthenticated} />
      </div>
    );
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "Community":
        return <CommunityPage />;
      case "Self-Check":
      case "Self-Assessment":
        return <SelfAssessmentPage onNavigate={setCurrentPage} user={user} />;
      case "AI-Chat":
        return <AIChatPage onNavigate={setCurrentPage} user={user} />;
      case "Volunteers":
        return <VolunteersPage onNavigate={setCurrentPage} user={user} />;
      case "Self-Help":
        return <SelfHelpPage onNavigate={setCurrentPage} />;
      case "Resources":
        return <ResourcesPage />;
      case "Background-Demo":
        return <BackgroundShowcase />;
      case "Progress":
      case "Progress-Tracking":
        return <ProgressTrackingPage user={user} onNavigate={setCurrentPage} />;
      case "Challenge-Selection":
        return <ChallengeSelectionPage user={user} onNavigate={setCurrentPage} />;
      case "Challenge-Streak":
        return <ChallengeStreakPage user={user} onNavigate={setCurrentPage} />;
      case "Specialized-Help":
        return <SpecializedHelpPage user={user} onNavigate={setCurrentPage} />;
      default:
        return <LandingPage onNavigate={setCurrentPage} user={user} />;
    }
  };

  // Don't show header and footer for AI Chat page (full screen experience)
  if (currentPage === "AI-Chat") {
    return (
      <div className="min-h-screen relative">
        <BackgroundPattern />
        <div className="relative z-10">
          {renderCurrentPage()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <BackgroundPattern />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} user={user} onLogout={handleLogout} />
        <main className="flex-1">
          {renderCurrentPage()}
        </main>
        <Footer />
      </div>
    </div>
  );
}