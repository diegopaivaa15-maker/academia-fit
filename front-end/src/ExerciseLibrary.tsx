    import { useState, useEffect } from 'react';

    // ==========================================
    // 1. CONTRATO DE DADOS (Interface Exercise)
    // ==========================================
    // Define o formato dos dados que o front-end espera receber do back-end NestJS.
    interface Exercise {
      id: number;
      name: string;
      muscleGroup: string;
      subGroup?: string;       // O '?' indica que o subgrupo é opcional
      instructions?: string;
      videoUrl?: string;
    }

    export default function ExerciseLibrary() {
      // ==========================================
      // 2. ESTADOS DO COMPONENTE (React Hooks)
      // ==========================================
      const [exercises, setExercises] = useState<Exercise[]>([]);
      const [selectedGroup, setSelectedGroup] = useState<string>('Peito');
      const [selectedSubGroup, setSelectedSubGroup] = useState<string>('Todos');
      const [loading, setLoading] = useState<boolean>(false);
      const [error, setError] = useState<string | null>(null);

      // Estado booleano para abrir e fechar o Menu Hambúrguer dos grupos musculares
      const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

      // Lista estática com todos os principais grupos musculares da academia
      const muscleGroups = [
        'Abdominais', 'Peito', 'Costas', 'Pernas', 
        'Ombro', 'Bíceps', 'Triceps', 'Antebraço', 
        'Panturrilha', 'Trapezio', 'Glúteos'
      ];

      // ==========================================
      // 3. SUBGRUPOS DINÂMICOS
      // ==========================================
      // Retorna subgrupos específicos apenas para músculos que possuem divisões (como Ombro e Pernas)
      const getSubGroupsFor = (group: string) => {
        if (group === 'Ombro') {
          return ['Todos', 'Deltoide Anterior', 'Deltoide Lateral', 'Deltoide Posterior'];
        }
        if (group === 'Pernas') {
          return ['Todos', 'Quadríceps', 'Posterior de Coxa', 'Adutores'];
        }
        return ['Todos']; // Padrão para os demais grupos
      };

      // ==========================================
      // 4. COMUNICAÇÃO COM A API (NestJS)
      // ==========================================
      const fetchExercisesFromApi = async (groupToFetch: string, subGroupToFetch: string) => {
        try {
          // Inicia o estado de carregamento e limpa erros anteriores
          setLoading(true);
          setError(null);

          // Monta a rota base do endpoint no NestJS
          let requestUrl = `http://localhost:3000/exercises/${groupToFetch}`;
          
          // Se houver um subgrupo válido selecionado, acrescenta como Query Parameter na URL
          if (subGroupToFetch && subGroupToFetch !== 'Todos') {
            requestUrl += `?subGroup=${encodeURIComponent(subGroupToFetch)}`;
          }

          // Executa a requisição HTTP GET para a API
          const response = await fetch(requestUrl);

          // Se a resposta da API falhar (ex: status 404 ou 500), lança um erro
          if (!response.ok) {
            throw new Error('Falha ao comunicar com o servidor da API.');
          }

          // Converte o retorno da API para formato JSON estruturado
          const data: Exercise[] = await response.json();
          
          // Atualiza o estado com os exercícios vindos diretamente do banco de dados
          setExercises(data);

        } catch (err: any){
          // Captura qualquer erro de rede ou falha e guarda no estado
          setError(err.message || 'Erro desconhecido ao carregar dados.');
          setExercises([]); // Zera a lista para evitar dados corrompidos na tela
        } finally{
          // Independentemente de dar certo ou errado, desliga o indicador de carregamento
          setLoading(false);
        }
      };

      // ==========================================
      // 5. GATILHOS DE EXECUÇÃO (useEffect)
      // ==========================================
      // Disparado sempre que o usuário troca o grupo muscular principal no menu hambúrguer
    useEffect(() => {
      setSelectedGroup('Todos'); // Reseta o filtro secundário para 'Todos'
      fetchExercisesFromApi(selectedGroup, 'Todos');
    }, [selectedGroup]);
    
    // Disparado sempre que o usuário altera o subgrupo
    useEffect(() =>{
      fetchExercisesFromApi(selectedGroup, selectedGroup);
    }, [selectedGroup]);
    
    // ==========================================
      // 6. RENDERIZAÇÃO DA INTERFACE (JSX)
      // ==========================================
    return (
        // Container principal ocupando 100% da largura, fundo escuro e espaçamento inferior
        <div className="w-full bg-slate-950 text-white pb-12">
          <h1 className="text-2xl font-bold mb-6 text-white">Biblioteca de Exercícios (API Conectada)</h1>
          
          {/* ========================================== */}
          {/* MENU HAMBÚRGUER DE SELEÇÃO DE MÚSCULOS      */}
          {/* ========================================== */}
          <div className="relative mb-6">
            {/* Botão principal que ativa a abertura/fechamento do menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-full md:w-96 bg-slate-900 border border-purple-900/50 text-white font-medium py-3 px-4 rounded-xl shadow-lg flex items-center justify-between hover:bg-slate-800 transition-colors"
            >
              <span className="flex items-center gap-2">
                <span className="text-purple-400">📂 Grupo Selecionado:</span> 
                <strong className="text-white">{selectedGroup}</strong>
              </span>
              <span className="text-purple-400 text-lg">☰</span>
            </button>

            {/* Lista suspensa (Dropdown) listando todos os nomes dos grupos */}
            {isMenuOpen && (
              <div className="absolute left-0 mt-2 w-full md:w-96 bg-slate-900 border border-purple-900/50 rounded-xl shadow-2xl z-50 overflow-hidden">
                {muscleGroups.map((group) => (
                  <button
                    key={group}
                    onClick={() => {
                      setSelectedGroup(group); // Altera o grupo principal
                      setIsMenuOpen(false);      // Fecha o menu automaticamente após o clique
                    }}
                    className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors border-b border-slate-800/50 last:border-none ${
                      selectedGroup === group
                        ? 'bg-purple-600/30 text-purple-300 font-bold border-l-4 border-purple-500' // Estilo ativo
                        : 'text-gray-300 hover:bg-purple-950/40 hover:text-white'                  // Estilo padrão e hover
                    }`}
                  >
                    {group}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ========================================== */}
          {/* SUBGRUPOS DINÂMICOS                        */}
          {/* ========================================== */}
          {getSubGroupsFor(selectedGroup).length > 1 && (
            <div className="flex flex-wrap gap-2 pb-4 mb-6 border-b border-purple-900/30">
              {getSubGroupsFor(selectedGroup).map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubGroup(sub)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedSubGroup === sub
                      ? 'bg-purple-600 text-white shadow'
                      : 'bg-slate-900 text-purple-300 border border-purple-900/30 hover:bg-slate-800'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}

          {/* ========================================== */}
          {/* TRATAMENTO DE ESTADOS (Carregamento / Erro)*/}
          {/* ========================================== */}
          {/* Mensagem exibida enquanto a API processa os dados */}
          {loading && (
            <div className="text-center text-purple-400 py-16 font-medium animate-pulse">
              🔄 Consultando banco de dados da API...
            </div>
          )}
          
          {/* Mensagem exibida se houver falha de conexão com o servidor */}
          {error && !loading && (
            <div className="bg-red-950/30 border border-red-900/50 p-5 rounded-2xl text-center text-red-300">
              ⚠️ Não foi possível carregar os exercícios. Verifique se a API do NestJS está rodando na porta 3000. ({error})
            </div>
          )}

          {/* ========================================== */}
          {/* GRID DE EXERCÍCIOS RETORNADOS PELA API      */}
          {/* ========================================== */}
          {/* Aviso se a API responder com sucesso, mas a lista estiver vazia */}
          {!loading && !error && exercises.length === 0 && (
            <div className="bg-slate-900 border border-purple-900/30 p-8 rounded-2xl text-center text-purple-300">
              Nenhum exercício cadastrado no banco de dados para este filtro.
            </div>
          )}

          {/* Renderização dinâmica dos cards preenchidos pelos dados reais da API */}
          {!loading && !error && exercises.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {exercises.map((exercise) => (
                <div 
                  key={exercise.id} 
                  className="bg-slate-900 border border-purple-900/30 p-5 rounded-2xl shadow-xl flex flex-col justify-between hover:border-purple-600/50 transition-all"
                >
                  <div>
                    <h3 className="font-semibold text-lg text-white mb-2">{exercise.name}</h3>
                    
                    {/* Badges de identificação das tags vindas da API */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-purple-950 text-purple-300 border border-purple-800/40 text-xs px-2.5 py-1 rounded-md font-medium">
                        {exercise.muscleGroup}
                      </span>
                      {exercise.subGroup && (
                        <span className="bg-slate-800 text-gray-300 text-xs px-2.5 py-1 rounded-md">
                          {exercise.subGroup}
                        </span>
                      )}
                    </div>

                    {exercise.instructions && (
                      <p className="text-sm text-gray-400">{exercise.instructions}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }