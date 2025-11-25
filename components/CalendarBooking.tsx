import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { DonationType } from '../types';

interface Props {
  onConfirm: (date: Date, time: string, type: DonationType) => void;
  lastDonationDate: Date;
}

const CalendarBooking: React.FC<Props> = ({ onConfirm, lastDonationDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<DonationType>(DonationType.WHOLE_BLOOD);

  // Constants
  const recoveryDays = 60;
  const nextEligibleDate = new Date(lastDonationDate);
  nextEligibleDate.setDate(lastDonationDate.getDate() + recoveryDays);

  const timeSlots = ["09:00", "09:30", "10:00", "11:30", "13:00", "14:30", "16:00"];

  // Calendar Logic
  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const startDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay(); // 0 is Sunday

  // Adjust for Russian week start (Monday) if desired, but standard JS getDay() is 0=Sun. 
  // Let's keep Sunday start for simplicity or adjust grid labels. 
  // Russian calendars often start on Monday. Let's try to adapt visually to standard grid but keep logic simple.
  
  const generateDays = () => {
    const days = [];
    const totalDays = daysInMonth(currentDate);
    const startDay = startDayOfMonth(currentDate);

    // Padding for prev month
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    // Days
    for (let i = 1; i <= totalDays; i++) {
      const dateToCheck = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const isPast = dateToCheck < new Date(new Date().setHours(0,0,0,0));
      const isRecovering = dateToCheck < nextEligibleDate;
      const isDisabled = isPast || isRecovering;
      const isSelected = selectedDate?.toDateString() === dateToCheck.toDateString();

      days.push(
        <button
          key={i}
          disabled={isDisabled}
          onClick={() => {
            setSelectedDate(dateToCheck);
            setSelectedTime(null);
          }}
          className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium transition-all
            ${isSelected ? 'bg-[#E53935] text-white shadow-md scale-105' : ''}
            ${!isSelected && !isDisabled ? 'hover:bg-red-50 text-gray-700' : ''}
            ${isDisabled ? 'text-gray-300 cursor-not-allowed decoration-gray-300' : ''}
          `}
        >
          {i}
        </button>
      );
    }
    return days;
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // Capitalize month name
  const monthName = currentDate.toLocaleString('ru', { month: 'long', year: 'numeric' });
  const formattedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Donation Type Selector */}
      <div className="p-4 border-b border-gray-100">
        <label className="block text-sm font-medium text-gray-700 mb-2">Тип донации</label>
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          {Object.values(DonationType).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${
                selectedType === type 
                  ? 'bg-white text-[#E53935] shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4">
        <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h3 className="font-semibold text-gray-800">
          {formattedMonth}
        </h3>
        <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded-full">
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Week Days (Standard Sun-Sat to match logic) */}
      <div className="grid grid-cols-7 mb-2 px-4">
        {['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'].map((d, i) => (
          <div key={i} className="text-center text-xs font-bold text-gray-400">
            {d}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-y-1 px-4 pb-4 justify-items-center">
        {generateDays()}
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Доступное время</h4>
          <div className="flex flex-wrap gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                  selectedTime === time
                    ? 'bg-[#E53935] border-[#E53935] text-white'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-red-200'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action */}
      <div className="p-4 bg-white border-t border-gray-100">
        <button
          disabled={!selectedDate || !selectedTime}
          onClick={() => selectedDate && selectedTime && onConfirm(selectedDate, selectedTime, selectedType)}
          className={`w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${
            selectedDate && selectedTime
              ? 'bg-[#E53935] shadow-lg shadow-red-200 hover:bg-red-700'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {selectedDate && selectedTime ? (
            <>Подтвердить <Check className="w-5 h-5" /></>
          ) : (
            'Выберите дату'
          )}
        </button>
      </div>
    </div>
  );
};

export default CalendarBooking;