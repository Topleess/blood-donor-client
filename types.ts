export enum BloodType {
  O_POS = "O+",
  O_NEG = "O-",
  A_POS = "A+",
  A_NEG = "A-",
  B_POS = "B+",
  B_NEG = "B-",
  AB_POS = "AB+",
  AB_NEG = "AB-"
}

export enum DonationType {
  WHOLE_BLOOD = "Цельная кровь",
  PLASMA = "Плазма",
  PLATELETS = "Тромбоциты"
}

export enum AppStatus {
  PENDING = "На проверке",
  APPROVED = "Одобрено",
  COMPLETED = "Завершено",
  REJECTED = "Отклонено"
}

export interface DonorProfile {
  name: string;
  avatarUrl: string;
  bloodType: BloodType;
  totalDonations: number;
  nextLevelTarget: number;
  lastDonationDate: Date; // Used for recovery calculation
}

export interface DonationRecord {
  id: string;
  date: string;
  amount: string;
  location: string;
  type: DonationType;
  status: AppStatus;
}

export interface BloodDemand {
  type: BloodType;
  level: 'critical' | 'moderate' | 'sufficient';
}