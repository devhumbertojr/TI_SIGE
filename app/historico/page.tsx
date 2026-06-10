import AppShell from '../../components/AppShell';
import StatusBadge from '../../components/StatusBadge';

const items = [
  { title: 'Porta Dianteira Direita', type: 'Checklist', status: 'Fechado' },
  { title: 'Radiador Argo', type: 'Não conformidade', status: 'Em andamento' },
  { title: 'Pintura Final', type: 'Checklist', status: 'Cancelado' },
];

const typeColors: Record<string, string> = {
  Checklist: 'bg-[#e8f0fc] text-[#285ebb]',
  'Não conformidade': 'bg-orange-50 text-orange-600',
};

export default function HistoricoPage() {
  return (
    <AppShell title="Histórico" description="Confira o histórico de checklists e não conformidades." backHref="/home">
      <div className="rounded-[30px] bg-white/95 p-5 shadow-sm">
        <div className="space-y-4">
          <label className="flex flex-col text-sm text-slate-700">
            Filtro de tipo
            <select className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#285ebb] focus:ring-2 focus:ring-[#cfe0ff]">
              <option>Todos</option>
              <option>Checklist</option>
              <option>Não conformidade</option>
            </select>
          </label>

          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-10 text-slate-400">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm">Nenhum histórico disponível.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900 truncate">{item.title}</p>
                      <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${typeColors[item.type] ?? 'bg-slate-100 text-slate-600'}`}>
                        {item.type}
                      </span>
                    </div>
                    <StatusBadge label={item.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
