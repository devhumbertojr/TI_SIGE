import Link from 'next/link';
import { ClipboardList, AlertTriangle, ChevronRight, Clock } from 'lucide-react';
import AppShell from '../../components/AppShell';
import { createClient } from '@/lib/supabase/server';

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase.from('profiles').select('nome, setor, username').eq('id', user.id).single()
    : { data: null };

  const nome = profile?.nome ?? 'Usuário';
  const setor = profile?.setor ?? '—';
  const idDisplay = user?.id.slice(0, 7).toUpperCase() ?? '0000000';

  return (
    <AppShell title="Home" description="Acompanhe suas checklists e não conformidades mais recentes.">
      <div className="space-y-6">
        <div className="rounded-[28px] bg-white/95 p-5 shadow-sm">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-500">Olá, {nome}!</p>
              <h2 className="text-xl font-semibold text-slate-900">Setor {setor}</h2>
            </div>
            <div className="rounded-3xl bg-[#f0f6ff] px-4 py-2 text-sm font-semibold text-[#285ebb] self-start sm:self-auto">
              ID {idDisplay}
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl border border-blue-100 bg-[#f0f6ff] p-4">
              <div className="flex items-center gap-2 mb-3">
                <ClipboardList size={16} className="text-[#285ebb]" />
                <p className="text-xs uppercase tracking-[0.3em] text-[#285ebb] font-semibold">Checklist</p>
              </div>
              <p className="text-2xl font-bold text-slate-900">
                3 <span className="text-base font-semibold text-slate-500">em aberto</span>
              </p>
            </div>
            <div className="rounded-3xl border border-orange-100 bg-orange-50 p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={16} className="text-orange-500" />
                <p className="text-xs uppercase tracking-[0.3em] text-orange-500 font-semibold">Não conf.</p>
              </div>
              <p className="text-2xl font-bold text-slate-900">
                2 <span className="text-base font-semibold text-slate-500">abertas</span>
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/lista-checklist" className="group rounded-[28px] bg-[#285ebb] px-5 py-6 text-white shadow-sm hover:bg-blue-700 transition-colors">
            <div className="flex items-center justify-between">
              <ClipboardList size={22} className="opacity-80" />
              <ChevronRight size={18} className="opacity-60 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="mt-4 text-sm font-semibold opacity-80">Lista de Checklist</p>
            <p className="mt-1 text-xl font-bold">Ver tudo</p>
          </Link>
          <Link href="/lista-nao-conformidade" className="group rounded-[28px] bg-[#52ad1c] px-5 py-6 text-white shadow-sm hover:bg-green-600 transition-colors">
            <div className="flex items-center justify-between">
              <AlertTriangle size={22} className="opacity-80" />
              <ChevronRight size={18} className="opacity-60 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="mt-4 text-sm font-semibold opacity-80">Não Conformidades</p>
            <p className="mt-1 text-xl font-bold">Ver tudo</p>
          </Link>
        </div>

        <Link href="/historico" className="group flex items-center justify-between rounded-[28px] bg-white/95 px-5 py-4 shadow-sm hover:bg-[#f4f8ff] transition-colors border border-slate-100">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100">
              <Clock size={18} className="text-slate-500" />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900">Histórico</p>
              <p className="text-xs text-slate-500">Veja registros anteriores</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </AppShell>
  );
}
