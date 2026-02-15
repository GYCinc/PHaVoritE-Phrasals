import { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BookOpen,
  Brain,
  Trophy,
  Target,
  Search,
  Filter,
  Play,
  RotateCcw,
  GraduationCap,
  Sparkles,
  ChevronRight,
  Volume2,
  CheckCircle2,
  Clock,
  Flame,
  BarChart3,
  Award,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { Flashcard } from '@/components/Flashcard';
import { Quiz } from '@/components/Quiz';
import { ProgressDashboard } from '@/components/ProgressDashboard';
import { useProgress } from '@/hooks/useProgress';
import { phaveList, categories, difficultyLevels, searchVerbs } from '@/data/phaveList';
import type { PhrasalVerb } from '@/data/phaveList';
import { cn } from '@/lib/utils';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

type ViewMode = 'browse' | 'flashcards' | 'quiz' | 'progress';

export default function Index() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('browse');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVerbs, setFilteredVerbs] = useState<PhrasalVerb[]>(phaveList);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [quizVerbs, setQuizVerbs] = useState<PhrasalVerb[]>([]);

  const {
    progress,
    sessions,
    stats,
    goals,
    isLoaded,
    masteredCount,
    totalReviewed,
    markVerbAsReviewed,
    addSession,
  } = useProgress();

  // Filter verbs based on search, category, and difficulty
  useEffect(() => {
    let result = phaveList;

    if (searchQuery) {
      result = searchVerbs(searchQuery);
    }

    if (selectedCategory !== 'all') {
      result = result.filter(v => v.category === selectedCategory);
    }

    if (selectedDifficulty !== 'all') {
      result = result.filter(v => v.difficulty === selectedDifficulty);
    }

    setFilteredVerbs(result);
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  const handleStartFlashcards = useCallback(() => {
    setFlashcardIndex(0);
    setViewMode('flashcards');
  }, []);

  const handleStartQuiz = useCallback(() => {
    const shuffled = [...filteredVerbs].sort(() => Math.random() - 0.5).slice(0, 10);
    setQuizVerbs(shuffled);
    setViewMode('quiz');
  }, [filteredVerbs]);

  const handleQuizComplete = useCallback((score: number, total: number) => {
    const session = {
      id: Date.now().toString(),
      date: Date.now(),
      duration: 5,
      verbsStudied: quizVerbs.map(v => v.id),
      quizScore: Math.round((score / total) * 100),
      sessionType: 'quiz' as const,
    };
    addSession(session);
    setViewMode('progress');
  }, [quizVerbs, addSession]);

  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    if (viewMode === 'quiz') {
      const timer = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [viewMode]);

  const handleFlashcardNext = useCallback(() => {
    if (flashcardIndex < filteredVerbs.length - 1) {
      setFlashcardIndex(prev => prev + 1);
    }
  }, [flashcardIndex, filteredVerbs.length]);

  const handleFlashcardPrevious = useCallback(() => {
    if (flashcardIndex > 0) {
      setFlashcardIndex(prev => prev - 1);
    }
  }, [flashcardIndex]);

  const handleMarkKnown = useCallback((known: boolean) => {
    const verb = filteredVerbs[flashcardIndex];
    if (verb) {
      markVerbAsReviewed(verb.id, known);
    }
  }, [filteredVerbs, flashcardIndex, markVerbAsReviewed]);

  const verbsToReview = useMemo(() => {
    const masteredIds = Object.values(progress)
      .filter(p => p.mastered)
      .map(p => p.verbId);
    return phaveList
      .filter(v => !masteredIds.includes(v.id))
      .sort(() => Math.random() - 0.5)
      .slice(0, 10)
      .map(v => v.id);
  }, [progress]);

  // Flashcards View
  if (viewMode === 'flashcards') {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Flashcards</h1>
            <p className="text-muted-foreground">Learn at your own pace</p>
          </div>
          <Button variant="outline" onClick={() => setViewMode('browse')}>
            Exit
          </Button>
        </div>
        <Flashcard
          verbs={filteredVerbs}
          currentIndex={flashcardIndex}
          onNext={handleFlashcardNext}
          onPrevious={handleFlashcardPrevious}
          onMarkKnown={handleMarkKnown}
          progress={progress}
        />
      </div>
    );
  }

  // Quiz View
  if (viewMode === 'quiz') {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Quiz</h1>
            <p className="text-muted-foreground">Test your knowledge</p>
          </div>
          <Button variant="outline" onClick={() => setViewMode('browse')}>
            Exit
          </Button>
        </div>
        <Quiz
          verbs={quizVerbs}
          onComplete={handleQuizComplete}
          onExit={() => setViewMode('browse')}
        />
      </div>
    );
  }

  // Progress View
  if (viewMode === 'progress') {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Your Progress</h1>
            <p className="text-muted-foreground">Track your learning journey</p>
          </div>
          <Button variant="outline" onClick={() => setViewMode('browse')}>
            Back to Browse
          </Button>
        </div>
        <ProgressDashboard
          progress={progress}
          sessions={sessions}
          stats={stats}
          goals={goals}
          onStartReview={(ids) => {
            const verbs = phaveList.filter(v => ids.includes(v.id));
            setFilteredVerbs(verbs);
            setFlashcardIndex(0);
            setViewMode('flashcards');
          }}
          onContinueStudying={() => setViewMode('browse')}
        />
      </div>
    );
  }

  // Browse View (Default)
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 text-white p-8 md:p-12 mb-8">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-medium text-violet-100">PHaVE List</span>
              </div>
              <ThemeSwitcher variant="dropdown" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Master the Top 150 Phrasal Verbs
            </h1>
            <p className="text-violet-100 text-lg mb-6 max-w-2xl">
              Based on the PHaVE (Phrasal Verbs in English) list by Dr. Norbert Schmitt. 
              Learn the most frequent phrasal verbs used in everyday English.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={handleStartFlashcards}
                className="gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Start Flashcards
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => setViewMode('progress')}
                className="gap-2 border-white/20 text-white hover:bg-white/10"
              >
                <Target className="w-4 h-4" />
                View Progress
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/theme-studio')}
                className="gap-2 border-white/20 text-white hover:bg-white/10"
              >
                <Sparkles className="w-4 h-4" />
                Theme Studio
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-800/10 border-emerald-200">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">{masteredCount}</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-500">Mastered</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-violet-50 to-violet-100/50 dark:from-violet-900/20 dark:to-violet-800/10 border-violet-200">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-violet-700 dark:text-violet-400">{totalReviewed}</p>
                <p className="text-xs text-violet-600 dark:text-violet-500">Reviews</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-900/20 dark:to-amber-800/10 border-amber-200">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">
                  {Math.round(stats.totalStudyTime / 60)}
                </p>
                <p className="text-xs text-amber-600 dark:text-amber-500">Hours</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-rose-50 to-rose-100/50 dark:from-rose-900/20 dark:to-rose-800/10 border-rose-200">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-rose-700 dark:text-rose-400">
                  {stats.currentStreak}
                </p>
                <p className="text-xs text-rose-600 dark:text-rose-500">Day Streak</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search phrasal verbs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[140px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat} className="capitalize">
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="w-[140px]">
                    <Target className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficultyLevels.map(level => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button onClick={handleStartFlashcards} className="gap-2">
            <BookOpen className="w-4 h-4" />
            Flashcards ({filteredVerbs.length})
          </Button>
          <Button onClick={handleStartQuiz} variant="secondary" className="gap-2">
            <Brain className="w-4 h-4" />
            Take Quiz
          </Button>
          <Button onClick={() => setViewMode('progress')} variant="outline" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            Progress
          </Button>
        </div>

        {/* Verbs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVerbs.map((verb) => {
            const verbProgress = progress[verb.id];
            const isMastered = verbProgress?.mastered;
            const hasReviewed = verbProgress && verbProgress.timesReviewed > 0;

            return (
              <motion.div
                key={verb.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={cn(
                  "group hover:shadow-lg transition-all duration-300 cursor-pointer border-2",
                  isMastered ? "border-emerald-200 bg-emerald-50/50 dark:bg-emerald-900/10" :
                  hasReviewed ? "border-amber-200 bg-amber-50/50 dark:bg-amber-900/10" :
                  "border-transparent hover:border-violet-200"
                )}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold">
                          {verb.verb} <span className="text-violet-600">{verb.particle}</span>
                        </h3>
                        {isMastered && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          const utterance = new SpeechSynthesisUtterance(`${verb.verb} ${verb.particle}`);
                          utterance.lang = 'en-US';
                          utterance.rate = 0.8;
                          window.speechSynthesis.speak(utterance);
                        }}
                      >
                        <Volume2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <p className="text-muted-foreground mb-3">{verb.meaning}</p>

                    <div className="bg-muted/50 p-3 rounded-lg mb-3">
                      <p className="text-sm italic">&ldquo;{verb.example}&rdquo;</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs capitalize">
                          {verb.category}
                        </Badge>
                        {verbProgress && (
                          <Badge 
                            variant="secondary" 
                            className="text-xs"
                          >
                            {verbProgress.timesReviewed} reviews
                          </Badge>
                        )}
                      </div>
                      {isMastered && (
                        <Badge className="bg-emerald-500 text-white text-xs">
                          Mastered
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {filteredVerbs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No verbs found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
