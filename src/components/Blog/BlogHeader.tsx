import React from 'react';
import { Clock, Eye, Calendar, BookOpen, User, MapPin } from 'lucide-react';
import { formatTimestamp } from '../../utils/dateUtils';

interface BlogHeaderProps {
  title: string;
  image: string;
  date: string;
  readingTime: number;
  viewCount: number;
  content: string;
}

export const BlogHeader: React.FC<BlogHeaderProps> = ({
  title,
  image,
  date,
  readingTime,
  viewCount,
  content
}) => {
  return (
    <header className="mb-12">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-[400px] object-cover rounded-2xl shadow-xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl" />
      </div>
      
      <div className="mt-8">
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>{readingTime} dk okuma</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm">
            <Eye className="w-4 h-4 text-green-600" />
            <span>{viewCount} görüntülenme</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm">
            <Calendar className="w-4 h-4 text-purple-600" />
            <span>{formatTimestamp(date)}</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm">
            <BookOpen className="w-4 h-4 text-orange-600" />
            <span>{Math.ceil(content.length / 1000)} sayfa</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-6">{title}</h1>
      </div>
    </header>
  );
};