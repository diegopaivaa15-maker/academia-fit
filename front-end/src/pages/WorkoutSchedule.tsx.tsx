import { useState } from 'react';
import { useWorkouts } from '../context/WorkoutContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [selectedDay, setSelectedDay] = useState<string>('Segunda-feira');
  const { workouts, addExercise, removeExercise, updateExerciseWeight } = useWorkouts();

  // Estados do formulário
  const [name, setName] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('Peito');
  const [setsReps, setSetsReps] = useState('3x 12');
  const [weight, setWeight] = useState('');
  const [restTime, setRestTime] = useState('60s');
  const [videoUrl, setVideoUrl] = useState('');

  // Estados de edição de carga
  const [editingWeightId, setEditingWeightId] = useState<string | null>(null);
  const [tempWeight, setTempWeight] = useState('');

  // Dias da semana
  const days = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];

  const handleAddExercise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newExercise = {
      id: String(Date.now()),
      name,
      muscleGroup,
      setsReps,
      weight,
      restTime,
      videoUrl,
    };

    addExercise(selectedDay, newExercise);

    setName('');
    setWeight('');
    setVideoUrl('');
  };

  const handleSaveWeight = (id: string) => {
    updateExerciseWeight(selectedDay, id, tempWeight);
    setEditingWeightId(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 max-w-6xl mx-auto">
      {/* BARRA DE NAVEGAÇÃO */}
      <nav className="flex gap-4 mb-8 bg-slate-900 p-4 rounded-2xl border border-purple-900/30">
        <Link to="/" className="text-purple-300 font-semibold text-sm hover:text-white transition-colors">📅 Meus Treinos</Link>
        <Link to="/stats" className="text-purple-300 font-semibold text-sm hover:text-white transition-colors">📊 Estatísticas</Link>
        <Link to="/exercises" className="text-purple-300 font-semibold text-sm hover:text-white transition-colors">📚 Biblioteca</Link>
      </nav>

      {/* CABEÇALHO */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold tracking-wide">Painel de Treinos</h1>
        <p className="text-sm text-purple-300/70 mt-1">Gerencie sua rotina semanal de exercícios.</p>
      </div>

      {/* SELETOR DE DIAS DA SEMANA */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
        {days.map((day) => {
          const count = workouts[day]?.length || 0;
          const isSelected = selectedDay === day;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`p-4 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                isSelected ? 'bg-purple-600 border-purple-400 shadow-lg' : 'bg-slate-900 border-purple-900/40 hover:border-purple-600/50'
              }`}
            >
              <span className="font-semibold text-sm">{day}</span>
              <span className="text-xs mt-1 opacity-80">{count} {count === 1 ? 'exercício' : 'exercícios'}</span>
            </button>
          );
        })}
      </div>

      {/* FORMULÁRIO DE ADIÇÃO */}
      <div className="bg-slate-900 border border-purple-900/40 p-6 rounded-2xl shadow-xl mb-8">
        <h2 className="text-sm font-bold text-purple-300 text-center mb-6 uppercase tracking-wider">
          + Adicionar Exercício para {selectedDay.toUpperCase()}
        </h2>
        <form onSubmit={handleAddExercise} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Nome do Exercício (ex: Supino)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-slate-950 border border-purple-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
            required
          />
          <input
            type="text"
            placeholder="Carga (ex: 20kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="bg-slate-950 border border-purple-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 font-semibold py-3 rounded-xl transition-all cursor-pointer md:col-span-3"
          >
            Adicionar à Ficha
          </button>
        </form>
      </div>

      {/* LISTAGEM DE EXERCÍCIOS */}
      <div>
        <h3 className="text-center font-bold text-lg text-purple-300 mb-4">
          📋 Exercícios Para {selectedDay} ({workouts[selectedDay]?.length || 0})
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {workouts[selectedDay]?.length === 0 ? (
            <p className="text-center text-purple-300/60 text-sm py-8 bg-slate-900/50 rounded-2xl border border-purple-900/20">
              Nenhum exercício cadastrado para este dia.
            </p>
          ) : (
            workouts[selectedDay]?.map((exercise: any) => (
              <div key={exercise.id} className="bg-slate-900 border border-purple-900/40 p-4 rounded-xl flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-white text-base">{exercise.name}</h4>
                  <div className="flex gap-4 mt-1 text-xs text-purple-300/70">
                    <span>Grupo: {exercise.muscleGroup}</span>
                    <span>Séries/Reps: {exercise.setsReps}</span>
                    <span>Carga: {exercise.weight || 'Não informada'}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => removeExercise(selectedDay, exercise.id)}
                    className="text-red-400 hover:text-red-300 text-xs bg-red-950/40 border border-red-900/30 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}