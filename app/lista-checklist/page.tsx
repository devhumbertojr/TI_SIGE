import Link from 'next/link'
import { Suspense } from 'react'
import AppShell from '../../components/AppShell'
import StatusBadge from '../../components/StatusBadge'
import StatusFilter from '../../components/StatusFilter'
import { createClient } from '@/lib/supabase/server'

interface Props {
  searchParams: Promise<{ status?: string }>
}

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('pt-BR')
}

export default async function ListaChecklistPage({ searchParams }: Props) {
  const { status } = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from('checklists')
    .select('id, veiculo, setor, status, data_inspecao')
    .order('created_at', { ascending: false })

  if (status && status !== 'Todos') {
    query = query.eq('status', status)
  }

  const { data } = await query
  const items = data ?? []

  return (
    <AppShell title="Lista Checklist" description="Filtre e acesse os checklists disponíveis." backHref="/home">
      <div className="rounded-[30px] bg-white/95 p-5 shadow-sm">
        <div className="space-y-4">
          <Suspense>
            <StatusFilter options={['Todos', 'Aberto', 'Em andamento', 'Finalizado', 'Cancelado']} />
          </Suspense>

          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-10 text-slate-400">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-sm">Nenhum checklist encontrado.</p>
              <Link href="/checklist" className="rounded-2xl bg-[#285ebb] px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
                Criar primeiro checklist
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <Link key={item.id} href={`/checklist/${item.id}`} className="block rounded-3xl border border-slate-200 bg-slate-50 p-4 hover:border-[#285ebb] hover:bg-blue-50 transition-colors active:scale-[0.98]">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900 truncate">{item.veiculo}</p>
                      <p className="text-xs text-slate-500">
                        {item.setor} · {formatDate(item.data_inspecao)}
                      </p>
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
  )
}
