"use client";
import { Fragment } from 'react';
import { usePathname } from "next/navigation";

import Link from "next/link";
import { ChevronRight, Home } from 'lucide-react';
import { portfolioData } from '../data/projects';

export default function Breadcrumbs() {
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

  return (
    <nav className="flex items-center space-x-2 text-sm text-[var(--color-text-secondary)] mb-8">
      <Link href="/" className="hover:text-white transition-colors flex items-center">
        <Home className="w-4 h-4" />
      </Link>
      
      {breadcrumbsList.map((item, index) => {
        const isLast = index === breadcrumbsList.length - 1;
        
        let formattedName = item.name
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        // If it's the last item and the previous path was 'portfolio', try to find the project name
        if (index > 0 && breadcrumbsList[index - 1].name === 'portfolio') {
          const project = portfolioData.find(p => p.id === item.name);
          if (project) {
            formattedName = project.name;
          }
        }

        return (
          <Fragment key={item.path}>
            <ChevronRight className="w-4 h-4 text-[var(--color-text-tertiary)]" />
            {isLast ? (
              <span className="text-white font-medium">{formattedName}</span>
            ) : (
              <Link href={item.path} className="hover:text-white transition-colors">
                {formattedName}
              </Link>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
