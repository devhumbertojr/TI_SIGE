import { LogOut } from 'lucide-react';
import AppShell from '../../components/AppShell';
import { createClient } from '@/lib/supabase/server';
import { logoutAction } from '../actions/auth';
import Link from 'next/link';

export default async function PerfilPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase.from('profiles').select('nome, setor, funcao, username, email').eq('id', user.id).single()
    : { data: null };

  const nome = profile?.nome ?? 'Usuário';
  const setor = profile?.setor ?? '—';
  const funcao = profile?.funcao ?? '—';
  const username = profile?.username ?? '—';
  const email = profile?.email ?? user?.email ?? '—';
  const idDisplay = user?.id.slice(0, 7).toUpperCase() ?? '0000000';

  return (
    <AppShell title="Perfil" description="Veja os dados do seu usuário e atualize quando precisar.">
      <div className="rounded-[30px] bg-white/95 p-5 shadow-sm">
        <div className="space-y-5">
          <div className="rounded-3xl bg-[#f0f6ff] p-5">
            <p className="text-lg font-bold text-slate-900">{nome}</p>
            <p className="mt-1 text-sm text-slate-500">{setor} · {funcao}</p>
            <span className="mt-3 inline-block rounded-full bg-[#285ebb] px-3 py-1 text-xs font-semibold text-white">
              ID {idDisplay}
            </span>
          </div>

          <div className="space-y-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Usuário</p>
              <p className="mt-2 text-sm font-semibold text-slate-900">{username}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Email</p>
              <p className="mt-2 text-sm font-semibold text-slate-900">{email}</p>
            </div>
          </div>

          <Link
            href="/perfil/editar"
            className="inline-flex w-full items-center justify-center rounded-2xl bg-[#285ebb] px-4 py-3 text-sm font-semibold text-white hover:bg-blue-800 transition-colors"
          >
            Editar Dados
          </Link>

          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <LogOut size={16} />
              Sair da conta
            </button>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
