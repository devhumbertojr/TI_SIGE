import { Suspense } from 'react'
import AppShell from '../../components/AppShell'
import StatusBadge from '../../components/StatusBadge'
import StatusFilter from '../../components/StatusFilter'
import { createClient } from '@/lib/supabase/server'

interface Props {
  searchParams: Promise<{ tipo?: string }>
}

const CLOSED_CHECKLIST = ['Finalizado', 'Cancelado', 'Fechado']
const CLOSED_NC = ['Concluído', 'Cancelado', 'Fechado']

const typeColors: Record<string, string> = {
  Checklist: 'bg-[#e8f0fc] text-[#285ebb]',
  'Não conformidade': 'bg-orange-50 text-orange-600',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export default async function HistoricoPage({ searchParams }: Props) {
  const { tipo } = await searchParams
  const supabase = await createClient()

  const showChecklist = !tipo || tipo === 'Todos' || tipo === 'Checklist'
  const showNC = !tipo || tipo === 'Todos' || tipo === 'Não conformidade'

  const [{ data: checklists }, { data: ncs }] = await Promise.all([
    showChecklist
      ? supabase
          .from('checklists')
          .select('id, veiculo, setor, status, created_at')
          .in('status', CLOSED_CHECKLIST)
          .order('created_at', { ascending: false })
      : Promise.resolve({ data: [] }),
    showNC
      ? supabase
          .from('nao_conformidades')
          .select('id, descricao, prioridade, status, created_at')
          .in('status', CLOSED_NC)
          .order('created_at', { ascending: false })
      : Promise.resolve({ data: [] }),
  ])

  const items = [
    ...(checklists ?? []).map((c) => ({
      id: c.id,
      title: c.veiculo,
      subtitle: c.setor,
      type: 'Checklist' as const,
      status: c.status,
      created_at: c.created_at,
    })),
    ...(ncs ?? []).map((n) => ({
      id: n.id,
      title: n.descricao,
      subtitle: n.prioridade,
      type: 'Não conformidade' as const,
      status: n.status,
      created_at: n.created_at,
    })),
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  return (
    <AppShell title="Histórico" description="Registros finalizados e cancelados." backHref="/home">
      <div className="rounded-[30px] bg-white/95 p-5 shadow-sm">
        <div className="space-y-4">
          <Suspense>
            <StatusFilter
              options={['Todos', 'Checklist', 'Não conformidade']}
              paramKey="tipo"
              label="Filtro de tipo"
            />
          </Suspense>

          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-10 text-slate-400">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-center">
                Nenhum registro finalizado ainda.<br />
                <span className="text-xs">Itens finalizados ou cancelados aparecerão aqui.</span>
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={`${item.type}-${item.id}`} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-900 truncate">{item.title}</p>
                      <div className="mt-1 flex items-center gap-2 flex-wrap">
                        <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${typeColors[item.type] ?? 'bg-slate-100 text-slate-600'}`}>
                          {item.type}
                        </span>
                        <span className="text-xs text-slate-400">{formatDate(item.created_at)}</span>
                      </div>
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
  )
}
