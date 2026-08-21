import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';

// ==========================================
// INTERFACES (Tipagem do TypeScript)
// ==========================================
interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  setsReps: string;
  weight: string;
  restTime: string;
  videoUrl?: string;
}

interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
}

// ==========================================
// 0. COMPONENTE: TELA DE LOGIN E CADASTRO
// ==========================================
function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Foto padrão inicial
  const [avatarUrl, setAvatarUrl] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200');
  
  const navigate = useNavigate();

  // Função para abrir a galeria do celular ou PC e carregar a imagem selecionada
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setAvatarUrl(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    if (isRegistering && !name) {
      alert('Por favor, informe seu nome.');
      return;
    }

    const userData: UserProfile = {
      name: isRegistering ? name : (name || 'Diego Paiva'),
      email,
      avatarUrl
    };
    localStorage.setItem('@Cronos:user', JSON.stringify(userData));

    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-white flex items-center justify-center p-6 font-sans">
      <div className="bg-[#0c1017] border border-purple-900/40 p-8 rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Fitness
          </h1>
          <p className="text-xs text-purple-300/70 mt-1">
            {isRegistering ? 'Crie sua conta de aluno' : 'Acesse sua conta para treinar'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* SEÇÃO DE FOTO COM ACESSO À GALERIA (CLICÁVEL) */}
          <div className="flex flex-col items-center justify-center mb-4">
            <label className="relative group cursor-pointer block" title="Clique para escolher uma foto da galeria">
              <div className="w-20 h-20 rounded-full border-2 border-purple-500 overflow-hidden shadow-lg bg-purple-950 flex items-center justify-center transition-transform group-hover:scale-105">
                <img src={avatarUrl} alt="Avatar Preview" className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-[10px] font-bold text-white text-center px-1">
                Alterar Foto
              </div>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                className="hidden" 
              />
            </label>
            <span className="text-[11px] text-purple-300/70 mt-2">Clique na foto para abrir a galeria</span>
          </div>

          {isRegistering && (
            <div>
              <label className="block text-xs font-semibold text-purple-300/80 mb-1">Nome Completo</label>
              <input
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#07090e] border border-purple-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 text-sm"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-purple-300/80 mb-1">E-mail</label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#07090e] border border-purple-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-purple-300/80 mb-1">Senha</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#07090e] border border-purple-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 font-semibold py-3.5 rounded-xl transition-all cursor-pointer text-white shadow-lg mt-4"
          >
            {isRegistering ? 'Cadastrar e Entrar' : 'Entrar no Sistema'}
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-xs text-purple-300/80 hover:text-white transition-colors cursor-pointer"
          >
            {isRegistering ? 'Já tem uma conta? Faça login' : 'Não tem conta? Cadastre-se aqui'}
          </button>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 1. COMPONENTE: TELA DE DASHBOARD DO ALUNO
// ==========================================
function Dashboard() {
  const [user, setUser] = useState<UserProfile>({
    name: 'Diego Paiva',
    email: 'diego@email.com',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('@Cronos:user');
    if (savedUser) {
      try { setUser(JSON.parse(savedUser)); } catch (e) { console.error(e); }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#07090e] text-white p-6 max-w-6xl mx-auto font-sans">
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
        {/* BOTÃO DE SAIR VOLTANDO PARA O LOGIN */}
        <Link 
          to="/login"
          className="bg-red-950/60 hover:bg-red-900/60 text-red-300 border border-red-900/50 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
        >
          Sair
        </Link>
      </nav>

      <div className="bg-[#0c1017] border border-purple-900/30 p-6 rounded-2xl mb-8 flex justify-between items-center shadow-lg relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full border-2 border-purple-500 overflow-hidden bg-purple-950 flex-shrink-0">
            <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="text-[10px] tracking-widest uppercase font-bold text-purple-400 block mb-1">
              Aluno Conectado
            </span>
            <h2 className="text-xl font-bold text-white">{user.name}</h2>
            <p className="text-xs text-purple-300/60">{user.email}</p>
          </div>
        </div>
        <div className="bg-purple-950/50 border border-purple-800/40 text-purple-300 text-xs px-4 py-1.5 rounded-full font-medium">
          Plano Aluno Ativo
        </div>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold tracking-wide text-white">Dashboard do Aluno</h1>
        <p className="text-sm text-purple-300/70 mt-1">Acompanhe abaixo suas métricas, metas e o progresso dos seus treinos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#0c1017] border border-purple-900/30 p-6 rounded-2xl text-center shadow-lg">
          <span className="text-xs text-purple-300/70 uppercase tracking-wider block mb-2">Treinos Realizados</span>
          <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-1">
            12 / 16
          </div>
          <span className="text-xs text-purple-300/50">75% da meta mensal concluída</span>
        </div>

        <div className="bg-[#0c1017] border border-purple-900/30 p-6 rounded-2xl text-center shadow-lg">
          <span className="text-xs text-purple-300/70 uppercase tracking-wider block mb-2">Calorias Queimadas</span>
          <div className="text-3xl font-extrabold text-white mb-1">
            4.850 <span className="text-xl font-bold text-purple-400">kcal</span>
          </div>
          <span className="text-xs text-purple-300/50">Média de 485 kcal por sessão</span>
        </div>

        <div className="bg-[#0c1017] border border-purple-900/30 p-6 rounded-2xl text-center shadow-lg">
          <span className="text-xs text-purple-300/70 uppercase tracking-wider block mb-2">Meta de Frequência</span>
          <div className="text-2xl font-extrabold text-purple-300 mb-1">
            4x <span className="text-lg font-normal text-white">por semana</span>
          </div>
          <span className="text-xs text-purple-300/50">Excelente constância!</span>
        </div>
      </div>

      <div className="bg-[#0c1017] border border-purple-900/30 p-8 rounded-2xl text-center shadow-xl">
        <div className="flex items-center justify-center gap-2 text-purple-400 font-semibold text-sm mb-2">
          <span>🚀 Próximo Treino Agendado</span>
        </div>
        <p className="text-sm text-purple-200/80 mb-6">
          Treino A – Foco em Membros Superiores (Peito e Tríceps)
        </p>
        <Link 
          to="/exercises"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-lg cursor-pointer"
        >
          Iniciar Sessão de Treino
        </Link>
      </div>
    </div>
  );
}

// ==========================================
// 2. COMPONENTE: BIBLIOTECA DE EXERCÍCIOS
// ==========================================
function Exercises() {
  const [selectedDay, setSelectedDay] = useState<string>('Segunda-feira');
  
  const [workouts, setWorkouts] = useState<Record<string, Exercise[]>>(() => {
    const saved = localStorage.getItem('@Cronos:workouts');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return {
      'Segunda-feira': [], 'Terça-feira': [], 'Quarta-feira': [],
      'Quinta-feira': [], 'Sexta-feira': [], 'Sábado': [], 'Domingo': []
    };
  });

  useEffect(() => {
    localStorage.setItem('@Cronos:workouts', JSON.stringify(workouts));
  }, [workouts]);

  const [name, setName] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('Peito');
  const [setsReps, setSetsReps] = useState('3x 12');
  const [weight, setWeight] = useState('');
  const [restTime, setRestTime] = useState('60s');
  const [videoUrl, setVideoUrl] = useState('');

  const days = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];

  const handleAddExercise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newExercise: Exercise = {
      id: String(Date.now()),
      name,
      muscleGroup,
      setsReps,
      weight,
      restTime,
      videoUrl,
    };

    setWorkouts(prev => ({
      ...prev,
      [selectedDay]: [...(prev[selectedDay] || []), newExercise]
    }));

    setName('');
    setWeight('');
    setVideoUrl('');
  };

  const removeExercise = (id: string) => {
    setWorkouts(prev => ({
      ...prev,
      [selectedDay]: (prev[selectedDay] || []).filter(item => item.id !== id)
    }));
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-white p-6 max-w-6xl mx-auto font-sans">
      <nav className="flex justify-between items-center bg-[#0c1017] p-4 rounded-2xl border border-purple-900/30 mb-6 shadow-md">
        <Link 
          to="/dashboard" 
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm px-4 py-2.5 rounded-xl transition-all shadow-lg flex items-center gap-2"
        >
          ← Voltar ao Dashboard
        </Link>
        <span className="text-xs text-purple-300/70">Gerencie e monte seus treinos semanais</span>
      </nav>

      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold tracking-wide text-white">Biblioteca de Exercícios</h1>
        <p className="text-sm text-purple-300/70 mt-1">Selecione o dia da semana para consultar ou gerenciar os exercícios da ficha.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
        {days.map((day) => {
          const count = workouts[day]?.length || 0;
          const isSelected = selectedDay === day;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`p-4 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                isSelected ? 'bg-purple-600 border-purple-400 shadow-lg text-white' : 'bg-[#0c1017] border-purple-900/40 text-purple-200 hover:border-purple-600/50'
              }`}
            >
              <span className="font-semibold text-sm">{day}</span>
              <span className="text-xs mt-1 opacity-80">{count} {count === 1 ? 'exercício' : 'exercícios'}</span>
            </button>
          );
        })}
      </div>

      <div className="bg-[#0c1017] border border-purple-900/40 p-6 rounded-2xl shadow-xl mb-8">
        <h2 className="text-sm font-bold text-purple-300 text-center mb-6 uppercase tracking-wider">
          + Adicionar Exercício para {selectedDay.toUpperCase()}
        </h2>
        
        <form onSubmit={handleAddExercise} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-purple-300/80 mb-1">Nome do Exercício</label>
            <input
              type="text"
              placeholder="Ex: Supino Reto"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#07090e] border border-purple-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-purple-300/80 mb-1">Grupo Muscular</label>
            <select
              value={muscleGroup}
              onChange={(e) => setMuscleGroup(e.target.value)}
              className="w-full bg-[#07090e] border border-purple-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 text-sm"
            >
              <option value="Peito">Peito</option>
              <option value="Costas">Costas</option>
              <option value="Pernas">Pernas</option>
              <option value="Ombros">Ombros</option>
              <option value="Braços">Braços</option>
              <option value="Abdomen">Abdomen</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-purple-300/80 mb-1">Séries e Repetições</label>
            <input
              type="text"
              value={setsReps}
              onChange={(e) => setSetsReps(e.target.value)}
              className="w-full bg-[#07090e] border border-purple-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-purple-300/80 mb-1">Carga / Peso</label>
            <input
              type="text"
              placeholder="Ex: 20kg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full bg-[#07090e] border border-purple-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-purple-300/80 mb-1">Tempo de Descanso</label>
            <input
              type="text"
              value={restTime}
              onChange={(e) => setRestTime(e.target.value)}
              className="w-full bg-[#07090e] border border-purple-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-purple-300/80 mb-1">Link do YouTube (Opcional)</label>
            <input
              type="text"
              placeholder="Cole a URL do vídeo aqui"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full bg-[#07090e] border border-purple-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 text-sm"
            />
          </div>

          <button
            type="submit"
            className="md:col-span-3 w-full bg-purple-600 hover:bg-purple-700 font-semibold py-3.5 rounded-xl transition-all cursor-pointer text-white shadow-lg mt-2"
          >
            Adicionar à Ficha de {selectedDay}
          </button>
        </form>
      </div>

      <div>
        <h3 className="text-center font-bold text-base text-purple-300 mb-4">
          📋 Exercícios Para {selectedDay} ({workouts[selectedDay]?.length || 0})
        </h3>
        
        <div className="grid grid-cols-1 gap-4">
          {workouts[selectedDay]?.length === 0 ? (
            <p className="text-center text-purple-300/60 text-sm py-8 bg-[#0c1017] rounded-2xl border border-purple-900/20">
              Nenhum exercício cadastrado para este dia.
            </p>
          ) : (
            workouts[selectedDay]?.map((exercise) => (
              <div key={exercise.id} className="bg-[#0c1017] border border-purple-900/40 p-5 rounded-2xl flex justify-between items-center shadow-md">
                <div>
                  <h4 className="font-bold text-white text-base">{exercise.name}</h4>
                  <div className="flex flex-wrap gap-4 mt-2 text-xs text-purple-300/80">
                    <span className="bg-purple-950/40 px-2.5 py-1 rounded-md border border-purple-900/30">Grupo: {exercise.muscleGroup}</span>
                    <span className="bg-purple-950/40 px-2.5 py-1 rounded-md border border-purple-900/30">Séries/Reps: {exercise.setsReps}</span>
                    <span className="bg-purple-950/40 px-2.5 py-1 rounded-md border border-purple-900/30">Carga: {exercise.weight || 'Não informada'}</span>
                    <span className="bg-purple-950/40 px-2.5 py-1 rounded-md border border-purple-900/30">Descanso: {exercise.restTime}</span>
                  </div>
                </div>
                <button
                  onClick={() => removeExercise(exercise.id)}
                  className="text-red-400 hover:text-red-300 text-xs bg-red-950/40 border border-red-900/30 px-4 py-2 rounded-xl transition-colors cursor-pointer font-medium"
                >
                  Remover
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. ROTEAMENTO PRINCIPAL
// ==========================================
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}