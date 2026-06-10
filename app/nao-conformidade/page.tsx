import Link from 'next/link';
import AppShell from '../../components/AppShell';

export default function NaoConformidadePage() {
  return (
    <AppShell title="Não Conformidade" description="Registre a não conformidade encontrada durante a inspeção." backHref="/lista-nao-conformidade">
      <div className="rounded-[30px] bg-white/95 p-5 shadow-sm">
        <form className="space-y-4">
          <label className="flex flex-col text-sm text-slate-700">
            Número do Checklist
            <input type="text" placeholder="00021 - Porta Dianteira Esquerda" className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#285ebb] focus:ring-2 focus:ring-[#cfe0ff]" />
          </label>

          <label className="flex flex-col text-sm text-slate-700">
            Descrição do Erro
            <textarea rows={4} placeholder="Descreva o erro..." className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#285ebb] focus:ring-2 focus:ring-[#cfe0ff]" />
          </label>

          <label className="flex flex-col text-sm text-slate-700">
            Prioridade
            <select className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#285ebb] focus:ring-2 focus:ring-[#cfe0ff]">
              <option>Alta</option>
              <option>Média</option>
              <option>Baixa</option>
            </select>
          </label>

          <label className="flex flex-col text-sm text-slate-700">
            Causa provável
            <input type="text" placeholder="Causa provável..." className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#285ebb] focus:ring-2 focus:ring-[#cfe0ff]" />
          </label>

          <label className="flex flex-col text-sm text-slate-700">
            Ação corretiva
            <textarea rows={3} placeholder="Ação corretiva planejada..." className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#285ebb] focus:ring-2 focus:ring-[#cfe0ff]" />
          </label>

          <label className="flex flex-col text-sm text-slate-700">
            Responsável pela correção
            <input type="text" placeholder="Thiago Nogueira" className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#285ebb] focus:ring-2 focus:ring-[#cfe0ff]" />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col text-sm text-slate-700">
              Status
              <select className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#285ebb] focus:ring-2 focus:ring-[#cfe0ff]">
                <option>Aberto</option>
                <option>Em andamento</option>
                <option>Concluído</option>
              </select>
            </label>
            <label className="flex flex-col text-sm text-slate-700">
              Anexo
              <button type="button" className="mt-2 inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors">
                Adicionar +
              </button>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <Link href="/home" className="rounded-2xl bg-[#f23e5c] px-4 py-3 text-center text-sm font-semibold text-white hover:bg-red-600 transition-colors">
              Cancelar
            </Link>
            <Link href="/lista-nao-conformidade" className="rounded-2xl bg-[#52ad1c] px-4 py-3 text-sm font-semibold text-white hover:bg-green-600 transition-colors text-center">
              Salvar
            </Link>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
