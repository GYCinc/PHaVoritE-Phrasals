import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  CheckCircle2,
  XCircle,
  Trophy,
  Timer,
  ArrowRight,
  RotateCcw,
  Volume2,
  Brain,
  Target
} from 'lucide-react';
import type { PhrasalVerb } from '@/data/phaveList';
import { cn } from '@/lib/utils';

type QuestionType = 'multiple-choice' | 'fill-blank' | 'match-meaning';

interface Question {
  id: string;
  type: QuestionType;
  verb: PhrasalVerb;
  options?: string[];
  correctAnswer: string;
}

interface QuizProps {
  verbs: PhrasalVerb[];
  questionCount?: number;
  onComplete: (score: number, total: number) => void;
  onExit: () => void;
}

export function Quiz({ verbs, questionCount = 10, onComplete, onExit }: QuizProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  // Generate questions on mount
  useEffect(() => {
    const shuffled = [...verbs].sort(() => Math.random() - 0.5).slice(0, questionCount);
    const generatedQuestions: Question[] = shuffled.map((verb, index) => {
      const types: QuestionType[] = ['multiple-choice', 'fill-blank', 'match-meaning'];
      const type = types[index % 3];

      if (type === 'multiple-choice') {
        const otherVerbs = verbs.filter(v => v.id !== verb.id).sort(() => Math.random() - 0.5).slice(0, 3);
        const options = [verb.meaning, ...otherVerbs.map(v => v.meaning)].sort(() => Math.random() - 0.5);
        return {
          id: `q-${index}`,
          type,
          verb,
          options,
          correctAnswer: verb.meaning,
        };
      }

      if (type === 'fill-blank') {
        // Create a fill-in-the-blank question from the example
        const fullVerb = `${verb.verb} ${verb.particle}`;
        const blankedExample = verb.example.replace(fullVerb, '________');
        return {
          id: `q-${index}`,
          type,
          verb,
          correctAnswer: fullVerb,
          options: [blankedExample],
        };
      }

      // match-meaning type
      return {
        id: `q-${index}`,
        type,
        verb,
        correctAnswer: `${verb.verb} ${verb.particle}`,
      };
    });

    setQuestions(generatedQuestions);
  }, [verbs, questionCount]);

  // Timer
  useEffect(() => {
    if (isQuizComplete) return;
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isQuizComplete]);

  const currentQuestion = questions[currentIndex];

  const handleSubmitAnswer = useCallback(() => {
    if (!selectedAnswer && currentQuestion?.type !== 'fill-blank') return;
    
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer ||
      (currentQuestion.type === 'fill-blank' && 
       selectedAnswer.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase());
    
    setShowResult(true);
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  }, [selectedAnswer, currentQuestion]);

  const handleNextQuestion = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer('');
      setShowResult(false);
    } else {
      setIsQuizComplete(true);
      onComplete(score + (showResult && selectedAnswer === currentQuestion?.correctAnswer ? 1 : 0), questions.length);
    }
  }, [currentIndex, questions.length, score, showResult, selectedAnswer, currentQuestion, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (isQuizComplete) {
    const finalScore = score;
    const percentage = Math.round((finalScore / questions.length) * 100);
    
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <Trophy className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
            <p className="text-muted-foreground">Great job completing the quiz</p>
          </div>

          <div className="grid grid-cols-3 gap-4 py-6">
            <div className="bg-muted rounded-lg p-4">
              <p className="text-3xl font-bold text-primary">{finalScore}</p>
              <p className="text-sm text-muted-foreground">Correct</p>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <p className="text-3xl font-bold text-primary">{percentage}%</p>
              <p className="text-sm text-muted-foreground">Score</p>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <p className="text-3xl font-bold text-primary">{formatTime(timeElapsed)}</p>
              <p className="text-sm text-muted-foreground">Time</p>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button variant="outline" onClick={onExit}>
              Back to Menu
            </Button>
            <Button onClick={() => window.location.reload()}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Quiz Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            Question {currentIndex + 1}/{questions.length}
          </Badge>
          <Badge variant="secondary" className="text-sm">
            <Timer className="w-3 h-3 mr-1" />
            {formatTime(timeElapsed)}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-primary" />
          <span className="font-semibold">{score}</span>
          <span className="text-muted-foreground">correct</span>
        </div>
      </div>

      <Progress value={(currentIndex / questions.length) * 100} className="h-2" />

      {/* Question Card */}
      <Card className="min-h-[300px]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge className={getDifficultyColor(currentQuestion.verb.difficulty)}>
              {currentQuestion.verb.difficulty}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const utterance = new SpeechSynthesisUtterance(
                  currentQuestion.type === 'fill-blank'
                    ? currentQuestion.verb.example
                    : `${currentQuestion.verb.verb} ${currentQuestion.verb.particle}`
                );
                utterance.lang = 'en-US';
                utterance.rate = 0.8;
                window.speechSynthesis.speak(utterance);
              }}
            >
              <Volume2 className="w-4 h-4 mr-2" />
              Listen
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Question */}
          <div className="text-center space-y-4">
            {currentQuestion.type === 'multiple-choice' && (
              <>
                <h3 className="text-2xl font-bold">
                  {currentQuestion.verb.verb} {currentQuestion.verb.particle}
                </h3>
                <p className="text-muted-foreground">What does this phrasal verb mean?</p>
              </>
            )}
            {currentQuestion.type === 'fill-blank' && (
              <>
                <p className="text-lg">Fill in the blank:</p>
                <p className="text-xl font-medium italic">"{currentQuestion.options?.[0]}"</p>
              </>
            )}
            {currentQuestion.type === 'match-meaning' && (
              <>
                <p className="text-lg">Which phrasal verb means:</p>
                <p className="text-2xl font-bold">"{currentQuestion.verb.meaning}"</p>
              </>
            )}
          </div>

          {/* Answer Options */}
          {!showResult ? (
            <>
              {currentQuestion.type === 'fill-blank' ? (
                <div className="space-y-4">
                  <Input
                    placeholder="Type your answer (e.g., 'take off')"
                    value={selectedAnswer}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSubmitAnswer();
                      }
                    }}
                    className="text-center text-lg"
                  />
                  <Button 
                    onClick={handleSubmitAnswer} 
                    className="w-full"
                    disabled={!selectedAnswer.trim()}
                  >
                    Submit Answer
                  </Button>
                </div>
              ) : (
                <RadioGroup
                  value={selectedAnswer}
                  onValueChange={setSelectedAnswer}
                  className="space-y-3"
                >
                  {currentQuestion.type === 'multiple-choice' && currentQuestion.options?.map((option, index) => (
                    <div key={index}>
                      <Label
                        htmlFor={`option-${index}`}
                        className={cn(
                          "flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all hover:bg-muted",
                          selectedAnswer === option && "border-primary bg-primary/5"
                        )}
                      >
                        <RadioGroupItem value={option} id={`option-${index}`} className="mr-3" />
                        <span>{option}</span>
                      </Label>
                    </div>
                  ))}
                  {currentQuestion.type === 'match-meaning' && currentQuestion.options?.map((option, index) => (
                    <div key={index}>
                      <Label
                        htmlFor={`option-${index}`}
                        className={cn(
                          "flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all hover:bg-muted",
                          selectedAnswer === option && "border-primary bg-primary/5"
                        )}
                      >
                        <RadioGroupItem value={option} id={`option-${index}`} className="mr-3" />
                        <span className="font-semibold">{option}</span>
                      </Label>
                    </div>
                  ))}
                  <Button 
                    onClick={handleSubmitAnswer} 
                    className="w-full mt-4"
                    disabled={!selectedAnswer}
                  >
                    Submit Answer
                  </Button>
                </RadioGroup>
              )}
            </>
          ) : (
            // Show result
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-4"
            >
              {selectedAnswer === currentQuestion.correctAnswer ||
              (currentQuestion.type === 'fill-blank' && 
               selectedAnswer.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase()) ? (
                <div className="space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  </div>
                  <p className="text-xl font-semibold text-emerald-600">Correct!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-rose-100 flex items-center justify-center">
                    <XCircle className="w-8 h-8 text-rose-600" />
                  </div>
                  <p className="text-xl font-semibold text-rose-600">Not quite right</p>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Correct answer:</p>
                    <p className="text-lg font-semibold">{currentQuestion.correctAnswer}</p>
                  </div>
                </div>
              )}

              <Button onClick={handleNextQuestion} className="w-full gap-2">
                {currentIndex < questions.length - 1 ? (
                  <>
                    Next Question
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    See Results
                    <Trophy className="w-4 h-4" />
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
