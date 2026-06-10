import Link from 'next/link';
import AppShell from '../../components/AppShell';
import StatusBadge from '../../components/StatusBadge';

const items = [
  { title: 'Porta Dianteira Direita', status: 'Validação' },
  { title: 'Radiador Argo', status: 'Aguardando' },
];

export default function ListaNaoConformidadePage() {
  return (
    <AppShell title="Lista Não Conformidade" description="Veja e gerencie as não conformidades registradas." backHref="/home">
      <div className="rounded-[30px] bg-white/95 p-5 shadow-sm">
        <div className="space-y-4">
          <label className="flex flex-col text-sm text-slate-700">
            Filtro de status
            <select className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#285ebb] focus:ring-2 focus:ring-[#cfe0ff]">
              <option>Todos</option>
              <option>Aberto</option>
              <option>Em andamento</option>
              <option>Validação</option>
              <option>Fechado</option>
            </select>
          </label>

          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-10 text-slate-400">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-sm">Nenhuma não conformidade encontrada.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <Link key={item.title} href="/nao-conformidade" className="block rounded-3xl border border-slate-200 bg-slate-50 p-4 hover:border-[#285ebb] hover:bg-[#f4f8ff] transition-colors">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{item.title}</p>
                      <p className="text-xs text-slate-500">Não conformidade</p>
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
