import Link from 'next/link';
import AppShell from '../../components/AppShell';

export default function ChecklistPage() {
  return (
    <AppShell title="Checklist de Qualidade" description="Preencha as informações para registrar a inspeção." backHref="/lista-checklist">
      <div className="rounded-[30px] bg-white/95 p-5 shadow-sm">
        <form className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col text-sm text-slate-700">
              Veículo/Peça vinculada
              <input type="text" placeholder="Porta Dianteira Esquerda" className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#285ebb] focus:ring-2 focus:ring-[#cfe0ff]" />
            </label>
            <label className="flex flex-col text-sm text-slate-700">
              Data de inspeção
              <input type="date" className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#285ebb] focus:ring-2 focus:ring-[#cfe0ff]" />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col text-sm text-slate-700">
              Inspetor responsável
              <input type="text" placeholder="Matias Santos" className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#285ebb] focus:ring-2 focus:ring-[#cfe0ff]" />
            </label>
            <label className="flex flex-col text-sm text-slate-700">
              Setor
              <select className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#285ebb] focus:ring-2 focus:ring-[#cfe0ff]">
                <option>Pintura</option>
                <option>Montagem</option>
                <option>Qualidade</option>
              </select>
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col text-sm text-slate-700">
              Pintura ok?
              <select className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#285ebb] focus:ring-2 focus:ring-[#cfe0ff]">
                <option>Sim</option>
                <option>Não</option>
              </select>
            </label>
            <label className="flex flex-col text-sm text-slate-700">
              Alinhamento ok?
              <select className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#285ebb] focus:ring-2 focus:ring-[#cfe0ff]">
                <option>Sim</option>
                <option>Não</option>
              </select>
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col text-sm text-slate-700">
              Identificação ok?
              <select className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#285ebb] focus:ring-2 focus:ring-[#cfe0ff]">
                <option>Sim</option>
                <option>Não</option>
              </select>
            </label>
            <label className="flex flex-col text-sm text-slate-700">
              Documentação ok?
              <select className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#285ebb] focus:ring-2 focus:ring-[#cfe0ff]">
                <option>Sim</option>
                <option>Não</option>
              </select>
            </label>
          </div>

          <label className="flex flex-col text-sm text-slate-700">
            Observações
            <textarea rows={4} placeholder="Observações adicionais..." className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#285ebb] focus:ring-2 focus:ring-[#cfe0ff]" />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col text-sm text-slate-700">
              Status
              <select className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#285ebb] focus:ring-2 focus:ring-[#cfe0ff]">
                <option>Aberto</option>
                <option>Finalizado</option>
              </select>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <Link href="/home" className="rounded-2xl bg-[#f23e5c] px-4 py-3 text-center text-sm font-semibold text-white hover:bg-red-600 transition-colors">
              Cancelar
            </Link>
            <Link href="/home" className="rounded-2xl bg-[#52ad1c] px-4 py-3 text-sm font-semibold text-white hover:bg-green-600 transition-colors text-center">
              Salvar
            </Link>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
