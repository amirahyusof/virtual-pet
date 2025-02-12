import React, { useState, useEffect } from 'react';
import { Heart, Coffee, Moon, Sun } from 'lucide-react';

const VirtualPet = () => {
  const [happiness, setHappiness] = useState(50);
  const [energy, setEnergy] = useState(100);
  const [isSleeping, setIsSleeping] = useState(false);
  const [lastFed, setLastFed] = useState(Date.now());

  // Pet states
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isSleeping) {
        setEnergy(prev => Math.max(0, prev - 2));
        setHappiness(prev => Math.max(0, prev - 1));
      } else {
        setEnergy(prev => Math.min(100, prev + 5));
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [isSleeping]);

  const feed = () => {
    setLastFed(Date.now());
    setHappiness(prev => Math.min(100, prev + 10));
    setEnergy(prev => Math.min(100, prev + 20));
  };

  const pet = () => {
    setHappiness(prev => Math.min(100, prev + 15));
  };

  const toggleSleep = () => {
    setIsSleeping(!isSleeping);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-pink-50 rounded-lg shadow-lg max-w-sm">
      <div className="text-2xl font-bold mb-4 text-pink-600">Virtual Pet</div>
      
      {/* Pet Display */}
      <div className="mb-6 relative">
        <div className={`w-32 h-32 bg-pink-200 rounded-full flex items-center justify-center ${isSleeping ? 'animate-pulse' : 'animate-bounce'}`}>
          <div className="relative">
            {/* Eyes */}
            <div className="flex gap-4">
              {isSleeping ? (
                <>
                  <div className="w-4 h-1 bg-pink-600 rounded-full"></div>
                  <div className="w-4 h-1 bg-pink-600 rounded-full"></div>
                </>
              ) : (
                <>
                  <div className="w-4 h-4 bg-pink-600 rounded-full"></div>
                  <div className="w-4 h-4 bg-pink-600 rounded-full"></div>
                </>
              )}
            </div>
            {/* Mouth */}
            <div className={`w-6 h-2 bg-pink-600 rounded-full mt-2 mx-auto ${happiness > 70 ? 'transform rotate-180' : ''}`}></div>
          </div>
        </div>
      </div>

      {/* Status Bars */}
      <div className="w-full space-y-2 mb-4">
        <div className="flex items-center gap-2">
          <Heart className="text-red-500" size={20} />
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-red-500 rounded-full h-4" style={{width: `${happiness}%`}}></div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Coffee className="text-yellow-600" size={20} />
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-yellow-500 rounded-full h-4" style={{width: `${energy}%`}}></div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={feed}
          className="px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
          disabled={isSleeping}
        >
          Feed
        </button>
        <button
          onClick={pet}
          className="px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
          disabled={isSleeping}
        >
          Pet
        </button>
        <button
          onClick={toggleSleep}
          className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
        >
          {isSleeping ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </div>
  );
};

export default VirtualPet;