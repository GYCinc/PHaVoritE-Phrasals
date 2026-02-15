// User progress tracking types

export interface VerbProgress {
  verbId: string;
  mastered: boolean;
  timesReviewed: number;
  timesCorrect: number;
  lastReviewed: number; // timestamp
  difficultyRating: number; // 1-5, user-rated difficulty
}

export interface StudySession {
  id: string;
  date: number; // timestamp
  duration: number; // minutes
  verbsStudied: string[];
  quizScore?: number;
  sessionType: 'flashcards' | 'quiz' | 'review';
}

export interface UserStats {
  totalVerbsMastered: number;
  totalStudyTime: number; // minutes
  currentStreak: number; // days
  longestStreak: number;
  averageQuizScore: number;
  favoriteCategory?: string;
  weakestCategory?: string;
}

export interface LearningGoal {
  id: string;
  targetVerbs: number;
  deadline: number; // timestamp
  completed: boolean;
  category?: string;
}
