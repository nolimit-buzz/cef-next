"use client";
import { Fragment } from 'react';
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from 'lucide-react';
import { portfolioData } from '../data/projects';
import { articles } from '../data/articles';

interface BreadcrumbsProps {
  isDarkMode?: boolean;
}

export default function Breadcrumbs({ isDarkMode = true }: BreadcrumbsProps) {
  const pathname = usePathname();
  const pathnames = (pathname || "").split('/').filter((x) => x);

  const breadcrumbsList: {name: string, path: string}[] = [];
  pathnames.forEach((name, index) => {
    if (index === 0 && ['fund', 'governance'].includes(name)) {
      breadcrumbsList.push({ name: 'about', path: '/about' });
      breadcrumbsList.push({ name, path: `/${name}` });
    } else {
      breadcrumbsList.push({ name, path: `/${pathnames.slice(0, index + 1).join('/')}` });
    }
  });

  const textSecondary = isDarkMode ? 'text-[var(--color-text-secondary)]' : 'text-[#1A1A1A]/60';
  const textTertiary = isDarkMode ? 'text-[var(--color-text-tertiary)]' : 'text-[#1A1A1A]/30';
  const hoverColor = isDarkMode ? 'hover:text-white' : 'hover:text-[var(--color-accent)]';
  const activeColor = isDarkMode ? 'text-white' : 'text-[#1A1A1A]';

  return (
    <nav className={`flex items-center gap-2 text-sm ${textSecondary} mb-8`}>
      <Link href="/" className={`min-h-0 min-w-0 ${hoverColor} transition-colors inline-flex items-center`}>
        <Home className="w-4 h-4" />
      </Link>

      {breadcrumbsList.map((item, index) => {
        const isLast = index === breadcrumbsList.length - 1;

        let formattedName = item.name
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        if (index > 0 && breadcrumbsList[index - 1].name === 'portfolio') {
          const project = portfolioData.find(p => p.id === item.name);
          if (project) formattedName = project.name;
        }

        if (index > 0 && breadcrumbsList[index - 1].name === 'news') {
          const article = articles.find(a => a.id === Number(item.name));
          if (article) formattedName = article.title;
        }

        return (
          <span key={item.path} className="inline-flex items-center gap-2">
            <ChevronRight className={`w-4 h-4 shrink-0 ${textTertiary}`} />
            {isLast ? (
              <span className={`inline-flex items-center ${activeColor} font-medium ${index > 0 && breadcrumbsList[index - 1].name === 'news' ? 'max-w-[200px] truncate' : ''}`}>
                {formattedName}
              </span>
            ) : (
              <Link href={item.path} className={`min-h-0 min-w-0 inline-flex items-center ${hoverColor} transition-colors`}>
                {formattedName}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
