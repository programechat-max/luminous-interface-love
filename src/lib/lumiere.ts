export type TabKey = "flow" | "chat" | "daily" | "workout" | "nutrition";

export interface UserProfile {
  fullName: string;
  email: string;
  age: number;
  height: number;
  weight: number;
  targetWeight: number;
  goal: string;
  membership: "FREE" | "PRO" | "ELITE" | "ELITE_PLUS";
  memberSince: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  weight: string;
  rest: string;
}

export interface WorkoutDay {
  day: string;
  title: string;
  exercises: Exercise[];
  completed: boolean;
}

export interface Meal {
  id: string;
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  logged: boolean;
  items: string[];
}

export interface DailyRing {
  label: string;
  current: number;
  target: number;
  unit: string;
  tone: "primary" | "success" | "warning";
}

export interface WeightEntry {
  date: string;
  weight: number;
}

export const profile: UserProfile = {
  fullName: "Ahmet Yılmaz",
  email: "ahmet@example.com",
  age: 28,
  height: 182,
  weight: 84.5,
  targetWeight: 78,
  goal: "Yağ yakımı",
  membership: "PRO",
  memberSince: "Ağustos 2026",
};

export const initialChat: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Merhaba Ahmet! Bugünkü antrenmanına hazır mısın? Hedeflerine birlikte ilerliyoruz.",
    timestamp: "09:12",
  },
  {
    id: "2",
    role: "user",
    content: "Protein hedefimi hatırlatır mısın?",
    timestamp: "09:18",
  },
  {
    id: "3",
    role: "assistant",
    content: "Günlük protein hedefin 175g. Şu ana kadar 105g aldın, 70g kaldı.",
    timestamp: "09:19",
  },
];

const ex = (name: string, weight: string, reps = "8-12"): Exercise => ({
  name,
  sets: 3,
  reps,
  weight,
  rest: "90sn",
});

const pushDay: Exercise[] = [
  ex("Bench Press", "80 kg", "6-8"),
  ex("Overhead Press", "45 kg"),
  ex("Incline Dumbbell Press", "28 kg"),
  ex("Triceps Pushdown", "30 kg", "12-15"),
  ex("Yan Omuz Kaldırış", "12 kg", "15"),
];

const pullDay: Exercise[] = [
  ex("Barfiks", "Vücut", "8-10"),
  ex("Barbell Row", "70 kg"),
  ex("Lat Pulldown", "60 kg"),
  ex("Biceps Curl", "16 kg", "12"),
];

const legDay: Exercise[] = [
  ex("Squat", "100 kg", "5-8"),
  ex("Romanian Deadlift", "80 kg"),
  ex("Leg Press", "160 kg", "10-12"),
  ex("Calf Raise", "40 kg", "15-20"),
];

export const weekProgram: WorkoutDay[] = [
  { day: "Pzt", title: "Üst İtiş", exercises: pushDay, completed: true },
  { day: "Sal", title: "Alt Çekiş", exercises: legDay, completed: true },
  { day: "Çar", title: "Dinlenme", exercises: [], completed: false },
  { day: "Per", title: "Üst Çekiş", exercises: pullDay, completed: false },
  { day: "Cum", title: "Alt İtiş", exercises: legDay, completed: false },
  { day: "Cmt", title: "Dinlenme", exercises: [], completed: false },
  { day: "Paz", title: "Aktif Dinlenme", exercises: [], completed: false },
];

export const meals: Meal[] = [
  {
    id: "1",
    name: "Kahvaltı",
    time: "08:00",
    calories: 520,
    protein: 35,
    carbs: 55,
    fat: 18,
    logged: true,
    items: ["3 yumurta", "Yulaf", "Muz"],
  },
  {
    id: "2",
    name: "Öğle Yemeği",
    time: "13:00",
    calories: 610,
    protein: 45,
    carbs: 62,
    fat: 20,
    logged: true,
    items: ["Tavuk", "Pirinç", "Salata"],
  },
  {
    id: "3",
    name: "Ara Öğün",
    time: "16:30",
    calories: 240,
    protein: 25,
    carbs: 18,
    fat: 8,
    logged: false,
    items: ["Protein shake", "Badem"],
  },
  {
    id: "4",
    name: "Akşam Yemeği",
    time: "19:00",
    calories: 680,
    protein: 50,
    carbs: 50,
    fat: 28,
    logged: false,
    items: ["Somon", "Tatlı patates", "Brokoli"],
  },
];

export const dailyRings: DailyRing[] = [
  { label: "Kalori", current: 1130, target: 2200, unit: "kcal", tone: "primary" },
  { label: "Protein", current: 80, target: 175, unit: "g", tone: "success" },
  { label: "Antrenman", current: 0, target: 1, unit: "seans", tone: "warning" },
];

export const weightData: WeightEntry[] = [
  { date: "1 Ağu", weight: 87.2 },
  { date: "10 Ağu", weight: 86.1 },
  { date: "20 Ağu", weight: 85.2 },
  { date: "28 Ağu", weight: 84.9 },
  { date: "5 Eyl", weight: 84.5 },
];

export const weekHistory = [
  { day: "Pzt", done: true },
  { day: "Sal", done: true },
  { day: "Çar", done: true },
  { day: "Per", done: true },
  { day: "Cum", done: false },
  { day: "Cmt", done: false },
  { day: "Paz", done: false },
];
