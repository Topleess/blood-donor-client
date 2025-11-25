import React from 'react';
import { BloodType, BloodDemand } from '../types';
import { Droplet, AlertCircle } from 'lucide-react';

interface Props {
  demandData: BloodDemand[];
}

const DonorTrafficLight: React.FC<Props> = ({ demandData }) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <Droplet className="w-5 h-5 text-[#E53935]" fill="currentColor" />
          Светофор донора
        </h3>
        <span className="text-xs text-gray-400">Обновлено сейчас</span>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        {demandData.map((item) => {
          const isCritical = item.level === 'critical';
          const isModerate = item.level === 'moderate';
          
          return (
            <div key={item.type} className="flex flex-col items-center">
              <div className={`relative w-12 h-12 rounded-full flex items-center justify-center mb-1 transition-all duration-300 ${
                isCritical 
                  ? 'bg-red-50 border-2 border-[#E53935] text-[#E53935] shadow-[0_0_10px_rgba(229,57,53,0.3)]' 
                  : isModerate 
                    ? 'bg-yellow-50 border border-yellow-400 text-yellow-600'
                    : 'bg-green-50 border border-green-400 text-green-600'
              }`}>
                {isCritical && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E53935]"></span>
                  </span>
                )}
                <span className="font-bold text-sm">{item.type}</span>
              </div>
              <span className={`text-[10px] uppercase font-semibold ${
                isCritical ? 'text-[#E53935]' : 'text-gray-400'
              }`}>
                {isCritical ? 'Нужно' : 'OK'}
              </span>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 flex items-start gap-2 bg-red-50 p-3 rounded-lg">
        <AlertCircle className="w-4 h-4 text-[#E53935] mt-0.5 shrink-0" />
        <p className="text-xs text-red-800 leading-relaxed">
          <strong>Срочно:</strong> Критически низкий уровень O- и A+. Приоритетная запись для доноров этих групп.
        </p>
      </div>
    </div>
  );
};

export default DonorTrafficLight;