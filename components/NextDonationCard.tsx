import React from 'react';
import { Calendar, Clock } from 'lucide-react';

interface Props {
  lastDonation: Date;
  onBook: () => void;
}

const NextDonationCard: React.FC<Props> = ({ lastDonation, onBook }) => {
  // Recovery period is typically 56-60 days for whole blood. Let's assume 60 days.
  const recoveryDays = 60;
  const nextDate = new Date(lastDonation);
  nextDate.setDate(lastDonation.getDate() + recoveryDays);
  
  const today = new Date();
  const isEligible = today >= nextDate;
  const daysRemaining = Math.ceil((nextDate.getTime() - today.getTime()) / (1000 * 3600 * 24));

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-20">
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-full shrink-0 ${isEligible ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
          <Calendar className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-800 text-lg">
            {isEligible ? "Готовы к сдаче" : "Восстановление"}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {isEligible 
              ? "Вы можете сдать кровь прямо сейчас. Спасите чью-то жизнь сегодня!" 
              : `Организм восстанавливается. Следующая сдача доступна через ${daysRemaining} дн.`
            }
          </p>
          
          {isEligible ? (
            <button 
              onClick={onBook}
              className="mt-4 w-full bg-[#E53935] hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              Записаться
            </button>
          ) : (
             <div className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-gray-400 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100">
               <Clock className="w-3 h-3" />
               Доступно с {nextDate.toLocaleDateString('ru-RU')}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NextDonationCard;