import React from 'react';
import { Award, ChevronRight } from 'lucide-react';

interface Props {
  current: number;
  target: number;
}

const HonoraryPath: React.FC<Props> = ({ current, target }) => {
  const percentage = Math.min((current / target) * 100, 100);

  return (
    <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-5 shadow-md text-white mb-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10 pointer-events-none"></div>
      
      <div className="flex justify-between items-start mb-2 relative z-10">
        <div>
          <h3 className="font-bold text-lg">Путь Почетного Донора</h3>
          <p className="text-red-100 text-xs">Продолжайте спасать жизни!</p>
        </div>
        <Award className="w-6 h-6 text-yellow-300" />
      </div>

      <div className="mt-4 relative z-10">
        <div className="flex justify-between text-xs font-medium mb-1.5 opacity-90">
          <span>{current} донаций</span>
          <span>Цель: {target}</span>
        </div>
        <div className="w-full bg-black/20 rounded-full h-2.5">
          <div 
            className="bg-white h-2.5 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="mt-3 flex justify-end">
           <button className="text-xs flex items-center gap-1 font-semibold hover:text-red-100 transition-colors">
             Награды <ChevronRight className="w-3 h-3" />
           </button>
        </div>
      </div>
    </div>
  );
};

export default HonoraryPath;