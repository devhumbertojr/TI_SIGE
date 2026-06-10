'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import TopBar from '../../components/TopBar'
import Logo from '../../components/Logo'
import { signupAction } from '../actions/auth'

const ChevronDown = () => (
  <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-slate-700 ml-1">{label}</label>
      <div className="relative">
        <select
          name={name}
          className="w-full rounded-md px-3 py-2 bg-white/90 border-none outline-none appearance-none focus:ring-2 focus:ring-[#285ebb] text-sm text-slate-800"
        >
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <ChevronDown />
        </div>
      </div>
    </div>
  )
}

export default function CadastroPage() {
  const [state, action, pending] = useActionState(signupAction, undefined)

  if (state?.success) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f0f6ff]">
        <TopBar />
        <main className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-sm bg-[#b4cff0] rounded-xl p-8 shadow-sm flex flex-col items-center gap-4 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#52ad1c] text-white">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-slate-900">Conta criada!</h2>
            <p className="text-sm text-slate-700">
              Verifique seu email para confirmar o cadastro, depois faça login.
            </p>
            <Link
              href="/login"
              className="mt-2 w-full bg-[#285ebb] text-white text-center font-medium py-2 rounded-lg hover:bg-blue-800 transition-colors shadow-sm"
            >
              Ir para Login
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f0f6ff]">
      <TopBar />

      <main className="flex-1 flex flex-col items-center justify-center p-6 py-8">
        <div className="w-full max-w-sm bg-[#b4cff0] rounded-xl p-6 shadow-sm flex flex-col items-center">
          <Logo variant="dark" className="text-3xl mb-6 mt-2" />

          <form action={action} className="w-full flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-700 ml-1">Nome</label>
              <input
                name="nome"
                type="text"
                placeholder="Matias Santos"
                required
                className="w-full rounded-md px-3 py-2 bg-white/90 border-none outline-none focus:ring-2 focus:ring-[#285ebb] text-sm text-slate-800"
              />
            </div>

            <SelectField
              label="Setor"
              name="setor"
              options={['Pintura', 'Montagem', 'Qualidade', 'Manutenção']}
            />

            <SelectField
              label="Função"
              name="funcao"
              options={['Inspetor', 'Supervisor', 'Operador']}
            />

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-700 ml-1">Usuário</label>
              <input
                name="username"
                type="text"
                placeholder="matias.santos"
                required
                className="w-full rounded-md px-3 py-2 bg-white/90 border-none outline-none focus:ring-2 focus:ring-[#285ebb] text-sm text-slate-800"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-700 ml-1">Senha</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full rounded-md px-3 py-2 bg-white/90 border-none outline-none focus:ring-2 focus:ring-[#285ebb] text-sm text-slate-800"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-700 ml-1">Email</label>
              <input
                name="email"
                type="email"
                placeholder="matias@empresa.com"
                required
                className="w-full rounded-md px-3 py-2 bg-white/90 border-none outline-none focus:ring-2 focus:ring-[#285ebb] text-sm text-slate-800"
              />
            </div>

            {state?.message && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-[#f23e5c] text-center">
                {state.message}
              </p>
            )}

            <div className="grid grid-cols-2 gap-4 mt-2">
              <Link
                href="/login"
                className="bg-[#f23e5c] text-white text-center font-medium py-2 rounded-lg hover:bg-red-600 transition-colors shadow-sm"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={pending}
                className="bg-[#52ad1c] text-white font-medium py-2 rounded-lg hover:bg-green-600 transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {pending ? 'Criando…' : 'Cadastrar'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
