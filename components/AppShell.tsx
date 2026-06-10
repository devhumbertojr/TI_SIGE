'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { House, ClipboardList, Plus, AlertTriangle, User } from 'lucide-react';
import React from 'react';
import TopBar from './TopBar';

interface AppShellProps {
  title: string;
  description?: string;
  backHref?: string;
  children: React.ReactNode;
}

const navItems = [
  { href: '/home', icon: House, label: 'Home' },
  { href: '/lista-checklist', icon: ClipboardList, label: 'Checklist' },
  { href: '/checklist', icon: Plus, label: 'Novo', highlight: true },
  { href: '/lista-nao-conformidade', icon: AlertTriangle, label: 'Não Conf.' },
  { href: '/perfil', icon: User, label: 'Perfil' },
];

export default function AppShell({ title, description, backHref, children }: AppShellProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen bg-[#f0f6ff]">
      <TopBar />

      <main className="flex-1 px-4 py-5 sm:px-6">
        <div className="mx-auto w-full max-w-4xl">
          <div className="mb-5">
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
              {backHref ? (
                <Link href={backHref} className="inline-flex items-center gap-1 hover:text-[#285ebb] transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Voltar
                </Link>
              ) : (
                <span>QualCheck</span>
              )}
            </div>
            <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
            {description ? (
              <p className="mt-2 text-sm text-slate-600">{description}</p>
            ) : null}
          </div>
          {children}
        </div>
      </main>

      <nav className="bg-white border-t border-slate-200 shadow-inner py-2 px-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-1">
          {navItems.map(({ href, icon: Icon, label, highlight }) => {
            const isActive = pathname === href || (href !== '/home' && pathname.startsWith(href));
            if (highlight) {
              return (
                <Link key={href} href={href} className="flex flex-col items-center gap-1 text-xs font-medium text-slate-500 hover:text-[#285ebb]">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#285ebb] text-white shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors">
                    <Icon size={22} strokeWidth={2.5} />
                  </span>
                  <span className="text-[10px]">{label}</span>
                </Link>
              );
            }
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center gap-1 text-xs font-medium transition-colors ${isActive ? 'text-[#285ebb]' : 'text-slate-400 hover:text-[#285ebb]'}`}
              >
                <span className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl transition-colors ${isActive ? 'bg-[#e8f0fc]' : 'hover:bg-slate-100'}`}>
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                </span>
                <span className="text-[10px]">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
