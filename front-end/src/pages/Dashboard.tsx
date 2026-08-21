import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#07090e] text-white p-6 max-w-6xl mx-auto font-sans">
      {/* BARRA DE NAVEGAÇÃO SUPERIOR */}
      <nav className="flex justify-between items-center bg-[#0c1017] p-4 rounded-2xl border border-purple-900/30 mb-8 shadow-md">
        <div className="flex gap-3">
          <Link 
            to="/dashboard" 
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm px-4 py-2.5 rounded-xl transition-all shadow-lg flex items-center gap-2"
          >
            📱 Tela Inicial (Dashboard)
          </Link>
          <Link 
            to="/exercises" 
            className="bg-[#121824] hover:bg-[#1a2333] text-purple-200 font-medium text-sm px-4 py-2.5 rounded-xl transition-all border border-purple-900/30 flex items-center gap-2"
          >
            🏋️ Biblioteca de Exercícios
          </Link>
        </div>
        <Link 
          to="/login"
          className="bg-red-950/60 hover:bg-red-900/60 text-red-300 border border-red-900/50 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
        >
          Sair
        </Link>
      </nav>

      {/* CARD DO PERSONAL TRAINER RESPONSÁVEL */}
      <div className="bg-[#0c1017] border border-purple-900/30 p-6 rounded-2xl mb-8 flex justify-between items-center shadow-lg relative overflow-hidden">
        <div>
          <span className="text-[10px] tracking-widest uppercase font-bold text-purple-400 block mb-1">
            Personal Trainer Responsável
          </span>
          <h2 className="text-xl font-bold text-white">Prof. Diego Paiva</h2>
        </div>
        <div className="bg-purple-950/50 border border-purple-800/40 text-purple-300 text-xs px-4 py-1.5 rounded-full font-medium">
          Plano Aluno Ativo
        </div>
      </div>

      {/* TÍTULO DO DASHBOARD */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold tracking-wide text-white">Dashboard do Aluno</h1>
        <p className="text-sm text-purple-300/70 mt-1">Acompanhe abaixo suas métricas, metas e o progresso dos seus treinos.</p>
      </div>

      {/* CARDS DE MÉTRICAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Treinos Realizados */}
        <div className="bg-[#0c1017] border border-purple-900/30 p-6 rounded-2xl text-center shadow-lg">
          <span className="text-xs text-purple-300/70 uppercase tracking-wider block mb-2">Treinos Realizados</span>
          <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-1">
            12 / 16
          </div>
          <span className="text-xs text-purple-300/50">75% da meta mensal concluída</span>
        </div>

        {/* Calorias Queimadas */}
        <div className="bg-[#0c1017] border border-purple-900/30 p-6 rounded-2xl text-center shadow-lg">
          <span className="text-xs text-purple-300/70 uppercase tracking-wider block mb-2">Calorias Queimadas</span>
          <div className="text-3xl font-extrabold text-white mb-1">
            4.850 <span className="text-xl font-bold text-purple-400">kcal</span>
          </div>
          <span className="text-xs text-purple-300/50">Média de 485 kcal por sessão</span>
        </div>

        {/* Meta de Frequência */}
        <div className="bg-[#0c1017] border border-purple-900/30 p-6 rounded-2xl text-center shadow-lg">
          <span className="text-xs text-purple-300/70 uppercase tracking-wider block mb-2">Meta de Frequência</span>
          <div className="text-2xl font-extrabold text-purple-300 mb-1">
            4x <span className="text-lg font-normal text-white">por semana</span>
          </div>
          <span className="text-xs text-purple-300/50">Excelente constância!</span>
        </div>
      </div>

      {/* PRÓXIMO TREINO AGENDADO */}
      <div className="bg-[#0c1017] border border-purple-900/30 p-8 rounded-2xl text-center shadow-xl">
        <div className="flex items-center justify-center gap-2 text-purple-400 font-semibold text-sm mb-2">
          <span>🚀 Próximo Treino Agendado</span>
        </div>
        <p className="text-sm text-purple-200/80 mb-6">
          Treino A – Foco em Membros Superiores (Peito e Tríceps)
        </p>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-lg cursor-pointer">
          Iniciar Sessão de Treino
        </button>
      </div>
    </div>
  );
}