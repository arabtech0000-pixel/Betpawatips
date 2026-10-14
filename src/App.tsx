import React, { useState } from 'react';
import { GetStartedScreen } from './components/GetStartedScreen';
import { AuthScreen } from './components/AuthScreen';
import { HomeScreen } from './components/HomeScreen';
import { ProfileScreen } from './components/ProfileScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'get-started' | 'auth' | 'home' | 'profile'>('get-started');
  const [homeTab, setHomeTab] = useState<'home' | 'premium' | 'tips' | 'aviator' | 'profile'>('home');
  const [userProfile, setUserProfile] = useState({
    name: 'Eduardo Simmons',
    handle: '@edsimmons',
    avatar: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=300',
  });

  return (
    <div className="min-h-screen bg-[#070b04] text-white flex flex-col items-center justify-start overflow-x-hidden selection:bg-[#ccff00] selection:text-black">
      {/* Main Container - Outstanding, spacious mobile frame matching the screenshot */}
      <main className="w-full flex-1 flex items-start justify-center">
        <div className="w-full max-w-[480px] min-h-screen relative flex flex-col bg-[#0b1008] shadow-2xl">
          {currentScreen === 'get-started' && (
            <GetStartedScreen onGetStarted={() => setCurrentScreen('auth')} />
          )}

          {currentScreen === 'auth' && (
            <AuthScreen
              onCompleteAuth={(userData) => {
                setUserProfile(userData);
                setCurrentScreen('home');
              }}
            />
          )}

          {currentScreen === 'home' && (
            <HomeScreen
              initialTab={homeTab}
              onGoToGetStarted={() => setCurrentScreen('get-started')}
              onOpenProfile={() => setCurrentScreen('profile')}
            />
          )}

          {currentScreen === 'profile' && (
            <ProfileScreen
              userProfile={userProfile}
              onBack={() => {
                setHomeTab('home');
                setCurrentScreen('home');
              }}
              onNavigateTab={(tab) => {
                setHomeTab(tab);
                setCurrentScreen('home');
              }}
              onGoToGetStarted={() => setCurrentScreen('get-started')}
            />
          )}
        </div>
      </main>
    </div>
  );
}
