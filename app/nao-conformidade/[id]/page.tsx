import { notFound } from 'next/navigation'
import AppShell from '@/components/AppShell'
import StatusBadge from '@/components/StatusBadge'
import StatusUpdateForm from '@/components/StatusUpdateForm'
import { createClient } from '@/lib/supabase/server'
import { updateNaoConformidadeStatusAction } from '@/app/actions/update-status'

interface Props {
  params: Promise<{ id: string }>
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</span>
      <span className="text-sm font-medium text-slate-800">{children}</span>
    </div>
  )
}

export default async function NaoConformidadeDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: item } = await supabase
    .from('nao_conformidades')
    .select('*')
    .eq('id', id)
    .single()

  if (!item) notFound()

  return (
    <AppShell title="Detalhes da Não Conformidade" backHref="/lista-nao-conformidade">
      <div className="space-y-4">
        <div className="rounded-[30px] bg-white/95 p-5 shadow-sm space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-base font-bold text-slate-900 leading-snug line-clamp-3">{item.descricao}</p>
              <p className="mt-1 text-sm text-slate-500">{formatDate(item.created_at)}</p>
            </div>
            <StatusBadge label={item.status} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {item.prioridade && (
              <Field label="Prioridade">
                <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                  item.prioridade === 'Alta' ? 'bg-red-100 text-red-600' :
                  item.prioridade === 'Média' ? 'bg-amber-100 text-amber-600' :
                  'bg-green-100 text-green-700'
                }`}>
                  {item.prioridade}
                </span>
              </Field>
            )}
            {item.checklist_id && (
              <Field label="Checklist ref.">{item.checklist_id}</Field>
            )}
          </div>

          {item.causa && <Field label="Causa">{item.causa}</Field>}
          {item.acao_corretiva && <Field label="Ação corretiva">{item.acao_corretiva}</Field>}
          {item.responsavel && <Field label="Responsável">{item.responsavel}</Field>}
          {item.prazo && <Field label="Prazo">{formatDate(item.prazo)}</Field>}
        </div>

        <div className="rounded-[30px] bg-white/95 p-5 shadow-sm">
          <p className="mb-4 text-sm font-semibold text-slate-700">Atualizar status</p>
          <StatusUpdateForm
            id={item.id}
            currentStatus={item.status}
            statusOptions={['Aberto', 'Em andamento', 'Concluído', 'Cancelado']}
            cancelHref="/lista-nao-conformidade"
            action={updateNaoConformidadeStatusAction}
          />
        </div>
      </div>
    </AppShell>
  )
}
