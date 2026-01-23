import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Post } from '../types';
import { Share2, Clock, Tag, User } from 'lucide-react';

const mockContent = `
# The Raw Aesthetic of Now

Graphic design in Indonesia is experiencing a renaissance of "anti-design". We are seeing a move away from the polished, corporate aesthetics of the 2010s towards something more visceral, tactile, and honest.

> "Perfection is boring. Glitches are the soul of the machine."

## The Return of the Grid

While chaotic, the new wave respects the grid by breaking it intentionally. It's not about lack of structure, but the hyper-awareness of structure.

The streets of Bandung and Jakarta are filled with photocopied gig posters, zines, and stickers that utilize high-contrast imagery, dithered bitmaps, and stretched typography.

### Tools of the Trade
*   Xerox Machines
*   Scanner Glitches
*   Risograph
*   System Fonts (Arial, Times New Roman)

This is not just nostalgia. It is a reaction to the AI-generated smoothness that is beginning to flood our feeds. We crave friction. We crave ink that bleeds.
`;

const Article: React.FC = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      if (isSupabaseConfigured() && slug) {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('slug', slug)
          .single();
        
        if (data) setPost(data as Post);
      } else {
        // Mock data
        setTimeout(() => {
          setPost({
            id: 99,
            title: slug?.replace('-', ' ').toUpperCase() || "UNKNOWN ARTICLE",
            slug: slug || "unknown",
            created_at: new Date().toISOString(),
            category: "Music",
            author: "Tandang_Admin",
            excerpt: "A deep look into the subject.",
            content: mockContent,
            cover_image_url: "https://picsum.photos/1200/800",
            is_published: true
          });
        }, 500);
      }
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  if (loading) return <div className="p-20 font-mono text-center">LOADING DATA...</div>;
  if (!post) return <div className="p-20 font-mono text-center text-red-600">POST NOT FOUND. 404.</div>;

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Sidebar - Sticky */}
      <aside className="w-full md:w-[30%] md:h-screen md:sticky md:top-[50px] border-b-2 md:border-b-0 md:border-r-2 border-black bg-raw-paper p-6 md:p-10 flex flex-col justify-between">
        <div>
          <div className="mb-8">
             <Link to="/archive" className="font-mono text-xs underline hover:bg-black hover:text-white transition-colors">← BACK TO ARCHIVE</Link>
          </div>
          
          <Link 
            to={`/archive?category=${post.category}`}
            className="inline-block bg-black text-high-yellow px-3 py-1 font-mono text-sm uppercase tracking-widest mb-4 border border-transparent hover:bg-white hover:text-black hover:border-black transition-all"
          >
            {post.category}
          </Link>
          
          <h1 className="text-5xl md:text-6xl font-sans font-bold leading-[0.9] uppercase mb-8 break-words">
            {post.title}
          </h1>

          <div className="font-mono text-sm space-y-4 border-t border-black pt-4">
            <div className="flex items-center gap-2 font-bold text-lg">
                <User size={18} />
                <span className="uppercase">{post.author || 'UNKNOWN_AGENT'}</span>
            </div>
            <div className="flex items-center gap-2 opacity-70">
              <Clock size={16} />
              <span>{new Date(post.created_at).toLocaleDateString('en-GB')}</span>
            </div>
            <div className="flex items-center gap-2 opacity-70">
              <Tag size={16} />
              <span>{post.slug}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-0">
          <button className="flex items-center gap-2 border-2 border-black px-4 py-2 hover:bg-high-yellow transition-colors font-bold uppercase text-sm w-full justify-center shadow-[4px_4px_0px_0px_#000]">
            <Share2 size={16} /> Share This
          </button>
        </div>
      </aside>

      {/* Right Content - Scrollable */}
      <article className="w-full md:w-[70%] bg-white">
        {/* Hero Image */}
        <div className="w-full h-[40vh] md:h-[60vh] border-b-2 border-black overflow-hidden relative">
            <img src={post.cover_image_url || ''} className="w-full h-full object-cover contrast-125" alt="cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-20"></div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-16 max-w-4xl mx-auto">
            <p className="font-serif text-2xl md:text-3xl leading-relaxed mb-12 border-l-4 border-high-yellow pl-6 italic font-bold">
                {post.excerpt}
            </p>

            <div className="prose prose-xl prose-headings:font-sans prose-headings:uppercase prose-headings:tracking-tighter prose-p:font-mono prose-p:text-base md:prose-p:text-lg prose-blockquote:bg-high-yellow prose-blockquote:border-black prose-blockquote:border-2 prose-blockquote:p-6 prose-blockquote:not-italic prose-blockquote:font-bold prose-img:border-2 prose-img:border-black prose-img:shadow-[8px_8px_0px_0px_#000] prose-a:text-blue-600 hover:prose-a:bg-blue-600 hover:prose-a:text-white max-w-none">
               {/* 
                  In a real app, use a markdown parser like 'react-markdown'. 
                  For this demo, we're rendering raw text or simple HTML replacement 
               */}
               {post.content.split('\n').map((line, i) => {
                 if (line.startsWith('# ')) return <h1 key={i}>{line.replace('# ', '')}</h1>
                 if (line.startsWith('## ')) return <h2 key={i}>{line.replace('## ', '')}</h2>
                 if (line.startsWith('> ')) return <blockquote key={i}>{line.replace('> ', '')}</blockquote>
                 if (line.startsWith('* ')) return <li key={i} className="list-disc ml-4">{line.replace('* ', '')}</li>
                 if (line.length === 0) return <br key={i}/>
                 return <p key={i}>{line}</p>
               })}
            </div>
        </div>
      </article>
    </div>
  );
};

export default Article;