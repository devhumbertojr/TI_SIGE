import Link from 'next/link';
import AppShell from '../../components/AppShell';
import StatusBadge from '../../components/StatusBadge';

const items = [
  { title: 'Porta Dianteira Direita', status: 'Aberto' },
  { title: 'Radiador Argo', status: 'Análise' },
  { title: 'Montagem 1', status: 'Corrigido' },
];

export default function ListaChecklistPage() {
  return (
    <AppShell title="Lista Checklist" description="Filtre e acesse os checklists disponíveis." backHref="/home">
      <div className="rounded-[30px] bg-white/95 p-5 shadow-sm">
        <div className="space-y-4">
          <label className="flex flex-col text-sm text-slate-700">
            Filtro de status
            <select className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#285ebb] focus:ring-2 focus:ring-[#cfe0ff]">
              <option>Todos</option>
              <option>Aberto</option>
              <option>Análise</option>
              <option>Corrigido</option>
            </select>
          </label>

          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-10 text-slate-400">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-sm">Nenhum checklist encontrado.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <Link key={item.title} href="/checklist" className="block rounded-3xl border border-slate-200 bg-slate-50 p-4 hover:border-[#285ebb] hover:bg-[#f4f8ff] transition-colors">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{item.title}</p>
                      <p className="text-xs text-slate-500">Checklist de Qualidade</p>
                    </div>
                    <StatusBadge label={item.status} />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
