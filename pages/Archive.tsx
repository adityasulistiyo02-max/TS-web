import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Post, Category } from '../types';

const categories: Category[] = ['All', 'Music', 'Visual', 'Event'];

const Archive: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categories.includes(categoryParam as any)) {
      setActiveCategory(categoryParam as Category);
    }
  }, [searchParams]);

  useEffect(() => {
    // Mock fetch or Real Fetch
    const fetch = async () => {
        if (isSupabaseConfigured()) {
            let query = supabase.from('posts').select('*').eq('is_published', true).order('created_at', { ascending: false });
            if (activeCategory !== 'All') {
                query = query.eq('category', activeCategory);
            }
            const { data } = await query;
            if (data) setPosts(data as Post[]);
        } else {
             // Mock Data Generator
             const mock = Array.from({ length: 15 }).map((_, i) => ({
                id: i,
                created_at: new Date(Date.now() - i * 86400000).toISOString(),
                title: `ARCHIVE ENTRY #00${i} - ${activeCategory === 'All' ? 'GENERAL' : activeCategory.toUpperCase()} TOPIC`,
                slug: `archive-${i}`,
                category: activeCategory === 'All' ? (['Music', 'Visual', 'Event'][i % 3]) : activeCategory,
                author: `Agent_00${i}`,
                content: '', excerpt: '', cover_image_url: '', is_published: true
             }));
             setPosts(mock as Post[]);
        }
    }
    fetch();
  }, [activeCategory]);

  return (
    <div className="bg-raw-paper min-h-screen p-4 md:p-8">
      <h1 className="text-6xl md:text-9xl font-sans font-black uppercase mb-8 tracking-tighter">Archive_Directory</h1>

      {/* Tabs */}
      <div className="flex space-x-2 overflow-x-auto border-b-2 border-black pb-0">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`
              px-8 py-3 font-mono font-bold text-lg border-t-2 border-l-2 border-r-2 border-black rounded-t-lg transition-all
              ${activeCategory === cat 
                ? 'bg-high-yellow text-black -mb-[2px] pb-[14px] z-10' 
                : 'bg-white text-gray-500 hover:bg-gray-100'}
            `}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Table List */}
      <div className="bg-white border-2 border-t-0 border-black min-h-[500px] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
            <thead>
                <tr className="border-b-2 border-black bg-black text-white font-mono uppercase text-sm">
                    <th className="p-4 w-24">ID</th>
                    <th className="p-4 w-32">Date</th>
                    <th className="p-4">Title</th>
                    <th className="p-4 w-32">Category</th>
                    <th className="p-4 w-32">Writer</th>
                    <th className="p-4 w-24 text-right">Action</th>
                </tr>
            </thead>
            <tbody>
                {posts.map((post) => (
                    <tr key={post.id} className="border-b border-black hover:bg-high-yellow transition-colors group cursor-pointer font-mono">
                        <td className="p-4 opacity-50">#{String(post.id).padStart(3, '0')}</td>
                        <td className="p-4">{new Date(post.created_at).toLocaleDateString()}</td>
                        <td className="p-4 font-bold font-sans text-xl uppercase tracking-wide group-hover:underline decoration-2 underline-offset-2">
                            <Link to={`/article/${post.slug}`} className="block w-full h-full">
                                {post.title}
                            </Link>
                        </td>
                        <td className="p-4">
                            <span className="border border-black px-2 py-1 text-xs bg-white">
                                {post.category}
                            </span>
                        </td>
                        <td className="p-4 text-sm opacity-80">
                            {post.author || 'UNKNOWN'}
                        </td>
                        <td className="p-4 text-right">
                            <Link to={`/article/${post.slug}`} className="text-2xl group-hover:translate-x-1 inline-block transition-transform">
                                →
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default Archive;