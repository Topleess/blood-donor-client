import React, { useState } from 'react';
import { 
  Home, 
  Calendar as CalendarIcon, 
  User, 
  Settings, 
  Bell,
  MapPin,
  Clock,
  ChevronRight
} from 'lucide-react';
import { BloodType, BloodDemand, AppStatus, DonationType, DonationRecord, DonorProfile } from './types';
import DonorTrafficLight from './components/DonorTrafficLight';
import HonoraryPath from './components/HonoraryPath';
import NextDonationCard from './components/NextDonationCard';
import CalendarBooking from './components/CalendarBooking';

// MOCK DATA
const MOCK_USER: DonorProfile = {
  name: "Алексей",
  avatarUrl: "https://picsum.photos/100/100",
  bloodType: BloodType.O_POS,
  totalDonations: 15,
  nextLevelTarget: 40,
  lastDonationDate: new Date('2023-10-15') // Change this to recent date to test "Recovery Mode"
};

const MOCK_DEMAND: BloodDemand[] = [
  { type: BloodType.O_POS, level: 'sufficient' },
  { type: BloodType.O_NEG, level: 'critical' },
  { type: BloodType.A_POS, level: 'critical' },
  { type: BloodType.A_NEG, level: 'moderate' },
  { type: BloodType.B_POS, level: 'sufficient' },
  { type: BloodType.B_NEG, level: 'moderate' },
  { type: BloodType.AB_POS, level: 'sufficient' },
  { type: BloodType.AB_NEG, level: 'sufficient' },
];

