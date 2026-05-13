
import React, { useState } from 'react';
import { Interest } from '../types';

interface OnboardingProps {
  onComplete: (interests: Interest[]) => void;
}

const INTERESTS: Interest[] = [
  'Music', 'Reading', 'Journaling', 'Physical Activity', 
  'Meditation', 'Art', 'Gaming', 'Talking to Friends'
];

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [selected, setSelected] = useState<Interest[]>([]);

  const toggleInterest = (interest: Interest) => {
    if (selected.includes(interest)) {
      setSelected(selected.filter(i => i !== interest));
    } else if (selected.length < 3) {
      setSelected([...selected, interest]);
    }
  };

  return (
    <div className="bg-white/15 backdrop-blur-[10px] rounded-2xl p-8 md:p-12 border border-white/30 shadow-2xl animate-in zoom-in duration-500">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-serif italic text-slate-800 mb-2">Helping you hear what your mind is trying to say</h2>
        <p className="text-indigo-700/60 font-medium tracking-wide">Select 2-3 activities that bring you comfort.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-10">
        {INTERESTS.map((interest) => {
          const isSelected = selected.includes(interest);
          return (
            <button
              key={interest}
              onClick={() => toggleInterest(interest)}
              className={`p-4 rounded-xl border transition-all duration-300 text-sm font-medium tracking-wide
                ${isSelected 
                  ? 'bg-white/40 border-indigo-400 text-indigo-800 shadow-md ring-2 ring-indigo-200/30' 
                  : 'bg-white/10 border-white/30 text-slate-700 hover:bg-white/20'}`}
            >
              {interest}
            </button>
          );
        })}
      </div>

      <button
        disabled={selected.length < 2}
        onClick={() => onComplete(selected)}
        className={`w-full p-5 rounded-xl font-bold tracking-widest transition-all duration-500 shadow-md uppercase text-xs
          ${selected.length >= 2 
            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-xl active:scale-95' 
            : 'bg-indigo-100/40 text-indigo-300 cursor-not-allowed'}`}
      >
        Begin Journey
      </button>
      <p className="text-center text-[10px] text-indigo-600/60 mt-4 uppercase tracking-widest font-bold">
        Select at least 2 interests to continue
      </p>
    </div>
  );
};

export default Onboarding;
