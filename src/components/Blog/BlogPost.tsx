import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { MainLayout } from '../Layout/MainLayout';
import { SocialShare } from '../SocialShare';
import { ReadingProgress } from './ReadingProgress';
import { BlogHeader } from './BlogHeader';
import { BlogAuthor } from './BlogAuthor';
import { posts } from '../../data/posts';
import { calculateReadingTime } from '../../utils/readingUtils';
import { CaseCategory } from '../../types';

export const BlogPost: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [viewCount, setViewCount] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<CaseCategory | null>(null);
  
  const post = posts.find(p => p.id === Number(id));
  
  useEffect(() => {
    if (post) {
      setViewCount(Math.floor(Math.random() * 1000) + 100);

      const handleScroll = () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [post]);

  if (!post) {
    return (
      <MainLayout currentCategory={selectedCategory} onNavigate={setSelectedCategory}>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-600">Blog yazısı bulunamadı.</p>
        </div>
      </MainLayout>
    );
  }

  const readingTime = calculateReadingTime(post.content);

  const handleCategoryClick = (category: CaseCategory) => {
    setSelectedCategory(category);
    navigate('/');
  };

  return (
    <MainLayout currentCategory={selectedCategory} onNavigate={setSelectedCategory}>
      <Helmet>
        <title>{post.title} | PDR Portal</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content="Dr. Ayşe Yılmaz" />
        <meta property="article:section" content={post.category} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image} />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <ReadingProgress progress={scrollProgress} />
      
      <article className="max-w-4xl mx-auto px-4 py-12">
        <nav className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            Geri Dön
          </button>
          <SocialShare
            url={window.location.href}
            title={post.title}
          />
        </nav>

        <BlogHeader
          title={post.title}
          image={post.image}
          date={post.date}
          readingTime={readingTime}
          viewCount={viewCount}
          content={post.content}
        />

        <BlogAuthor 
          category={post.category}
          onCategoryClick={handleCategoryClick}
        />

        <div className="prose max-w-none mt-8">
          {post.content}
        </div>
      </article>
    </MainLayout>
  );
};