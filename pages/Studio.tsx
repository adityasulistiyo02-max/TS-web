import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { Upload, Lock, Save, LogOut, Terminal, AlertTriangle, Image as ImageIcon } from 'lucide-react';

const Studio: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>('READY_TO_TRANSMIT');
  
  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Musik');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Check auth session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'github' });
    if (error) alert('Error logging in: ' + error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      setStatusMessage('UPLOADING_BINARY_DATA...');
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('images').getPublicUrl(filePath);
      setImageUrl(data.publicUrl);
      setStatusMessage('IMAGE_SECURED. READY.');
    } catch (error: any) {
      alert('Error uploading image: ' + error.message);
      setStatusMessage('UPLOAD_FAILED');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('INITIATING_DATABASE_INJECTION...');

    try {
        const { error } = await supabase.from('posts').insert([
            {
                title,
                slug,
                category,
                excerpt,
                content,
                cover_image_url: imageUrl,
                is_published: true
            }
        ]);
        if (error) throw error;
        
        setStatusMessage('TRANSMISSION_COMPLETE.');
        
        // Small delay to read the success message
        setTimeout(() => {
           navigate(`/article/${slug}`);
        }, 1000);

    } catch (err: any) {
        alert('Error: ' + err.message);
        setStatusMessage('FATAL_ERROR: TRANSMISSION_FAILED');
        setLoading(false);
    }
  };

  // Auth Guard
  if (!user) {
    return (
      <div className="min-h-screen bg-raw-black flex flex-col items-center justify-center p-4">
        <div className="border-4 border-white bg-black p-8 md:p-12 max-w-lg w-full shadow-[12px_12px_0px_0px_#ffffff] text-center text-white">
          <AlertTriangle className="mx-auto mb-6 w-16 h-16 text-high-yellow animate-pulse" />
          <h1 className="text-5xl font-sans font-black mb-2 tracking-tighter">RESTRICTED</h1>
          <div className="h-1 w-full bg-white mb-6"></div>
          <p className="font-mono text-sm mb-8 text-left leading-relaxed">
            > ACCESS_DENIED<br/>
            > SECURITY_LEVEL: ULTRA<br/>
            > IDENTIFICATION_REQUIRED
          </p>
          <button 
            onClick={handleLogin}
            className="w-full bg-white text-black font-mono font-bold text-xl py-4 hover:bg-high-yellow transition-colors border-2 border-transparent hover:border-white uppercase"
          >
            [ AUTHENTICATE_USER ]
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-raw-black text-white font-mono p-4 md:p-8 pt-[80px]">
      
      {/* Header Bar */}
      <div className="max-w-6xl mx-auto border-b-2 border-white pb-6 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-2 text-high-yellow mb-2">
            <Terminal size={20} />
            <span className="text-xs tracking-[0.2em] uppercase">System_Mode: Write</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-sans font-black tracking-tighter uppercase leading-none">
            Data_Entry_Terminal
          </h1>
        </div>
        
        <div className="flex flex-col items-end gap-2">
            <div className="bg-white text-black px-2 py-1 text-xs font-bold">
                USER: {user.email}
            </div>
            <button 
                onClick={handleLogout} 
                className="flex items-center gap-2 text-xs hover:text-high-yellow hover:underline decoration-2 underline-offset-4"
            >
                <LogOut size={12} /> TERMINATE_SESSION
            </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        
        {/* Left Column: Meta Data */}
        <div className="lg:col-span-1 space-y-8">
            
            {/* Status Monitor */}
            <div className="border-2 border-white p-4 bg-black relative">
                <div className="absolute top-0 left-0 bg-white text-black px-2 py-1 text-xs font-bold uppercase transform -translate-y-1/2 ml-4">
                    System_Status
                </div>
                <div className={`font-mono text-sm ${loading ? 'animate-pulse text-high-yellow' : 'text-gray-400'}`}>
                    > {statusMessage}
                    <span className="animate-pulse">_</span>
                </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-gray-400">Target_Sector</label>
                <div className="relative">
                    <select 
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        className="w-full bg-black text-white border-2 border-white p-4 font-mono appearance-none focus:bg-high-yellow focus:text-black focus:outline-none transition-colors rounded-none cursor-pointer"
                    >
                        <option value="Musik">MUSIK</option>
                        <option value="Visual">VISUAL</option>
                        <option value="Event">EVENT</option>
                        <option value="Journal">JOURNAL</option>
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        ▼
                    </div>
                </div>
            </div>

            {/* Slug */}
            <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-gray-400">Unique_Identifier (Slug)</label>
                <input 
                    type="text" 
                    value={slug}
                    onChange={e => setSlug(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-white/30 text-gray-400 p-2 font-mono text-sm focus:border-high-yellow focus:text-high-yellow focus:outline-none rounded-none"
                    required
                />
            </div>

            {/* Image Upload */}
            <div className="space-y-2 pt-4 border-t border-white/20">
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Visual_Asset_Injection</label>
                
                <div className="relative group cursor-pointer">
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    
                    <div className={`
                        border-2 border-dashed border-white p-8 text-center transition-all
                        ${imageUrl ? 'bg-black' : 'hover:bg-white/10'}
                    `}>
                        {imageUrl ? (
                            <img src={imageUrl} alt="Preview" className="w-full h-auto max-h-[200px] object-cover border border-white filter contrast-125" />
                        ) : (
                            <div className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-white">
                                <ImageIcon size={32} />
                                <span className="text-xs">DROP_FILE_OR_CLICK</span>
                            </div>
                        )}
                    </div>
                </div>
                {uploading && <div className="h-1 w-full bg-white animate-pulse mt-2"></div>}
            </div>

        </div>

        {/* Right Column: Content */}
        <div className="lg:col-span-2 space-y-8">
            
            {/* Title */}
            <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-gray-400">Transmission_Header</label>
                <input 
                    type="text" 
                    value={title}
                    onChange={e => {
                        setTitle(e.target.value);
                        // Auto-slug logic
                        setSlug(e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''));
                    }}
                    className="w-full bg-transparent border-2 border-white p-6 font-sans text-3xl md:text-5xl font-bold uppercase focus:bg-white focus:text-black focus:outline-none transition-colors placeholder-white/20"
                    placeholder="ENTER_TITLE_HERE"
                    required
                />
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-gray-400">Briefing (Excerpt)</label>
                <textarea 
                    value={excerpt}
                    onChange={e => setExcerpt(e.target.value)}
                    rows={3}
                    className="w-full bg-transparent border-2 border-white p-4 font-mono focus:bg-white focus:text-black focus:outline-none transition-colors placeholder-white/20 resize-none"
                    placeholder="> Short summary of the transmission..."
                />
            </div>

            {/* Content Area */}
            <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-gray-400">Main_Payload (Markdown)</label>
                <textarea 
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    rows={20}
                    className="w-full bg-transparent border-2 border-white p-4 font-mono text-sm leading-relaxed focus:bg-white/10 focus:outline-none focus:border-high-yellow transition-colors placeholder-white/20 resize-y"
                    placeholder="# WRITE_CONTENT_HERE..."
                    required
                />
            </div>

            {/* Actions */}
            <div className="pt-8 flex justify-end">
                <button 
                    type="submit" 
                    disabled={loading || uploading}
                    className={`
                        bg-white text-black font-sans text-2xl font-black py-6 px-12 uppercase tracking-tighter
                        hover:bg-high-yellow hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_#ffffff]
                        transition-all border-2 border-transparent hover:border-black
                        disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                >
                    {loading ? 'PROCESSING...' : '[ UPLOAD_TO_NETWORK ]'}
                </button>
            </div>

        </div>

      </form>
    </div>
  );
};

export default Studio;