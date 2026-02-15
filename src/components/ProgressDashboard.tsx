import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Trophy,
  Target,
  Clock,
  Flame,
  TrendingUp,
  BookOpen,
  CheckCircle2,
  RotateCcw,
  Calendar,
  BarChart3,
  Award
} from 'lucide-react';
import { phaveList } from '@/data/phaveList';
import type { VerbProgress, StudySession, UserStats, LearningGoal } from '@/types/progress';
import { cn } from '@/lib/utils';

interface ProgressDashboardProps {
  progress: Record<string, VerbProgress>;
  sessions: StudySession[];
  stats: UserStats;
  goals: LearningGoal[];
  onStartReview: (verbIds: string[]) => void;
  onContinueStudying: () => void;
}

export function ProgressDashboard({
  progress,
  sessions,
  stats,
  goals,
  onStartReview,
  onContinueStudying,
}: ProgressDashboardProps) {
  const masteredCount = useMemo(() => 
    Object.values(progress).filter(p => p.mastered).length,
    [progress]
  );

  const inProgressCount = useMemo(() => 
    Object.values(progress).filter(p => !p.mastered && p.timesReviewed > 0).length,
    [progress]
  );

  const notStartedCount = useMemo(() => 
    phaveList.length - masteredCount - inProgressCount,
    [masteredCount, inProgressCount]
  );

  const masteryPercentage = Math.round((masteredCount / phaveList.length) * 100);

  const recentSessions = useMemo(() => 
    [...sessions].sort((a, b) => b.date - a.date).slice(0, 5),
    [sessions]
  );

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

  const getCategoryProgress = (category: string) => {
    const categoryVerbs = phaveList.filter(v => v.category === category);
    const masteredInCategory = categoryVerbs.filter(v => progress[v.id]?.mastered).length;
    return {
      total: categoryVerbs.length,
      mastered: masteredInCategory,
      percentage: Math.round((masteredInCategory / categoryVerbs.length) * 100) || 0,
    };
  };

  const categories = [...new Set(phaveList.map(v => v.category))].sort();

  return (
    <ScrollArea className="h-[calc(100vh-200px)]">
      <div className="space-y-6 p-1">
        {/* Header Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{masteredCount}</p>
                <p className="text-xs text-muted-foreground">Mastered</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <Target className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{inProgressCount}</p>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{Math.round(stats.totalStudyTime / 60)}</p>
                <p className="text-xs text-muted-foreground">Hours Studied</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                <Flame className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.currentStreak}</p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Overall Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Overall Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Mastery Progress</span>
              <span className="font-semibold">{masteryPercentage}%</span>
            </div>
            <Progress value={masteryPercentage} className="h-3" />
            <div className="grid grid-cols-3 gap-4 text-center pt-2">
              <div>
                <p className="text-2xl font-bold text-emerald-600">{masteredCount}</p>
                <p className="text-xs text-muted-foreground">Mastered</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-600">{inProgressCount}</p>
                <p className="text-xs text-muted-foreground">Learning</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-600">{notStartedCount}</p>
                <p className="text-xs text-muted-foreground">Not Started</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Progress by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categories.slice(0, 8).map(category => {
                const catProgress = getCategoryProgress(category);
                return (
                  <div key={category} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="capitalize">{category}</span>
                      <span className="text-muted-foreground">
                        {catProgress.mastered}/{catProgress.total}
                      </span>
                    </div>
                    <Progress value={catProgress.percentage} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-violet-500 to-indigo-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Continue Learning</h3>
                  <p className="text-violet-100 text-sm mb-4">
                    {verbsToReview.length} verbs waiting for review
                  </p>
                </div>
                <BookOpen className="w-8 h-8 text-violet-200" />
              </div>
              <Button 
                variant="secondary" 
                className="w-full"
                onClick={() => onStartReview(verbsToReview)}
              >
                Start Review Session
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Study Streak</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Keep learning to maintain your streak!
                  </p>
                </div>
                <Award className="w-8 h-8 text-amber-500" />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Current Streak</span>
                    <span className="text-sm font-bold text-amber-600">{stats.currentStreak} days</span>
                  </div>
                  <Progress value={Math.min((stats.currentStreak / 7) * 100, 100)} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        {recentSessions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentSessions.map((session, index) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center",
                        session.sessionType === 'quiz' ? "bg-violet-100 text-violet-600" :
                        session.sessionType === 'flashcards' ? "bg-emerald-100 text-emerald-600" :
                        "bg-amber-100 text-amber-600"
                      )}>
                        {session.sessionType === 'quiz' ? <Target className="w-5 h-5" /> :
                         session.sessionType === 'flashcards' ? <BookOpen className="w-5 h-5" /> :
                         <RotateCcw className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="font-medium capitalize">{session.sessionType}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(session.date).toLocaleDateString()} • {session.duration} min
                        </p>
                      </div>
                    </div>
                    {session.quizScore !== undefined && (
                      <Badge variant={session.quizScore >= 80 ? "default" : "secondary"}>
                        {session.quizScore}%
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ScrollArea>
  );
}
