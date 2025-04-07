
import React from 'react';
import { Skip } from '../types/skip';

interface SelectedSummaryProps {
  selectedSkip: Skip | null;
  onBack: () => void;
  onContinue: () => void;
}

const SelectedSummary: React.FC<SelectedSummaryProps> = ({ 
  selectedSkip, 
  onBack, 
  onContinue 
}) => {
  if (!selectedSkip) return null;
  
  const priceWithVat = ((selectedSkip.price_before_vat || 0) * 1.2).toFixed(2);
  
  return (
    <div className="selected-summary fixed bottom-0 left-0 right-0 bg-card shadow-lg p-4 border-t">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-left">
          <h3 className="font-semibold">
            Selected: {selectedSkip.size} Yard Skip
          </h3>
          <p className="text-muted-foreground">
            £{priceWithVat} • {selectedSkip.hire_period_days} day hire period
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={onBack}
            className="px-6 py-2 rounded-md border border-skip-primary text-skip-primary hover:bg-skip-primary/10"
          >
            Back
          </button>
          <button 
            onClick={onContinue}
            className="px-6 py-2 rounded-md bg-skip-primary text-white hover:bg-blue-600"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectedSummary;
