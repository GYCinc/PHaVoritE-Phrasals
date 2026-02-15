import { useState, useEffect, useCallback } from 'react';
import type { VerbProgress, StudySession, UserStats, LearningGoal } from '@/types/progress';

const STORAGE_KEY = 'phave-progress';
const SESSIONS_KEY = 'phave-sessions';
const STATS_KEY = 'phave-stats';
const GOALS_KEY = 'phave-goals';

interface StoredData {
  progress: Record<string, VerbProgress>;
  sessions: StudySession[];
  stats: UserStats;
  goals: LearningGoal[];
}

const defaultStats: UserStats = {
  totalVerbsMastered: 0,
  totalStudyTime: 0,
  currentStreak: 0,
  longestStreak: 0,
  averageQuizScore: 0,
};

export function useProgress() {
  const [progress, setProgress] = useState<Record<string, VerbProgress>>({});
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [stats, setStats] = useState<UserStats>(defaultStats);
  const [goals, setGoals] = useState<LearningGoal[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const storedProgress = localStorage.getItem(STORAGE_KEY);
      const storedSessions = localStorage.getItem(SESSIONS_KEY);
      const storedStats = localStorage.getItem(STATS_KEY);
      const storedGoals = localStorage.getItem(GOALS_KEY);

      if (storedProgress) setProgress(JSON.parse(storedProgress));
      if (storedSessions) setSessions(JSON.parse(storedSessions));
      if (storedStats) setStats(JSON.parse(storedStats));
      if (storedGoals) setGoals(JSON.parse(storedGoals));
    } catch (error) {
      console.error('Error loading progress:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
      localStorage.setItem(STATS_KEY, JSON.stringify(stats));
      localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }, [progress, sessions, stats, goals, isLoaded]);

  const updateVerbProgress = useCallback((verbId: string, updates: Partial<VerbProgress>) => {
    setProgress(prev => {
      const existing = prev[verbId] || {
        verbId,
        mastered: false,
        timesReviewed: 0,
        timesCorrect: 0,
        lastReviewed: Date.now(),
        difficultyRating: 3,
      };
      return {
        ...prev,
        [verbId]: { ...existing, ...updates, lastReviewed: Date.now() },
      };
    });
  }, []);

  const markVerbAsReviewed = useCallback((verbId: string, correct: boolean) => {
    setProgress(prev => {
      const existing = prev[verbId] || {
        verbId,
        mastered: false,
        timesReviewed: 0,
        timesCorrect: 0,
        lastReviewed: Date.now(),
        difficultyRating: 3,
      };
      const newTimesReviewed = existing.timesReviewed + 1;
      const newTimesCorrect = existing.timesCorrect + (correct ? 1 : 0);
      const mastered = newTimesCorrect >= 3 && newTimesCorrect / newTimesReviewed >= 0.8;

      return {
        ...prev,
        [verbId]: {
          ...existing,
          timesReviewed: newTimesReviewed,
          timesCorrect: newTimesCorrect,
          mastered,
          lastReviewed: Date.now(),
        },
      };
    });
  }, []);

  const addSession = useCallback((session: StudySession) => {
    setSessions(prev => [...prev, session]);
    setStats(prev => ({
      ...prev,
      totalStudyTime: prev.totalStudyTime + session.duration,
    }));
  }, []);

  const addGoal = useCallback((goal: LearningGoal) => {
    setGoals(prev => [...prev, goal]);
  }, []);

  const updateGoal = useCallback((goalId: string, updates: Partial<LearningGoal>) => {
    setGoals(prev =>
      prev.map(g => (g.id === goalId ? { ...g, ...updates } : g))
    );
  }, []);

  const masteredCount = Object.values(progress).filter(p => p.mastered).length;
  const totalReviewed = Object.values(progress).reduce((sum, p) => sum + p.timesReviewed, 0);

  return {
    progress,
    sessions,
    stats,
    goals,
    isLoaded,
    masteredCount,
    totalReviewed,
    updateVerbProgress,
    markVerbAsReviewed,
    addSession,
    addGoal,
    updateGoal,
  };
}
