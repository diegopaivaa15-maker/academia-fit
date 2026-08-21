import { useState, useEffect } from 'react';

// ==========================================
// 1. INTERFACES (Contrato de dados)
// ==========================================
interface DashboardData {
  nextWorkout: string;
  protocolProgress: number; 
  daysRemaining: number;
  monthlyVolume: string;    
  protocolStatus: string;   
}

export default function Dashboard() {
  // ==========================================
  // 2. ESTADOS DO COMPONENTE
  // ==========================================
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // ==========================================
  // 3. BUSCA DE DADOS (Simulação Inicial)
  // ==========================================
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setTimeout(() => {
          setData({
            nextWorkout: 'Treino A (Segunda)',
            protocolProgress: 98,
            daysRemaining: 0,
            monthlyVolume: '30.9k kg',
            protocolStatus: 'Sem prazo',
          });
          setLoading(false);
        }, 300);
      } catch (err) {
        console.error('Erro ao carregar dashboard', err);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-purple-400 font-medium bg-slate-950">
        Carregando seu painel...
      </div>
    );
  }

  // ==========================================
  // 4. RENDERIZAÇÃO DA INTERFACE (Largura Total)
  // ==========================================
  return (
    // w-full garante 100% de largura, sem centralizações restritas
    <div className="w-full bg-slate-950 text-white">
      
      {/* Cabeçalho de Boas-Vindas */}
      <div className="mb-6 flex justify-between items-center bg-slate-900/80 p-5 rounded-2xl border border-purple-950 shadow-lg">
        <div>
          <span className="text-xs text-purple-400 font-semibold uppercase tracking-wider">Seu Personal</span>
          <h2 className="text-xl font-bold text-white">Jucilene Aparecida</h2>
        </div>
        <div className="w-12 h-12 rounded-full bg-purple-600/30 border border-purple-500/50 flex items-center justify-center font-bold text-purple-300">
          JA
        </div>
      </div>

      {/* Grid de Cards Principais (Responsivo expandido para ocupar o espaço) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        
        {/* Card 1: Próximo Treino */}
        <div className="bg-gradient-to-br from-purple-950 to-slate-900 border border-purple-900/40 p-5 rounded-2xl shadow-xl flex flex-col justify-between h-40">
          <div className="w-9 h-9 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400 mb-2">
            🏋️‍♂️
          </div>
          <div>
            <span className="text-xs text-purple-300 block uppercase font-medium">Próximo Treino</span>
            <span className="text-base font-bold text-white truncate block">{data?.nextWorkout}</span>
          </div>
        </div>

        {/* Card 2: Protocolo Ativo */}
        <div className="bg-gradient-to-br from-purple-950 to-slate-900 border border-purple-900/40 p-5 rounded-2xl shadow-xl flex flex-col justify-between h-40">
          <div className="w-9 h-9 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400 mb-2">
            📅
          </div>
          <div>
            <span className="text-xs text-purple-300 block uppercase font-medium">Protocolo Ativo</span>
            <span className="text-2xl font-extrabold text-purple-400">{data?.protocolProgress}%</span>
          </div>
        </div>

        {/* Card 3: Fim do Protocolo */}
        <div className="bg-gradient-to-br from-purple-950 to-slate-900 border border-purple-900/40 p-5 rounded-2xl shadow-xl flex flex-col justify-between h-40">
          <div className="w-9 h-9 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400 mb-2">
            🎯
          </div>
          <div>
            <span className="text-xs text-purple-300 block uppercase font-medium">Fim do Protocolo</span>
            <span className="text-base font-bold text-white">{data?.protocolStatus}</span>
          </div>
        </div>

        {/* Card 4: Volume Mensal */}
        <div className="bg-gradient-to-br from-purple-950 to-slate-900 border border-purple-900/40 p-5 rounded-2xl shadow-xl flex flex-col justify-between h-40">
          <div className="w-9 h-9 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400 mb-2">
            📈
          </div>
          <div>
            <span className="text-xs text-purple-300 block uppercase font-medium">Volume Mensal</span>
            <span className="text-xl font-extrabold text-white">{data?.monthlyVolume}</span>
          </div>
        </div>

      </div>

      {/* Botão de Atalho Inferior */}
      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 border border-purple-500/30 text-base">
        🏆 Ver Recordes Pessoais
      </button>

    </div>
  );
}