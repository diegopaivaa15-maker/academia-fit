        import { Link } from 'react-router-dom';
        import { useWorkouts } from '../context/WorkoutContext';


        export default function Stats() {
        const { workouts } = useWorkouts();

        // Calcula estatísticas reais baseadas no contexto global
        const allDays = Object.keys(workouts);
        
        // Total de exercícios cadastrados na semana inteira
        const totalExercises = allDays.reduce((acc, day) => acc + (workouts[day]?.length || 0), 0);

        // Conta quantos dias da semana possuem pelo menos 1 exercício planejado
        const activeDaysCount = allDays.filter(day => (workouts[day]?.length || 0) > 0).length;

        return (
            <div className="min-h-screen bg-slate-950 text-white p-6 max-w-4xl mx-auto">
            {/* Cabeçalho com link de navegação de volta para os treinos */}
            <div className="flex justify-between items-center mb-8">
                <div>
                <h1 className="text-2xl font-bold tracking-wide">Suas Estatísticas</h1>
                <p className="text-sm text-purple-300/70 mt-1">Acompanhe o resumo do seu desempenho semanal.</p>
                </div>
                <Link 
                to="/" 
                className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
                >
                ← Voltar para Treinos
                </Link>
            </div>
            
            {/* Cards de Métricas Principais */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-900 border border-purple-900/40 p-6 rounded-2xl shadow-xl">
                <p className="text-gray-400 text-xs uppercase font-semibold">Exercícios na Semana</p>
                <p className="text-3xl font-bold mt-2 text-purple-400">{totalExercises}</p>
                </div>

                <div className="bg-slate-900 border border-purple-900/40 p-6 rounded-2xl shadow-xl">
                <p className="text-gray-400 text-xs uppercase font-semibold">Dias com Treino Ativo</p>
                <p className="text-3xl font-bold mt-2 text-emerald-400">{activeDaysCount} de 7</p>
                </div>

                <div className="bg-slate-900 border border-purple-900/40 p-6 rounded-2xl shadow-xl">
                <p className="text-gray-400 text-xs uppercase font-semibold">Consistência</p>
                <p className="text-3xl font-bold mt-2 text-blue-400">
                    {Math.round((activeDaysCount / 7) * 100)}%
                </p>
                </div>
            </div>

            {/* Resumo por Dia da Semana */}
            <div className="bg-slate-900 border border-purple-900/40 p-6 rounded-2xl shadow-xl">
                <h2 className="text-lg font-bold mb-4 text-purple-300">Resumo da Ficha Semanal</h2>
                
                <div className="space-y-3">
                {allDays.map(day => {
                    const count = workouts[day]?.length || 0;
                    return (
                    <div key={day} className="flex justify-between items-center bg-slate-950 p-3.5 rounded-xl border border-purple-900/20">
                        <span className="text-sm font-semibold text-gray-200">{day}</span>
                        <span className={`text-xs px-3 py-1 rounded-lg font-medium ${count > 0 ? 'bg-purple-950 text-purple-300 border border-purple-800/40' : 'bg-slate-900 text-gray-500'}`}>
                        {count} {count === 1 ? 'exercício' : 'exercícios'}
                        </span>
                    </div>
                    );
                })}
                </div>
            </div>
            </div>
        );
        }