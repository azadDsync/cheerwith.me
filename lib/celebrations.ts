export interface CelebrationConfig {
  title: string[];
  subtitle?: string;
  message: string;
  cite?: string;
  colors?: string[];
  emoji?: string;
  backgroundMusic?: string;
  celebrationSound?: string;
}

export const celebrationThemes: Record<string, CelebrationConfig> = {
  teachersDay: {
    title: ["HAPPY TEACHERS", "DAY"],
    subtitle: "🎈 Like the good old school days 🎈",
    message: "You made learning an art—thank you for nurturing creativity in us.",
    cite: "7th Batch JNV Kanker ❤️",
    emoji: "👨‍🏫",
    backgroundMusic: "/sound/happy-teacher-day.mp3",
    celebrationSound: "/sound/Voicy_Celebration sound effect.mp3"
  },
  birthday: {
    title: ["HAPPY", "BIRTHDAY"],
    subtitle: "🎂 Another year of awesome! 🎂",
    message: "May your special day be filled with happiness, laughter, and joy!",
    cite: "Celebrating you today and always! 🎈🎉",
    colors: ["#FFD700", "#FF69B4", "#00CED1", "#FF6347", "#32CD32", "#9370DB"],
    emoji: "🎂",
    backgroundMusic: "/sound/happy-birthday.mp3",
    celebrationSound: "/sound/birthday-cheer.mp3"
  },
  festival: {
    title: ["HAPPY", "FESTIVAL"],
    subtitle: "🪔 Celebrating traditions together 🪔",
    message: "May this festival bring peace, prosperity, and happiness to all!",
    cite: "Festivals unite us in joy and celebration 🎆✨",
    colors: ["#FF4500", "#FFD700", "#DC143C", "#FF69B4", "#00FF7F", "#1E90FF"],
    emoji: "🪔",
    backgroundMusic: "/sound/festival-music.mp3",
    celebrationSound: "/sound/festival-cheer.mp3"
  },
  nationalDay: {
    title: ["HAPPY", "NATIONAL DAY"],
    subtitle: "🇮🇳 Proud to be Indian 🇮🇳",
    message: "Celebrating our nation's spirit, unity, and rich heritage!",
    cite: "Together we stand, together we celebrate 🇮🇳💫",
    colors: ["#FF9933", "#FFFFFF", "#138808", "#000080"],
    emoji: "🇮🇳",
    backgroundMusic: "/sound/national-anthem.mp3",
    celebrationSound: "/sound/patriotic-cheer.mp3"
  },
  achievement: {
    title: ["CONGRATULATIONS", "CHAMPION"],
    subtitle: "🏆 Excellence achieved! 🏆",
    message: "Your hard work and dedication have paid off. Well deserved!",
    cite: "Success is the result of dreams + hard work 🌟💪",
    colors: ["#FFD700", "#FFA500", "#FF6B6B", "#4ECDC4", "#45B7D1"],
    emoji: "🏆",
    backgroundMusic: "/sound/victory-music.mp3",
    celebrationSound: "/sound/Voicy_Victory sound.mp3"
  },
  generic: {
    title: ["CELEBRATION", "TIME"],
    subtitle: "🎊 Every moment deserves joy 🎊",
    message: "Life is a celebration - let's make every moment count!",
    cite: "Celebrating the beautiful moments of life ❤️",
    emoji: "🎊",
    backgroundMusic: "/sound/happy-teacher-day.mp3",
    celebrationSound: "/sound/Voicy_Celebration sound effect.mp3"
  }
}

// will make apis and accordingly celebrate the day

export function detectCelebrationType(): string {
  const today = new Date();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  
  // Teachers Day (September 5)
  if (month === 9 && date === 5) return 'teachersDay';
  
  // Independence Day (August 15)
  if (month === 8 && date === 15) return 'nationalDay';
  
  // Republic Day (January 26)
  if (month === 1 && date === 26) return 'nationalDay';
  
  // Default to generic celebration
  return 'teachersDay';
}
