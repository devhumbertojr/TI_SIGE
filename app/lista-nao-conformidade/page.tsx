import Link from 'next/link'
import { Suspense } from 'react'
import AppShell from '../../components/AppShell'
import StatusBadge from '../../components/StatusBadge'
import StatusFilter from '../../components/StatusFilter'
import { createClient } from '@/lib/supabase/server'

interface Props {
  searchParams: Promise<{ status?: string }>
}

export default async function ListaNaoConformidadePage({ searchParams }: Props) {
  const { status } = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from('nao_conformidades')
    .select('id, descricao, prioridade, status, created_at')
    .order('created_at', { ascending: false })

  if (status && status !== 'Todos') {
    query = query.eq('status', status)
  }

  const { data } = await query
  const items = data ?? []

  return (
    <AppShell title="Lista Não Conformidade" description="Veja e gerencie as não conformidades registradas." backHref="/home">
      <div className="rounded-[30px] bg-white/95 p-5 shadow-sm">
        <div className="space-y-4">
          <Suspense>
            <StatusFilter options={['Todos', 'Aberto', 'Em andamento', 'Concluído', 'Cancelado']} />
          </Suspense>

          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-10 text-slate-400">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-sm">Nenhuma não conformidade encontrada.</p>
              <Link href="/nao-conformidade" className="rounded-2xl bg-[#52ad1c] px-4 py-2 text-sm font-semibold text-white hover:bg-green-600 transition-colors">
                Registrar não conformidade
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <Link key={item.id} href={`/nao-conformidade/${item.id}`} className="block rounded-3xl border border-slate-200 bg-slate-50 p-4 hover:border-orange-300 hover:bg-orange-50 transition-colors active:scale-[0.98]">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-900 line-clamp-2">{item.descricao}</p>
                      <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        item.prioridade === 'Alta' ? 'bg-red-50 text-[#f23e5c]' :
                        item.prioridade === 'Média' ? 'bg-amber-50 text-amber-600' :
                        'bg-green-50 text-[#52ad1c]'
                      }`}>
                        {item.prioridade}
                      </span>
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
