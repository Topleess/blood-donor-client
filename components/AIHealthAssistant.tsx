import React, { useEffect, useState } from 'react';
import { getDailyHealthTip } from '../services/geminiService';
import { Sparkles } from 'lucide-react';

interface Props {
  name: string;
}

const AIHealthAssistant: React.FC<Props> = ({ name }) => {
  const [tip, setTip] = useState<string>("Loading your personalized health tip...");
  
  useEffect(() => {
    let mounted = true;
    getDailyHealthTip(name).then((data) => {
      if(mounted) setTip(data);
    });
    return () => { mounted = false; };
  }, [name]);

  return (
    <div className="mx-4 mt-6 bg-indigo-50 rounded-xl p-4 border border-indigo-100 flex items-start gap-3">
      <div className="bg-indigo-100 p-2 rounded-full">
        <Sparkles className="w-5 h-5 text-indigo-600" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-indigo-900 mb-1">Daily AI Health Tip</h4>
        <p className="text-sm text-indigo-800 leading-snug">{tip}</p>
      </div>
    </div>
  );
};

export default AIHealthAssistant;