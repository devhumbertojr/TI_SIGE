'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import AppShell from '../../../components/AppShell'
import { updateProfileAction } from '../../actions/auth'

interface Props {
  searchParams: Promise<{ username?: string; email?: string }>
}

export default function EditarPerfilPage({ searchParams: _ }: Props) {
  const [state, action, pending] = useActionState(updateProfileAction, undefined)

  return (
    <AppShell title="Editar Perfil" description="Atualize seus dados de usuário e contato." backHref="/perfil">
      <div className="rounded-[30px] bg-white/95 p-5 shadow-sm">
        {state?.success && (
          <div className="mb-4 rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-700">
            Perfil atualizado com sucesso!
          </div>
        )}

        <form action={action} className="space-y-4">
          <label className="flex flex-col text-sm text-slate-700">
            Usuário
            <input
              name="username"
              type="text"
              required
              className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#285ebb] focus:ring-2 focus:ring-[#cfe0ff]"
            />
          </label>

          <label className="flex flex-col text-sm text-slate-700">
            Email
            <input
              name="email"
              type="email"
              required
              className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#285ebb] focus:ring-2 focus:ring-[#cfe0ff]"
            />
          </label>

          {state?.message && (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-[#f23e5c]">
              {state.message}
            </p>
          )}

          <div className="grid grid-cols-2 gap-4 pt-2">
            <Link
              href="/perfil"
              className="rounded-2xl bg-[#f23e5c] px-4 py-3 text-center text-sm font-semibold text-white hover:bg-red-600 transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={pending}
              className="rounded-2xl bg-[#52ad1c] px-4 py-3 text-sm font-semibold text-white hover:bg-green-600 transition-colors disabled:opacity-60"
            >
              {pending ? 'Salvando…' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </AppShell>
  )
}
