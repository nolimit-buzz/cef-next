"use client";
import { useEffect, useState } from 'react';
import { Share2, Facebook, Twitter, Linkedin, Link as LinkIcon, Sun, Moon } from 'lucide-react';
import Breadcrumbs from './Breadcrumbs';
import { useParams, redirect } from "next/navigation";

import Link from "next/link";
import { articles } from '../data/articles';
import { cn } from '../lib/utils';

export const ArticlePage = () => {
  const params = useParams() as { id?: string };
  const id = params?.id;
  const article = articles.find(a => a.id === Number(id));
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    if (typeof window !== "undefined") window.location.href = "/"; return null;
  }

  const relatedArticles = articles.filter(a => a.id !== article.id).slice(0, 4);

  return (
    <main className={cn(
      "min-h-screen pt-[140px] pb-24 transition-colors duration-500",
      isDarkMode ? "bg-[var(--color-background)] text-white" : "bg-[#F4F4F6] text-[#1A1A1A]"
    )}>
      {/* Hero Section */}
      <article className="max-w-7xl mx-auto px-6">
        <div className="mb-8 flex items-center justify-between">
          <Breadcrumbs isDarkMode={isDarkMode} />

          {/* Dark Mode Toggle */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={cn("p-2 rounded-full border transition-colors", isDarkMode ? "border-white/10 text-white/60 hover:text-[var(--color-accent-green)]" : "border-[#1A1A1A]/10 text-[#1A1A1A]/60 hover:text-[var(--color-accent-green)]")}
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span 
              className={cn("px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest", isDarkMode ? "bg-[#101A33]" : "bg-white")}
              style={{ color: article.color, borderColor: `${article.color}40` }}
            >
              {article.category}
            </span>
            <span className={cn("text-sm font-medium", isDarkMode ? "text-white/50" : "text-[#1A1A1A]/50")}>{article.readTime}</span>
          </div>
          <h1 className={cn("text-[48px] font-medium leading-[1.15] mb-6 tracking-tight", isDarkMode ? "text-white" : "text-[#1A1A1A]")}>
            {article.title}
          </h1>
          <p className={cn("text-lg md:text-xl leading-relaxed max-w-3xl mx-auto font-light", isDarkMode ? "text-white/70" : "text-[#1A1A1A]/70")}>
            {article.deck}
          </p>
        </div>

        <div className="w-full h-[400px] md:h-[600px] rounded-2xl overflow-hidden mb-16 shadow-lg">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Left Sidebar - Meta */}
          <div className="lg:col-span-3 order-1 lg:order-1">
            <div className="sticky top-[100px] flex flex-col gap-8">
              <div>
                <h4 className={cn("text-xs font-bold uppercase tracking-widest mb-4", isDarkMode ? "text-white/40" : "text-[#1A1A1A]/40")}>Posted by</h4>
                <div className="flex items-center gap-3">
                  <img src={article.author.avatar} alt={article.author.name} className="w-10 h-10 rounded-full object-cover" />
                  <span className={cn("text-sm font-medium", isDarkMode ? "text-white" : "text-[#1A1A1A]")}>{article.author.name}</span>
                </div>
              </div>

              <div>
                <h4 className={cn("text-xs font-bold uppercase tracking-widest mb-4", isDarkMode ? "text-white/40" : "text-[#1A1A1A]/40")}>Theme</h4>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <span key={tag} className={cn("px-3 py-1 text-[10px] font-bold uppercase tracking-wider border rounded-full", isDarkMode ? "border-white/10 text-white/70 bg-[#101A33]" : "border-[#1A1A1A]/10 text-[#1A1A1A]/70 bg-white")}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className={cn("text-xs font-bold uppercase tracking-widest mb-4", isDarkMode ? "text-white/40" : "text-[#1A1A1A]/40")}>Key Context</h4>
                <p className={cn("text-sm italic leading-relaxed", isDarkMode ? "text-white/70" : "text-[#1A1A1A]/70")}>
                  {article.context}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Body */}
          <div className="lg:col-span-9 order-2 lg:order-2">
            <div 
              className={cn(
                "prose prose-lg max-w-3xl prose-headings:font-medium prose-headings:tracking-tight prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b prose-p:leading-[1.8] prose-p:font-light prose-p:mb-8 prose-p:first-of-type:text-xl prose-p:first-of-type:leading-relaxed prose-a:text-[var(--color-accent-green)] prose-blockquote:border-l-4 prose-blockquote:border-[var(--color-accent-green)] prose-blockquote:pl-6 prose-blockquote:font-medium prose-blockquote:italic prose-blockquote:text-2xl prose-blockquote:leading-snug prose-figure:my-16 prose-img:my-16 prose-img:rounded-2xl prose-figcaption:text-center prose-figcaption:text-sm prose-figcaption:italic",
                isDarkMode 
                  ? "prose-invert prose-headings:text-white prose-h2:border-white/10 prose-p:text-white/80 prose-p:first-of-type:text-white prose-blockquote:text-white prose-figcaption:text-white/50" 
                  : "prose-headings:text-[#1A1A1A] prose-h2:border-[#1A1A1A]/10 prose-p:text-[#1A1A1A]/80 prose-p:first-of-type:text-[#1A1A1A] prose-blockquote:text-[#1A1A1A] prose-figcaption:text-[#1A1A1A]/50"
              )}
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Share Row */}
            <div className={cn("mt-20 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl", isDarkMode ? "border-white/10" : "border-[#1A1A1A]/10")}>
              <div className="flex items-center gap-4">
                <span className={cn("text-sm font-medium flex items-center gap-2", isDarkMode ? "text-white/60" : "text-[#1A1A1A]/60")}>
                  <Share2 className="w-4 h-4" /> Share
                </span>
                <div className="flex items-center gap-2">
                  <button className={cn("w-8 h-8 rounded-full border flex items-center justify-center transition-colors", isDarkMode ? "bg-[#101A33] border-white/10 text-white/60 hover:text-[var(--color-accent-green)]" : "bg-white border-[#1A1A1A]/10 text-[#1A1A1A]/60 hover:text-[var(--color-accent-green)]")}>
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button className={cn("w-8 h-8 rounded-full border flex items-center justify-center transition-colors", isDarkMode ? "bg-[#101A33] border-white/10 text-white/60 hover:text-[var(--color-accent-green)]" : "bg-white border-[#1A1A1A]/10 text-[#1A1A1A]/60 hover:text-[var(--color-accent-green)]")}>
                    <Twitter className="w-4 h-4" />
                  </button>
                  <button className={cn("w-8 h-8 rounded-full border flex items-center justify-center transition-colors", isDarkMode ? "bg-[#101A33] border-white/10 text-white/60 hover:text-[var(--color-accent-green)]" : "bg-white border-[#1A1A1A]/10 text-[#1A1A1A]/60 hover:text-[var(--color-accent-green)]")}>
                    <Facebook className="w-4 h-4" />
                  </button>
                  <button className={cn("w-8 h-8 rounded-full border flex items-center justify-center transition-colors", isDarkMode ? "bg-[#101A33] border-white/10 text-white/60 hover:text-[var(--color-accent-green)]" : "bg-white border-[#1A1A1A]/10 text-[#1A1A1A]/60 hover:text-[var(--color-accent-green)]")}>
                    <LinkIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className={cn("text-sm", isDarkMode ? "text-white/50" : "text-[#1A1A1A]/50")}>
                Published · {article.date}
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className={cn("max-w-7xl mx-auto px-6 mt-24 pt-16 border-t", isDarkMode ? "border-white/10" : "border-[#1A1A1A]/10")}>
          <h3 className={cn("text-3xl font-medium mb-10", isDarkMode ? "text-white" : "text-[#1A1A1A]")}>Related Articles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedArticles.map((item) => (
              <Link href={`/news/${item.id}`} key={item.id} className="group flex flex-col gap-4">
                <div className={cn("w-full aspect-[4/3] rounded-xl overflow-hidden", isDarkMode ? "bg-white/5" : "bg-gray-200")}>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <span 
                    className={cn("px-2 py-1 text-[9px] font-bold uppercase tracking-wider border rounded", isDarkMode ? "bg-[#101A33]" : "bg-white")}
                    style={{ color: item.color, borderColor: `${item.color}40` }}
                  >
                    {item.category}
                  </span>
                </div>
                <h4 className={cn("text-lg font-medium transition-colors leading-snug", isDarkMode ? "text-white group-hover:text-[var(--color-accent-green)]" : "text-[#1A1A1A] group-hover:text-[var(--color-accent-green)]")}>
                  {item.title}
                </h4>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};
