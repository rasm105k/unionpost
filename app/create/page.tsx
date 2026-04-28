'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreatePostPage() {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState<'post' | 'highlight' | 'result' | 'news'>('post');
  const [media, setMedia] = useState<string | null>(null);

  const postTypes = [
    { id: 'post', icon: '📝', label: 'Opslag' },
    { id: 'highlight', icon: '🎬', label: 'Highlight' },
    { id: 'result', icon: '⚽', label: 'Resultat' },
    { id: 'news', icon: '📰', label: 'Nyhed' },
  ];

  const handleSubmit = () => {
    // Here you would submit to the database
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[var(--border)]">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-[var(--muted)]">Fortryd</Link>
          <h1 className="font-semibold">Nyt opslag</h1>
          <button 
            onClick={handleSubmit}
            disabled={!content.trim()}
            className={`btn ${content.trim() ? 'btn-primary' : 'btn-secondary'}`}
          >
            Del
          </button>
        </div>
      </header>

      <main className="pt-16 p-4 space-y-4">
        {/* Post Type Selector */}
        <div className="flex gap-2 overflow-x-auto scroll-container pb-2">
          {postTypes.map(type => (
            <button
              key={type.id}
              onClick={() => setPostType(type.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap ${
                postType === type.id 
                  ? 'bg-[var(--primary)] text-white' 
                  : 'bg-[var(--muted-light)] text-[var(--foreground)]'
              }`}
            >
              <span>{type.icon}</span>
              <span className="text-sm">{type.label}</span>
            </button>
          ))}
        </div>

        {/* Content Input */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Hvad vil du dele?"
          className="w-full min-h-[150px] p-4 text-lg border-0 resize-none focus:outline-none"
        />

        {/* Media Preview */}
        {media && (
          <div className="relative rounded-lg overflow-hidden">
            <img src={media} alt="Media preview" className="w-full aspect-video object-cover" />
            <button 
              onClick={() => setMedia(null)}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center"
            >
              ✕
            </button>
          </div>
        )}

        {/* Media Options */}
        <div className="grid grid-cols-4 gap-2">
          <label className="drop-zone">
            <input type="file" accept="image/*,video/*" className="hidden" />
            <span className="text-2xl">📷</span>
          </label>
          <label className="drop-zone">
            <input type="file" accept="video/*" className="hidden" />
            <span className="text-2xl">🎬</span>
          </label>
          <label className="drop-zone">
            <input type="file" accept="image/*" className="hidden" />
            <span className="text-2xl">📷</span>
          </label>
          <label className="drop-zone">
            <input type="file" accept="image/*" className="hidden" />
            <span className="text-2xl">🎯</span>
          </label>
        </div>

        {/* Post Options */}
        <div className="space-y-3 pt-4 border-t border-[var(--border)]">
          <p className="text-sm font-semibold text-[var(--muted)]">Post indstillinger</p>
          
          <label className="flex items-center justify-between p-3 rounded-lg bg-[var(--muted-light)]">
            <span className="flex items-center gap-2">
              <span>🌎</span>
              <span className="text-sm">Offentlig</span>
            </span>
            <span className="text-[var(--muted)]">▼</span>
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg bg-[var(--muted-light)]">
            <span className="flex items-center gap-2">
              <span>💬</span>
              <span className="text-sm">Tillad kommentarer</span>
            </span>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-[var(--primary)]" />
          </label>
        </div>
      </main>
    </div>
  );
}