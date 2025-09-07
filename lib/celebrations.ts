export interface CelebrationConfig {
  greet?:string;
  date: string;                 // e.g. "1 Nov"
  title: string;                // e.g. "happy birthday"
  name: string;                 // e.g. "doom"
  img?: string;                 // optional image URL (may be "")
  quote: string;                // e.g. "Wishing you a day full..."
  backgroundMusic?: string;     // optional path/URL to background music
  celebrationSound?: string;    // optional path/URL to celebration sound
  cite?: string;
}
