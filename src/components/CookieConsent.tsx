import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Info } from 'lucide-react';

const CookieConsent: React.FC = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    // Check if user has already consented
    const consentGiven = localStorage.getItem('cookieConsent');
    if (!consentGiven) {
      // Small delay to show after page load
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookieConsent', 'all');
    localStorage.setItem('cookiePreferences', JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: true
    }));
    setShowConsent(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem('cookieConsent', 'necessary');
    localStorage.setItem('cookiePreferences', JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false
    }));
    setShowConsent(false);
  };

  const handleCustomize = () => {
    if (showPreferences) {
      localStorage.setItem('cookieConsent', 'custom');
      localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
      setShowConsent(false);
    } else {
      setShowPreferences(true);
    }
  };

  const togglePreference = (key: keyof typeof preferences) => {
    if (key !== 'necessary') {
      setPreferences(prev => ({
        ...prev,
        [key]: !prev[key]
      }));
    }
  };

  if (!showConsent) return null;

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-gradient-to-r from-gray-900 to-black border-t border-cyan-500/30 backdrop-blur-xl shadow-2xl"
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-bold text-white">
                    Privacy & Cookies
                  </h3>
                </div>
                <p className="mt-1 text-gray-300 text-sm md:text-base">
                  We use cookies only for site security and functionality. <span className="font-semibold text-cyan-400">No personal data is stored or collected.</span> Your privacy is our priority.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleRejectAll}
                  className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Decline
                </button>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAcceptAll}
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all shadow-lg shadow-cyan-500/20"
                  >
                    Accept
                  </button>
                  
                  <button
                    onClick={handleCustomize}
                    className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    {showPreferences ? 'Save Settings' : 'Customize'}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Information Panel */}
            <div className="mt-4 pt-4 border-t border-gray-800 flex items-start gap-2">
              <Info className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <p className="text-gray-400 text-xs">
                <span className="font-medium">Transparency:</span> Our site uses essential cookies only for security purposes. 
                We do not track, store, or collect any personal information. All data remains on your device and is not transmitted to any server.
              </p>
            </div>
            
            {/* Preferences Panel */}
            {showPreferences && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-gray-800"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="necessary"
                        name="necessary"
                        type="checkbox"
                        checked={preferences.necessary}
                        disabled
                        className="h-4 w-4 text-cyan-600 border-gray-700 rounded focus:ring-cyan-500 bg-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="necessary" className="font-medium text-white flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Essential Cookies
                      </label>
                      <p className="text-gray-400 mt-1">
                        Required for site security and basic functionality. Cannot be disabled.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="analytics"
                        name="analytics"
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={() => togglePreference('analytics')}
                        className="h-4 w-4 text-cyan-600 border-gray-700 rounded focus:ring-cyan-500 bg-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="analytics" className="font-medium text-white">
                        Analytics Cookies
                      </label>
                      <p className="text-gray-400 mt-1">
                        Used for anonymous site usage statistics. No personal data collected.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="marketing"
                        name="marketing"
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={() => togglePreference('marketing')}
                        className="h-4 w-4 text-cyan-600 border-gray-700 rounded focus:ring-cyan-500 bg-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="marketing" className="font-medium text-white">
                        Marketing Cookies
                      </label>
                      <p className="text-gray-400 mt-1">
                        Used for advertising purposes. We recommend keeping this disabled.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;