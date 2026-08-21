        import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

        // ==========================================
        // 1. DEFINIÇÃO DE TIPOS (TypeScript Interfaces)
        // ==========================================

        // Estrutura de um exercício individual
        export interface Exercise {
        id: string;          // Identificador único gerado por timestamp
        name: string;        // Nome do exercício (ex: Supino Reto)
        muscleGroup: string; // Grupo muscular alvo (Peito, Costas, etc.)
        setsReps: string;    // Quantidade de séries e repetições (ex: 3x 12)
        weight: string;      // Carga atual utilizada (ex: 20kg)
        restTime: string;    // Tempo de descanso entre as séries (ex: 60s)
        videoUrl?: string;   // Link opcional do YouTube para demonstração
        }

        // Contrato dos dados e funções que o contexto global vai expor para a aplicação
        interface WorkoutContextType {
        // Objeto onde a chave é o dia da semana e o valor é um array de exercícios (Record)
        workouts: Record<string, Exercise[]>;
        addExercise: (day: string, exercise: Exercise) => void;
        removeExercise: (day: string, id: string) => void;
        updateExerciseWeight: (day: string, id: string, newWeight: string) => void;
        }

        // Criação do Contexto React (inicialmente indefinido até ser envolvido pelo Provider)
        const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

        // ==========================================
        // 2. PROVEDOR DO CONTEXTO (WorkoutProvider)
        // ==========================================
        export function WorkoutProvider({ children }: { children: ReactNode }) {
        
        // LAZY INITIALIZATION DO ESTADO:
        // Usamos uma função de callback dentro do useState para ler o localStorage 
        // APENAS NA PRIMEIRA MONTAGEM DA APLICAÇÃO. Isso evita leituras desnecessárias 
        // no disco rígido a cada renderização, otimizando a performance.
        const [workouts, setWorkouts] = useState<Record<string, Exercise[]>>(() => {
            const saved = localStorage.getItem('my-workouts');
            // Se houver dados salvos, convertemos a string JSON de volta para Objeto.
            // Caso contrário, retornamos um objeto vazio para iniciar limpo.
            return saved ? JSON.parse(saved) : {};
        });

        // SINCRONIZAÇÃO AUTOMÁTICA COM O DISCO (useEffect):
        // Sempre que a variável 'workouts' sofrer qualquer alteração (adição, remoção, alteração de peso),
        // este gancho dispara e grava o estado atualizado no navegador (localStorage).
        useEffect(() => {
            localStorage.setItem('my-workouts', JSON.stringify(workouts));
        }, [workouts]);

        // ==========================================
        // 3. FUNÇÕES DE MANIPULAÇÃO DE ESTADO
        // ==========================================

        // Adiciona um novo exercício a um dia específico da semana
        const addExercise = (day: string, exercise: Exercise) => {
            setWorkouts(prev => ({
            ...prev,
            // Mantém os treinos anteriores do dia e adiciona o novo exercício no final do array
            [day]: [...(prev[day] || []), exercise]
            }));
        };

        // Remove um exercício específico com base no ID dentro de um dia da semana
        const removeExercise = (day: string, id: string) => {
            setWorkouts(prev => ({
            ...prev,
            // Filtra o array removendo o item cujo ID coincida
            [day]: prev[day].filter(ex => ex.id !== id)
            }));
        };

        // Atualiza apenas a carga (peso) de um exercício específico
        const updateExerciseWeight = (day: string, id: string, newWeight: string) => {
            setWorkouts(prev => ({
            ...prev,
            // Mapeia o array do dia, localiza o exercício pelo ID e substitui a propriedade 'weight'
            [day]: prev[day].map(ex => ex.id === id ? { ...ex, weight: newWeight } : ex)
            }));
        };

        // O Provider encapsula os filhos e distribui o objeto de valor global para toda a árvore de componentes
        return (
            <WorkoutContext.Provider value={{ workouts, addExercise, removeExercise, updateExerciseWeight }}>
            {children}
            </WorkoutContext.Provider>
        );
        }

        // ==========================================
        // 4. CUSTOM HOOK (useWorkouts)
        // ==========================================
        // Facilita o consumo do contexto nas telas e garante segurança contra erros de escopo
        export const useWorkouts = () => {
        const context = useContext(WorkoutContext);
        // Proteção: lança um erro descritivo se o desenvolvedor tentar usar o hook fora do provider
        if (!context) throw new Error('useWorkouts deve ser usado dentro de um WorkoutProvider');
        return context;
        };