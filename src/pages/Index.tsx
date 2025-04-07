import React, { useEffect, useState } from 'react';
import { fetchSkips } from '../services/skipService';
import { Skip } from '../types/skip';
import Logo from '../components/Logo';
import ThemeToggle from '../components/ThemeToggle';
import ViewToggle from '../components/ViewToggle';
import SkipCard from '../components/SkipCard';
import SelectedSummary from '../components/SelectedSummary';
import WaterRippleBackground from '../components/WaterRippleBackground';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { toast } = useToast();

  useEffect(() => {
    const loadSkips = async () => {
      try {
        setLoading(true);
        const data = await fetchSkips();
        setSkips(data.skips || []);
        setError(null);
      } catch (err) {
        setError('Failed to load skips. Please try again later.');
        toast({
          title: "Error",
          description: "Failed to load skips. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadSkips();
  }, [toast]);

  const handleSkipSelect = (skip: Skip) => {
    setSelectedSkip(selectedSkip?.id === skip.id ? null : skip);
  };

  const handleBack = () => {
    setSelectedSkip(null);
  };

  const handleContinue = () => {
    toast({
      title: "Processing Order",
      description: "Taking you to the next step...",
    });
    console.log('Continuing with skip:', selectedSkip);
  };

  return (
    <div className="min-h-screen pb-20">
      <WaterRippleBackground />
      
      <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-md border-b">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <Logo />
          <ThemeToggle />
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-skip-primary to-skip-secondary bg-clip-text text-transparent">
            Choose your Skip Size
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Select the skip size that best suits your needs
          </p>
        </div>
        
        <div className="flex justify-end mb-6">
          <ViewToggle view={viewMode} setView={setViewMode} />
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-skip-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {skips.map((skip) => (
              <SkipCard
                key={skip.id}
                skip={skip}
                isSelected={selectedSkip?.id === skip.id}
                onSelect={handleSkipSelect}
                viewMode={viewMode}
              />
            ))}
            
            {skips.length === 0 && (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">No skips available for this location.</p>
              </div>
            )}
          </div>
        )}
      </main>
      
      <SelectedSummary 
        selectedSkip={selectedSkip} 
        onBack={handleBack} 
        onContinue={handleContinue} 
      />
    </div>
  );
};

export default Index;
