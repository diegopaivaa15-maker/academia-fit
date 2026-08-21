  import { useState } from 'react';
  import { Link } from 'react-router-dom';
  import { useWorkouts } from '../context/WorkoutContext';

  export default function Exercises() {
    const { addExercise } = useWorkouts();
    const [selectedDay, setSelectedDay] = useState('Segunda-feira');

    // Biblioteca base de exercícios
    const exerciseLibrary = [
      { name: 'Supino Reto', muscleGroup: 'Peito', sets: '3x 12' },
      { name: 'Puxada Alta', muscleGroup: 'Costas', sets: '3x 10' },
      { name: 'Agachamento Livre', muscleGroup: 'Pernas', sets: '4x 8' },
      { name: 'Desenvolvimento', muscleGroup: 'Ombros', sets: '3x 12' },
      { name: 'Rosca Direta', muscleGroup: 'Braços', sets: '3x 12' },
    ];

    const handleImport = (ex: typeof exerciseLibrary[0]) => {
      addExercise(selectedDay, {
        id: String(Date.now()),
        name: ex.name,
        muscleGroup: ex.muscleGroup,
        setsReps: ex.sets, // <--- Ajustado de 'sets' para 'setsReps' para bater com o tipo Exercise
        weight: '0kg',
        restTime: '60s',
        videoUrl: ''
      });
      alert(`${ex.name} adicionado à ${selectedDay}!`);
    };
    return (
      <div className="min-h-screen bg-slate-950 text-white p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Biblioteca de Exercícios</h1>
          <Link to="/" className="text-purple-400 hover:underline">Voltar</Link>
        </div>

        <div className="mb-6">
          <label className="text-sm text-gray-400">Adicionar para:</label>
          <select 
            value={selectedDay} 
            onChange={(e) => setSelectedDay(e.target.value)}
            className="ml-2 bg-slate-900 border border-purple-900 p-2 rounded-lg text-sm"
          >
            {['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'].map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="grid gap-4">
          {exerciseLibrary.map((ex, i) => (
            <div key={i} className="bg-slate-900 p-4 rounded-xl border border-purple-900/40 flex justify-between items-center">
              <div>
                <h3 className="font-bold">{ex.name}</h3>
                <p className="text-xs text-purple-300">{ex.muscleGroup} • {ex.sets}</p>
              </div>
              <button 
                onClick={() => handleImport(ex)}
                className="bg-purple-600 px-4 py-2 rounded-lg text-xs font-bold cursor-pointer hover:bg-purple-700"
              >
                Adicionar
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }