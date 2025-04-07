
import React from 'react';
import { Skip } from '../types/skip';

interface SkipCardProps {
  skip: Skip;
  isSelected: boolean;
  onSelect: (skip: Skip) => void;
  viewMode: 'grid' | 'list';
}

const SkipCard: React.FC<SkipCardProps> = ({ skip, isSelected, onSelect, viewMode }) => {
  const { size, price_before_vat, allowed_on_road, hire_period_days } = skip;
  
  const basePrice = price_before_vat || 0;
  const priceWithVat = (basePrice * 1.2).toFixed(2);
  
  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'BUTTON') {
      return;
    }
    onSelect(skip);
  };
  
  return (
    <div 
      className={`select-skip-card rounded-xl shadow-md overflow-hidden bg-card hover:shadow-lg transition-all duration-300 relative ${
        isSelected ? 'ring-2 ring-skip-primary' : ''
      } ${viewMode === 'grid' ? 'flex flex-col' : 'flex flex-row'}`}
      onClick={handleCardClick}
    >
      <div className="card-badge">
        <span className="text-sm font-semibold px-2 py-1 rounded-md bg-blue-500 text-white">
          {size} yard
        </span>
      </div>
      
      <div className={`${viewMode === 'grid' ? 'p-6' : 'p-6 flex-1'}`}>
        <h3 className="text-xl font-bold">{size} Yard Skip</h3>
        <p className="text-muted-foreground mt-1">{hire_period_days} day hire period</p>
        
        {!allowed_on_road && (
          <div className="mt-2 inline-block bg-red-100 text-red-600 px-2.5 py-1 rounded-md text-xs font-medium">
            Private Property Only
          </div>
        )}
      </div>
      
      <div className={`${viewMode === 'grid' ? 'px-6 pb-6 mt-auto' : 'p-6 flex flex-col justify-center'}`}>
        <div className="flex flex-col items-center space-y-2">
          <p className="text-2xl font-bold text-skip-primary">
            £{priceWithVat} <span className="text-sm font-normal text-muted-foreground">per week</span>
          </p>
          
          <button
            className={`w-full rounded-md px-4 py-2 transition-colors ${
              isSelected 
                ? 'bg-green-500 text-white hover:bg-green-600' 
                : 'bg-skip-primary text-white hover:bg-blue-600'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(skip);
            }}
          >
            {isSelected ? 'Selected' : 'Select This Skip'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkipCard;
