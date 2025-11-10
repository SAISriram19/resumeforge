import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProfileDashboard from './ProfileDashboard';
import ResumeGenerator from './ResumeGenerator';
import Welcome from './Welcome';
import OnboardingChoice from './OnboardingChoice';
import StepByStep from './StepByStep';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('welcome');
  const [showWelcome, setShowWelcome] = useState(true);
  const [showChoice, setShowChoice] = useState(false);
  const [showStepByStep, setShowStepByStep] = useState(false);

  useEffect(() => {
    // Check if user has seen welcome before
    const hasSeenWelcome = localStorage.getItem(`welcome_seen_${currentUser?.uid}`);
    if (hasSeenWelcome) {
      setShowWelcome(false);
      setShowChoice(false);
      setShowStepByStep(false);
      setActiveTab('profile');
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  const handleGetStarted = () => {
    setShowWelcome(false);
    setShowChoice(true);
  };

  const handleStartFresh = () => {
    // Clear the welcome seen flag to ensure step-by-step flow works
    localStorage.removeItem(`welcome_seen_${currentUser?.uid}`);
    setShowChoice(false);
    setShowStepByStep(true);
  };

  const handleStepByStepComplete = () => {
    localStorage.setItem(`welcome_seen_${currentUser?.uid}`, 'true');
    setShowStepByStep(false);
    setActiveTab('profile');
  };

  const handleUploadResume = async (file) => {
    try {
      // TODO: Implement resume parsing with Gemini API
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('userId', currentUser.uid);

      // For now, just show a message
      alert('Resume parsing will be implemented. For now, starting with fresh profile.');
      
      localStorage.setItem(`welcome_seen_${currentUser?.uid}`, 'true');
      setShowChoice(false);
      setActiveTab('profile');
    } catch (error) {
      console.error('Error uploading resume:', error);
      alert('Failed to upload resume. Please try again or start fresh.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      {/* Header Navigation - Integrity Style */}
      <header className="border-b border-[#d4c5a9]/30 sticky top-0 z-50 bg-[#f5f1e8]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <button 
              onClick={() => {
                setShowWelcome(true);
                setShowChoice(false);
                setShowStepByStep(false);
              }}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <img src="/img.png" alt="ResumeForge" className="w-10 h-10 object-contain" />
              <h1 className="text-2xl font-bold text-[#2d2a26]">
                ResumeForge
              </h1>
            </button>

            {/* Navigation */}
            <nav className="flex items-center gap-6">
              {!showWelcome && !showChoice && !showStepByStep && (
                <>
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      activeTab === 'profile'
                        ? 'bg-[#e8dcc4] text-[#2d2a26] border border-[#d4c5a9]'
                        : 'text-[#6b5d4f] hover:text-[#2d2a26] hover:bg-[#e8dcc4]/50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {activeTab === 'profile' && <span className="w-1.5 h-1.5 bg-[#a89270] rounded-full"></span>}
                      My Profile
                    </span>
                  </button>
                  <button
                    onClick={() => setActiveTab('generate')}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      activeTab === 'generate'
                        ? 'bg-[#d4c5a9] text-[#2d2a26] border border-[#c9b89a]'
                        : 'text-[#6b5d4f] hover:text-[#2d2a26] hover:bg-[#e8dcc4]/50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {activeTab === 'generate' && <span className="w-1.5 h-1.5 bg-[#8b7355] rounded-full"></span>}
                      Generate Resume
                    </span>
                  </button>
                </>
              )}
              
              <div className="h-6 w-px bg-[#d4c5a9]"></div>
              
              <div className="flex items-center gap-4">
                {currentUser?.photoURL ? (
                  <img 
                    src={currentUser.photoURL} 
                    alt={currentUser.displayName || 'User'} 
                    className="w-10 h-10 rounded-full border-2 border-[#d4c5a9]"
                    title={currentUser.email}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#d4c5a9] flex items-center justify-center text-[#2d2a26] font-semibold border-2 border-[#c9b89a]">
                    {currentUser?.email?.[0]?.toUpperCase()}
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-[#6b5d4f] hover:text-[#2d2a26] px-4 py-2 hover:bg-[#e8dcc4]/50 rounded-xl transition-all"
                >
                  Logout
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {showWelcome ? (
          <Welcome onGetStarted={handleGetStarted} />
        ) : showChoice ? (
          <OnboardingChoice 
            onStartFresh={handleStartFresh}
            onUploadResume={handleUploadResume}
          />
        ) : showStepByStep ? (
          <StepByStep onComplete={handleStepByStepComplete} />
        ) : (
          activeTab === 'profile' ? <ProfileDashboard /> : <ResumeGenerator />
        )}
      </main>
    </div>
  );
}
