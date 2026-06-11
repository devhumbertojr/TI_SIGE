import { notFound } from 'next/navigation'
import AppShell from '@/components/AppShell'
import StatusBadge from '@/components/StatusBadge'
import StatusUpdateForm from '@/components/StatusUpdateForm'
import { createClient } from '@/lib/supabase/server'
import { updateChecklistStatusAction } from '@/app/actions/update-status'

interface Props {
  params: Promise<{ id: string }>
}

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('pt-BR')
}

function BoolBadge({ value }: { value: boolean | null }) {
  if (value === null) return <span className="text-slate-400">—</span>
  return value ? (
    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Sim
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">
      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
        <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
      </svg>
      Não
    </span>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</span>
      <span className="text-sm font-medium text-slate-800">{children}</span>
    </div>
  )
}

export default async function ChecklistDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: item } = await supabase
    .from('checklists')
    .select('*')
    .eq('id', id)
    .single()

  if (!item) notFound()

  return (
    <AppShell title="Detalhes do Checklist" backHref="/lista-checklist">
      <div className="space-y-4">
        <div className="rounded-[30px] bg-white/95 p-5 shadow-sm space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-lg font-bold text-slate-900">{item.veiculo}</p>
              <p className="text-sm text-slate-500">{item.setor} · {formatDate(item.data_inspecao)}</p>
            </div>
            <StatusBadge label={item.status} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Inspetor">{item.inspetor || '—'}</Field>
            <Field label="Data de inspeção">{formatDate(item.data_inspecao)}</Field>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Itens verificados</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Pintura</span>
                <BoolBadge value={item.pintura_ok} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Alinhamento</span>
                <BoolBadge value={item.alinhamento_ok} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Identificação</span>
                <BoolBadge value={item.identificacao_ok} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Documentação</span>
                <BoolBadge value={item.documentacao_ok} />
              </div>
            </div>
          </div>

          {item.observacoes && (
            <Field label="Observações">{item.observacoes}</Field>
          )}
        </div>

        <div className="rounded-[30px] bg-white/95 p-5 shadow-sm">
          <p className="mb-4 text-sm font-semibold text-slate-700">Atualizar status</p>
          <StatusUpdateForm
            id={item.id}
            currentStatus={item.status}
            statusOptions={['Aberto', 'Em andamento', 'Finalizado', 'Cancelado']}
            cancelHref="/lista-checklist"
            action={updateChecklistStatusAction}
          />
        </div>
      </div>
    </AppShell>
  )
}
