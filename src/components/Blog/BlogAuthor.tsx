import React from 'react';
import { User, Tag } from 'lucide-react';
import { CaseCategory } from '../../types';

interface BlogAuthorProps {
  category: CaseCategory;
  onCategoryClick: (category: CaseCategory) => void;
}

export const BlogAuthor: React.FC<BlogAuthorProps> = ({ category, onCategoryClick }) => {
  const categoryColors: Record<string, string> = {
    bireysel: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    aile: 'bg-green-100 text-green-800 hover:bg-green-200',
    okul: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
    kariyer: 'bg-orange-100 text-orange-800 hover:bg-orange-200'
  };

  return (
    <div className="flex items-center justify-between py-4 border-t border-gray-200">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-gray-900 font-medium">Dr. Ayşe Yılmaz</p>
          <p className="text-sm text-gray-600">Uzman Psikolojik Danışman</p>
        </div>
      </div>
      <button
        onClick={() => onCategoryClick(category)}
        className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-colors cursor-pointer ${categoryColors[category]}`}
      >
        <Tag className="w-4 h-4" />
        {category}
      </button>
    </div>
  );
};