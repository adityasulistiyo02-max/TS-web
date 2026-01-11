import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Post } from '../types';
import { ArrowUpRight, Loader2 } from 'lucide-react';

const mockPosts: Post[] = [
  { id: 1, created_at: new Date().toISOString(), title: "NOISE ARCHITECTURE", slug: "noise-architecture", content: "...", excerpt: "Exploring the brutalist sounds of downtown Jakarta.", cover_image_url: "https://picsum.photos/800/800?random=1", category: "Music", is_published: true },
  { id: 2, created_at: new Date().toISOString(), title: "VISUAL RIOT 2024", slug: "visual-riot", content: "...", excerpt: "A retrospective on photocopy art culture.", cover_image_url: "https://picsum.photos/600/800?random=2", category: "Visual", is_published: true },
  { id: 3, created_at: new Date().toISOString(), title: "UNDERGROUND TYPES", slug: "underground-types", content: "...", excerpt: "Why Helvetica is dead and what comes next.", cover_image_url: "https://picsum.photos/800/600?random=3", category: "Design", is_published: true },
  { id: 4, created_at: new Date().toISOString(), title: "SYNTH WAVES", slug: "synth-waves", content: "...", excerpt: "Analog modular synthesis in the digital age.", cover_image_url: "https://picsum.photos/700/700?random=4", category: "Music", is_published: true },
  { id: 5, created_at: new Date().toISOString(), title: "CONCRETE DREAMS", slug: "concrete-dreams", content: "...", excerpt: "Brutalism in web design.", cover_image_url: "https://picsum.photos/900/600?random=5", category: "Visual", is_published: true },
  { id: 6, created_at: new Date().toISOString(), title: "GLITCH PROTOCOL", slug: "glitch-protocol", content: "...", excerpt: "Embracing errors as an aesthetic choice.", cover_image_url: "https://picsum.photos/600/900?random=6", category: "Event", is_published: true },
];

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      if (isSupabaseConfigured()) {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('is_published', true)
          .order('created_at', { ascending: false })
          .limit(6);
        
        if (error) console.error(error);
        if (data && data.length > 0) {
            setPosts(data as Post[]);
        } else {
            setPosts(mockPosts);
        }
      } else {
        // Fallback for demo if no Supabase keys
        setTimeout(() => setPosts(mockPosts), 800);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center bg-white">
        <Loader2 className="animate-spin w-12 h-12 text-black" />
      </div>
    );
  }

  return (
    <div className="bg-black">
        {/* Bento / Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-black border-b-[2px] border-black">
            {posts.map((post, index) => {
                // Determine span for chaotic layout
                const isLarge = index === 0 || index === 3;
                const colSpan = isLarge ? 'md:col-span-2' : 'md:col-span-1';
                
                return (
                    <Link 
                        to={`/article/${post.slug}`} 
                        key={post.id}
                        className={`group relative bg-white overflow-hidden aspect-square ${colSpan} flex flex-col justify-between border-black hover:z-10`}
                    >
                        {/* Image Container */}
                        <div className="absolute inset-0 w-full h-full overflow-hidden">
                            <img 
                                src={post.cover_image_url || 'https://picsum.photos/600/600'} 
                                alt={post.title}
                                className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:grayscale-0 group-hover:invert"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-high-yellow/20 transition-colors duration-300 mix-blend-multiply"></div>
                        </div>

                        {/* Overlay Content */}
                        <div className="relative z-20 p-4 h-full flex flex-col justify-between pointer-events-none">
                            <div className="flex justify-between items-start">
                                <span className="bg-black text-white px-2 py-1 text-xs font-mono uppercase tracking-widest border border-white">
                                    {post.category}
                                </span>
                                <ArrowUpRight className="text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300" size={48} />
                            </div>

                            <div>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-white uppercase leading-[0.8] mb-2 mix-blend-difference">
                                    {post.title}
                                </h2>
                                <p className="font-mono text-xs text-white bg-black/50 inline-block px-1 backdrop-blur-sm">
                                    {new Date(post.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
        
        {/* Full width breakout section */}
        <div className="bg-high-yellow p-12 text-center border-y-2 border-black -mx-[calc(0.5rem+2px)] md:-mx-[calc(1rem+2px)]">
            <Link to="/archive" className="inline-block text-2xl font-bold font-mono border-2 border-black bg-white px-8 py-4 hover:bg-black hover:text-white transition-colors shadow-[6px_6px_0px_0px_#000000]">
                BROWSE FULL ARCHIVE
            </Link>
        </div>
    </div>
  );
};

export default Home;