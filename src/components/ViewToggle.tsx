
import React from 'react';
import { LayoutGrid, List } from 'lucide-react';

interface ViewToggleProps {
  view: 'grid' | 'list';
  setView: (view: 'grid' | 'list') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ view, setView }) => {
  return (
    <div className="inline-flex bg-background border rounded-md overflow-hidden">
      <button
        className={`px-3 py-2 transition-colors ${
          view === 'grid' ? 'bg-primary text-white' : 'hover:bg-secondary'
        }`}
        onClick={() => setView('grid')}
        aria-label="Grid view"
      >
        <LayoutGrid className="h-5 w-5" />
      </button>
      <button
        className={`px-3 py-2 transition-colors ${
          view === 'list' ? 'bg-primary text-white' : 'hover:bg-secondary'
        }`}
        onClick={() => setView('list')}
        aria-label="List view"
      >
        <List className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ViewToggle;
