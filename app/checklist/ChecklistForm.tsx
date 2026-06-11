'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { saveChecklistAction } from '../actions/checklist'

const inputCls = 'mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#285ebb] focus:ring-2 focus:ring-[#cfe0ff] w-full'

interface Props {
  defaultInspetor: string
  defaultSetor: string
  defaultDate: string
}

export default function ChecklistForm({ defaultInspetor, defaultSetor, defaultDate }: Props) {
  const [state, action, pending] = useActionState(saveChecklistAction, undefined)

  return (
    <div className="rounded-[30px] bg-white/95 p-5 shadow-sm">
      <form action={action} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col text-sm text-slate-700">
            Veículo/Peça vinculada <span className="text-[#f23e5c]">*</span>
            <input name="veiculo" type="text" required placeholder="Porta Dianteira Esquerda" className={inputCls} />
          </label>
          <label className="flex flex-col text-sm text-slate-700">
            Data de inspeção <span className="text-[#f23e5c]">*</span>
            <input name="data_inspecao" type="date" required defaultValue={defaultDate} className={inputCls} />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col text-sm text-slate-700">
            Inspetor responsável
            <input
              name="inspetor"
              type="text"
              defaultValue={defaultInspetor}
              readOnly
              className={`${inputCls} bg-slate-100 text-slate-500 cursor-not-allowed`}
            />
          </label>
          <label className="flex flex-col text-sm text-slate-700">
            Setor
            <select name="setor" defaultValue={defaultSetor} className={inputCls}>
              {['Pintura', 'Montagem', 'Qualidade', 'Manutenção'].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col text-sm text-slate-700">
            Pintura ok?
            <select name="pintura_ok" className={inputCls}>
              <option>Sim</option>
              <option>Não</option>
            </select>
          </label>
          <label className="flex flex-col text-sm text-slate-700">
            Alinhamento ok?
            <select name="alinhamento_ok" className={inputCls}>
              <option>Sim</option>
              <option>Não</option>
            </select>
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col text-sm text-slate-700">
            Identificação ok?
            <select name="identificacao_ok" className={inputCls}>
              <option>Sim</option>
              <option>Não</option>
            </select>
          </label>
          <label className="flex flex-col text-sm text-slate-700">
            Documentação ok?
            <select name="documentacao_ok" className={inputCls}>
              <option>Sim</option>
              <option>Não</option>
            </select>
          </label>
        </div>

        <label className="flex flex-col text-sm text-slate-700">
          Observações
          <textarea name="observacoes" rows={4} placeholder="Observações adicionais..." className={inputCls} />
        </label>

        <label className="flex flex-col text-sm text-slate-700 max-w-[50%]">
          Status
          <select name="status" className={inputCls}>
            <option>Aberto</option>
            <option>Em andamento</option>
            <option>Finalizado</option>
            <option>Cancelado</option>
          </select>
        </label>

        {state?.message && (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-[#f23e5c]">{state.message}</p>
        )}

        <div className="grid grid-cols-2 gap-4 pt-2">
          <Link href="/lista-checklist" className="rounded-2xl bg-[#f23e5c] px-4 py-3 text-center text-sm font-semibold text-white hover:bg-red-600 transition-colors">
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
  )
}
