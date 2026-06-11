const colorMap: Record<string, string> = {
  aberto: 'bg-[#285ebb] text-white',
  análise: 'bg-amber-400 text-white',
  analise: 'bg-amber-400 text-white',
  'em andamento': 'bg-sky-500 text-white',
  aprovado: 'bg-[#52ad1c] text-white',
  corrigido: 'bg-[#52ad1c] text-white',
  finalizado: 'bg-[#52ad1c] text-white',
  concluído: 'bg-[#52ad1c] text-white',
  concluido: 'bg-[#52ad1c] text-white',
  validado: 'bg-purple-500 text-white',
  validação: 'bg-purple-500 text-white',
  validacao: 'bg-purple-500 text-white',
  aguardando: 'bg-orange-400 text-white',
  fechado: 'bg-slate-500 text-white',
  cancelado: 'bg-[#f23e5c] text-white',
  alta: 'bg-[#f23e5c] text-white',
  média: 'bg-amber-400 text-white',
  media: 'bg-amber-400 text-white',
  baixa: 'bg-[#52ad1c] text-white',
};

interface StatusBadgeProps {
  label: string;
}

export default function StatusBadge({ label }: StatusBadgeProps) {
  const key = label.toLowerCase();
  const classes = colorMap[key] ?? 'bg-slate-200 text-slate-700';
  return (
    <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${classes}`}>
      {label}
    </span>
  );
}
