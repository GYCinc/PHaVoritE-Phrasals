import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  RotateCw, 
  CheckCircle2, 
  XCircle, 
  Volume2,
  ChevronLeft,
  ChevronRight,
  Brain,
  Target
} from 'lucide-react';
import type { PhrasalVerb } from '@/data/phaveList';
import { cn } from '@/lib/utils';

interface FlashcardProps {
  verbs: PhrasalVerb[];
  currentIndex: number;
  onNext: () => void;
  onPrevious: () => void;
  onMarkKnown: (known: boolean) => void;
  progress: Record<string, { mastered: boolean; timesReviewed: number }>;
}

export function Flashcard({
  verbs,
  currentIndex,
  onNext,
  onPrevious,
  onMarkKnown,
  progress,
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(0);

  const currentVerb = verbs[currentIndex];
  const verbProgress = progress[currentVerb?.id];
  const isMastered = verbProgress?.mastered || false;
  const reviewCount = verbProgress?.timesReviewed || 0;

  const handleFlip = useCallback(() => {
    setIsFlipped(!isFlipped);
  }, [isFlipped]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setIsFlipped(false);
    setTimeout(onNext, 150);
  }, [onNext]);

  const handlePrevious = useCallback(() => {
    setDirection(-1);
    setIsFlipped(false);
    setTimeout(onPrevious, 150);
  }, [onPrevious]);

  const handleKnown = useCallback(() => {
    onMarkKnown(true);
    handleNext();
  }, [onMarkKnown, handleNext]);

  const handleUnknown = useCallback(() => {
    onMarkKnown(false);
    handleNext();
  }, [onMarkKnown, handleNext]);

  const speakVerb = useCallback(() => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(`${currentVerb.verb} ${currentVerb.particle}`);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  }, [currentVerb]);

  const speakExample = useCallback(() => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentVerb.example);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  }, [currentVerb]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'intermediate':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      case 'advanced':
        return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Progress Bar */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Card {currentIndex + 1} of {verbs.length}</span>
        <div className="flex items-center gap-2">
          {isMastered && (
            <Badge variant="default" className="bg-emerald-500">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Mastered
            </Badge>
          )}
          <span>{reviewCount} reviews</span>
        </div>
      </div>
      <Progress value={((currentIndex + 1) / verbs.length) * 100} className="h-2" />

      {/* Flashcard */}
      <div className="relative h-96 perspective-1000">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentVerb.id + (isFlipped ? '-back' : '-front')}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -50 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            <Card 
              className={cn(
                "h-full cursor-pointer transition-all duration-500 transform-gpu",
                isFlipped && "rotate-y-180"
              )}
              onClick={handleFlip}
            >
              <CardContent className="h-full flex flex-col items-center justify-center p-8 text-center">
                {!isFlipped ? (
                  // Front of card
                  <div className="space-y-6">
                    <div className="flex items-center justify-center gap-2">
                      <Badge className={getDifficultyColor(currentVerb.difficulty)}>
                        {currentVerb.difficulty}
                      </Badge>
                      <Badge variant="outline">{currentVerb.category}</Badge>
                    </div>
                    <h2 className="text-5xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                      {currentVerb.verb} {currentVerb.particle}
                    </h2>
                    <p className="text-muted-foreground">Tap to reveal meaning</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        speakVerb();
                      }}
                    >
                      <Volume2 className="w-4 h-4 mr-2" />
                      Listen
                    </Button>
                  </div>
                ) : (
                  // Back of card
                  <div className="space-y-6 rotate-y-180">
                    <h3 className="text-2xl font-semibold text-foreground">
                      {currentVerb.meaning}
                    </h3>
                    <div className="space-y-3 text-left">
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Example:</p>
                        <p className="text-foreground italic">"{currentVerb.example}"</p>
                      </div>
                      {currentVerb.example2 && (
                        <div className="bg-muted p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Another example:</p>
                          <p className="text-foreground italic">"{currentVerb.example2}"</p>
                        </div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        speakExample();
                      }}
                    >
                      <Volume2 className="w-4 h-4 mr-2" />
                      Listen to example
                    </Button>
                    {currentVerb.synonyms && currentVerb.synonyms.length > 0 && (
                      <div className="pt-2 border-t">
                        <p className="text-sm text-muted-foreground">Synonyms:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {currentVerb.synonyms.map((syn, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {syn}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <Button
          variant="outline"
          onClick={handleFlip}
          className="gap-2"
        >
          <RotateCw className="w-4 h-4" />
          Flip Card
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          disabled={currentIndex === verbs.length - 1}
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Knowledge Check */}
      <div className="flex items-center justify-center gap-4 pt-4 border-t">
        <span className="text-sm text-muted-foreground">Did you know this?</span>
        <Button
          variant="default"
          className="gap-2 bg-emerald-600 hover:bg-emerald-700"
          onClick={handleKnown}
        >
          <Brain className="w-4 h-4" />
          Yes, I knew it
        </Button>
        <Button
          variant="default"
          className="gap-2 bg-rose-600 hover:bg-rose-700"
          onClick={handleUnknown}
        >
          <Target className="w-4 h-4" />
          Need to learn
        </Button>
      </div>
    </div>
  );
}
