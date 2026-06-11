'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import type { UpdateStatusState } from '@/app/actions/update-status'

const inputCls =
  'mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#285ebb] focus:ring-2 focus:ring-[#cfe0ff] w-full'

interface Props {
  id: string
  currentStatus: string
  statusOptions: string[]
  cancelHref: string
  action: (state: UpdateStatusState, formData: FormData) => Promise<UpdateStatusState>
}

export default function StatusUpdateForm({
  id,
  currentStatus,
  statusOptions,
  cancelHref,
  action,
}: Props) {
  const [state, formAction, pending] = useActionState(action, undefined)

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="id" value={id} />

      <label className="flex flex-col text-sm font-medium text-slate-700">
        Alterar status
        <select name="status" defaultValue={currentStatus} className={inputCls}>
          {statusOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </label>

      {state?.message && (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-[#f23e5c]">
          {state.message}
        </p>
      )}

      <div className="grid grid-cols-2 gap-4 pt-2">
        <Link
          href={cancelHref}
          className="rounded-2xl bg-slate-100 px-4 py-3 text-center text-sm font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
        >
          Voltar
        </Link>
        <button
          type="submit"
          disabled={pending}
          className="rounded-2xl bg-[#285ebb] px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors disabled:opacity-60"
        >
          {pending ? 'Salvando…' : 'Salvar status'}
        </button>
      </div>
    </form>
  )
}