const MOCK_HISTORY: DonationRecord[] = [
  { id: '1', date: '15 Окт 2023', amount: '450мл', location: 'Центральный банк крови', type: DonationType.WHOLE_BLOOD, status: AppStatus.COMPLETED },
  { id: '2', date: '01 Авг 2023', amount: '600мл', location: 'Мобильный пункт 4', type: DonationType.PLASMA, status: AppStatus.COMPLETED },
  { id: '3', date: '20 Мая 2023', amount: '450мл', location: 'Городская больница', type: DonationType.WHOLE_BLOOD, status: AppStatus.COMPLETED },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'booking' | 'profile'>('home');
  const [showConfetti, setShowConfetti] = useState(false);

  const handleBookClick = () => {
    setActiveTab('booking');
  };

  const handleBookingConfirm = (date: Date, time: string, type: DonationType) => {
    // Simulating API call
    console.log(`Booking confirmed for ${date.toDateString()} at ${time} for ${type}`);
    setShowConfetti(true);
    setTimeout(() => {
        setShowConfetti(false);
        setActiveTab('profile'); // Redirect to profile to see "pending"
    }, 1500);
  };

  // Mock handlers for interactivity
  const handleNotificationClick = () => alert("Уведомления: Нет новых уведомлений");
  const handleSettingsClick = () => alert("Настройки: Здесь будут настройки профиля");
  const handleViewAllHistoryClick = () => alert("История: Здесь будет полный список донаций");

  // --- SCREENS ---

  const renderHome = () => (
    <div className="pb-24 animate-fade-in">
      {/* Top Bar */}
      <header className="bg-white px-5 pt-8 pb-4 sticky top-0 z-20 shadow-sm flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src={MOCK_USER.avatarUrl} alt="User" className="w-10 h-10 rounded-full object-cover border-2 border-red-100" />
          <div>
            <h1 className="text-sm text-gray-500">С возвращением,</h1>
            <h2 className="text-lg font-bold text-gray-800 leading-none">{MOCK_USER.name}</h2>
          </div>
        </div>
        <button onClick={handleNotificationClick} className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </header>

      <div className="px-5 mt-4">
        {/* Honorary Path Widget */}
        <HonoraryPath current={MOCK_USER.totalDonations} target={MOCK_USER.nextLevelTarget} />

        {/* Traffic Light Widget */}
        <DonorTrafficLight demandData={MOCK_DEMAND} />

        {/* AI Health Tip REMOVED */}

        {/* Spacing for Next Donation Card */}
        <div className="mt-6">
           <h3 className="font-bold text-gray-800 mb-3 text-lg">Ваши следующие шаги</h3>
           <NextDonationCard lastDonation={MOCK_USER.lastDonationDate} onBook={handleBookClick} />
        </div>
      </div>
    </div>
  );

  const renderBooking = () => (
    <div className="pb-24 animate-fade-in bg-gray-50 min-h-screen">
       <header className="bg-white px-5 pt-8 pb-4 sticky top-0 z-20 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800">Запись на донацию</h2>
        <p className="text-sm text-gray-500">Выберите удобную дату и время.</p>
      </header>
      
      <div className="p-5">
        <CalendarBooking 
          lastDonationDate={MOCK_USER.lastDonationDate} 
          onConfirm={handleBookingConfirm} 
        />
        
        <div className="mt-6 text-xs text-gray-400 text-center">
          <p>Записываясь, вы соглашаетесь с правилами медицинского обследования.</p>
        </div>
      </div>

      {showConfetti && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-2xl shadow-2xl text-center transform scale-110 transition-transform">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckIcon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Запись подтверждена!</h3>
                <p className="text-gray-500 mt-2">Ждем вас в центре крови.</p>
            </div>
        </div>
      )}
    </div>
  );

  const renderProfile = () => (
    <div className="pb-24 animate-fade-in bg-gray-50 min-h-screen">
      <header className="bg-[#E53935] px-5 pt-12 pb-16 relative">
          <div className="flex justify-between items-start text-white">
             <h2 className="text-2xl font-bold">Профиль</h2>
             <button onClick={handleSettingsClick} className="hover:opacity-70 transition-opacity"><Settings className="w-6 h-6 opacity-80" /></button>
          </div>
          
          <div className="absolute -bottom-10 left-5 right-5 bg-white rounded-xl p-4 shadow-md flex items-center gap-4">
             <img src={MOCK_USER.avatarUrl} alt="User" className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-sm" />
             <div>
                <h3 className="font-bold text-gray-800 text-lg">{MOCK_USER.name}</h3>
                <span className="bg-red-100 text-[#E53935] text-xs font-bold px-2 py-0.5 rounded uppercase">
                    Донор {MOCK_USER.bloodType}
                </span>
             </div>
          </div>
      </header>

      <div className="mt-14 px-5">
          {/* Active Application Section */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-3 text-lg">Активные заявки</h3>
            <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-yellow-400">
                <div className="flex justify-between items-start">
                    <div>
                        <span className="text-xs font-semibold text-yellow-600 uppercase tracking-wide">На проверке</span>
                        <h4 className="font-bold text-gray-800 mt-1">Сдача цельной крови</h4>
                        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                            <Clock className="w-3 h-3" /> 24 Окт, 10:00
                        </div>
                    </div>
                </div>
            </div>
          </div>

          {/* History Section */}
          <div>
              <div className="flex justify-between items-end mb-3">
                <h3 className="font-bold text-gray-800 text-lg">История донаций</h3>
                <button onClick={handleViewAllHistoryClick} className="text-[#E53935] text-sm font-semibold hover:text-red-700 transition-colors">Все</button>
              </div>
              
              <div className="flex flex-col gap-3">
                  {MOCK_HISTORY.map((record) => (
                      <div key={record.id} className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
                          <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-[#E53935]">
                                  <MapPin className="w-5 h-5" />
                              </div>
                              <div>
                                  <h4 className="font-bold text-gray-800 text-sm">{record.location}</h4>
                                  <p className="text-xs text-gray-500">{record.date} • {record.amount}</p>
                              </div>
                          </div>
                          <div className="flex items-center gap-2">
                             <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                                 {record.type}
                             </span>
                             <ChevronRight className="w-4 h-4 text-gray-300" />
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 relative shadow-2xl overflow-hidden">
      
      {activeTab === 'home' && renderHome()}
      {activeTab === 'booking' && renderBooking()}
      {activeTab === 'profile' && renderProfile()}

      {/* Bottom Navigation (Simplified) */}
      <nav className="fixed bottom-0 max-w-md w-full bg-white border-t border-gray-100 pb-safe pt-2 px-6 flex justify-around items-center z-30 shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">
        <NavButton 
            active={activeTab === 'home'} 
            onClick={() => setActiveTab('home')} 
            icon={<Home className="w-6 h-6" />} 
            label="Главная" 
        />
        <NavButton 
            active={activeTab === 'booking'} 
            onClick={() => setActiveTab('booking')} 
            icon={<CalendarIcon className="w-6 h-6" />} 
            label="Запись" 
        />
        <NavButton 
            active={activeTab === 'profile'} 
            onClick={() => setActiveTab('profile')} 
            icon={<User className="w-6 h-6" />} 
            label="Профиль" 
        />
      </nav>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
    <button 
        onClick={onClick}
        className={`flex flex-col items-center gap-1 p-2 w-16 transition-colors ${active ? 'text-[#E53935]' : 'text-gray-400 hover:text-gray-600'}`}
    >
        {icon}
        <span className="text-[10px] font-medium">{label}</span>
    </button>
);

const CheckIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

export default App;