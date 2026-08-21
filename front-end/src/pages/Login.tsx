import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// Interface que define as propriedades (props) aceitas pelo componente de Login.
// O 'onLoginSuccess' é uma função disparada pelo componente principal (App.tsx) para liberar o acesso ao sistema.
interface LoginProps {
  onLoginSuccess: () => void;
}

export const Login = ({ onLoginSuccess }: LoginProps) => {
  // ==========================================
  // 1. GERENCIAMENTO DE ESTADOS (STATE)
  // ==========================================
  
  // Controla qual tela/formulário principal está visível:
  // 'login' -> Tela de entrada (e-mail e senha)
  // 'registro' -> Tela de criação de conta (e-mail, senha e telefone)
  // 'recuperar' -> Tela de recuperação de senha via e-mail
  const [modo, setModo] = useState<'login' | 'registro' | 'recuperar'>('login');

  // Controla as etapas dentro do fluxo de login:
  // 'email' -> Primeiro pede o e-mail
  // 'senha' -> Depois que o e-mail é validado, pede a senha e mostra a foto de perfil
  const [etapaLogin, setEtapaLogin] = useState<'email' | 'senha'>('email');
  
  // Campos de dados preenchidos pelo usuário nos inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telefone, setTelefone] = useState(''); 

  // Armazena a URL da foto de perfil do usuário (em base64 ou link retornado pelo servidor)
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  // Referência para manipular diretamente o elemento HTML <input type="file" /> de forma invisível
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ==========================================
  // 2. CICLO DE VIDA (useEffect)
  // ==========================================
  // Executado apenas uma vez quando o componente é montado na tela.
  // Busca no navegador (localStorage) se já existe uma foto salva anteriormente para exibi-la imediatamente.
  useEffect(() => {
    const savedImage = localStorage.getItem('userImage');
    if (savedImage) setProfileImage(savedImage);
  }, []);

  // ==========================================
  // 3. FUNÇÕES DE REQUISIÇÃO E LÓGICA DE NEGÓCIO
  // ==========================================

  // Valida se o texto digitado possui '@' antes de avançar para a etapa de senha no login
  const handleAvancarLogin = () => {
    if (email.includes('@')) {
      setEtapaLogin('senha');
    } else {
      alert('Por favor, insira um e-mail válido contendo "@".');
    }
  };

  // Envia as credenciais para o back-end efetivar o login e resgatar o token de acesso
  const handleFinalizarLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password
      });

      console.log('Resposta da API de Login:', response.data);
      
      // Identifica o token independentemente se a API retorna como 'access_token' ou 'token'
      const token = response.data.access_token || response.data.token;

      if (token) {
        // Salva o token de segurança no armazenamento local do navegador
        localStorage.setItem('token', token);
        // Notifica o componente App.tsx para trocar a tela de login pelo painel principal
        onLoginSuccess();
      } else {
        alert('O login foi efetuado, mas a API não retornou um token válido.');
      }
    } catch (error) {
      alert('Erro ao conectar: Verifique se suas credenciais estão corretas.');
      console.error('Erro detalhado no login:', error);
    }
  };

  // Envia os dados de cadastro para a rota de registro do back-end
  const handleRegistrar = async () => {
    if (!email || !password || !telefone) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      await axios.post('http://localhost:3000/auth/register', {
        email,
        password,
        telefone
      });

      alert('Conta criada com sucesso! Faça login com suas novas credenciais.');
      setModo('login');
      setEtapaLogin('email');
    } catch (error) {
      alert('Erro ao registrar: Verifique se o e-mail já está em uso.');
      console.error('Erro detalhado no registro:', error);
    }
  };

  // Dispara a solicitação de recuperação de senha para o e-mail informado
  const handleRecuperarSenha = async () => {
    if (!email || !email.includes('@')) {
      alert('Digite um e-mail válido para receber as instruções.');
      return;
    }

    try {
      await axios.post('http://localhost:3000/auth/forgot-password', { email });
      alert('Instruções de recuperação enviadas para o seu e-mail!');
      setModo('login');
      setEtapaLogin('email');
    } catch (error) {
      alert('Erro ao solicitar recuperação. Verifique o e-mail digitado.');
      console.error('Erro detalhado na recuperação:', error);
    }
  };

  // Gerencia o upload e o envio da foto de perfil selecionada pelo usuário
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('foto', file); 

      try {
        const response = await axios.post('http://localhost:3000/upload-foto', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        setProfileImage(response.data.url); 
        localStorage.setItem('userImage', response.data.url); 
        alert('Foto de perfil salva com sucesso!');
      } catch (error) {
        alert('Erro ao enviar a imagem para o servidor.');
        console.error('Erro detalhado no upload:', error);
      }
    }
  };

  // ==========================================
  // 4. RENDERIZAÇÃO DA INTERFACE (JSX)
  // ==========================================
  return (
    // Container principal centralizado preenchendo toda a tela com fundo escuro (slate-950)
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      
      {/* Card central com borda sutil em roxo e efeito de sombra profunda */}
      <div style={{ backgroundColor: '#0f172a', width: '100%', maxWidth: '400px', padding: '30px', borderRadius: '25px', border: '1px solid rgba(147, 51, 234, 0.3)', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        
        {/* Título do Aplicativo */}
        <h1 style={{ fontFamily: 'serif', fontSize: '32px', fontWeight: 'bold', color: '#ffffff', textAlign: 'center', margin: '0 0 5px 0' }}>
          Paiva Fitness
        </h1>

        {/* Abas de navegação superior (Entrar / Criar Conta), ocultas apenas na tela de recuperação */}
        {modo !== 'recuperar' && (
          <div style={{ display: 'flex', width: '100%', backgroundColor: '#1e293b', borderRadius: '10px', padding: '4px', gap: '4px' }}>
            <button
              onClick={() => { setModo('login'); setEtapaLogin('email'); }}
              style={{ flex: 1, padding: '10px', borderRadius: '8px', backgroundColor: modo === 'login' ? '#9333ea' : 'transparent', color: '#ffffff', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '13px', transition: 'background 0.2s' }}
            >
              Entrar
            </button>
            <button
              onClick={() => setModo('registro')}
              style={{ flex: 1, padding: '10px', borderRadius: '8px', backgroundColor: modo === 'registro' ? '#9333ea' : 'transparent', color: '#ffffff', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '13px', transition: 'background 0.2s' }}
            >
              Criar Conta
            </button>
          </div>
        )}

        {/* Input de arquivo invisível acionado programaticamente */}
        <input type="file" ref={fileInputRef} onChange={handleImageChange} style={{ display: 'none' }} accept="image/*" />

        {/* Círculo da foto de perfil (exibido no modo registro ou na segunda etapa do login) */}
        {(modo === 'registro' || (modo === 'login' && etapaLogin === 'senha')) && (
          <div 
            onClick={() => fileInputRef.current?.click()} 
            style={{ 
              width: '90px', 
              height: '90px', 
              backgroundColor: '#1e293b', 
              borderRadius: '50%', 
              cursor: 'pointer', 
              backgroundImage: profileImage ? `url(${profileImage})` : 'none', 
              backgroundSize: 'cover', 
              backgroundPosition: 'center', 
              border: '2px solid #a855f7',
              boxShadow: '0 0 15px rgba(168, 85, 247, 0.4)'
            }}
            title="Clique para alterar a foto de perfil"
          />
        )}

        {/* ========================================== */}
        {/* SEÇÃO 1: FLUXO DE LOGIN                     */}
        {/* ========================================== */}
        {modo === 'login' && (
          <>
            {etapaLogin === 'email' ? (
              <>
                <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0' }}>Digite seu e-mail para continuar</p>
                <input 
                  placeholder="E-mail" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '15px', borderRadius: '12px', backgroundColor: '#1e293b', border: '1px solid rgba(147, 51, 234, 0.4)', color: '#ffffff', outline: 'none', boxSizing: 'border-box' }}
                />
                <button onClick={handleAvancarLogin} style={{ width: '100%', padding: '15px', backgroundColor: '#9333ea', color: 'white', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}>
                  CONTINUAR
                </button>
              </>
            ) : (
              <>
                <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0' }}>Olá, <strong style={{ color: '#c084fc' }}>{email}</strong></p>
                <input 
                  type="password"
                  placeholder="Senha" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: '100%', padding: '15px', borderRadius: '12px', backgroundColor: '#1e293b', border: '1px solid rgba(147, 51, 234, 0.4)', color: '#ffffff', outline: 'none', boxSizing: 'border-box' }}
                />
                <button onClick={handleFinalizarLogin} style={{ width: '100%', padding: '15px', backgroundColor: '#9333ea', color: 'white', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}>
                  ENTRAR
                </button>
                
                {/* Links auxiliares para trocar e-mail ou recuperar senha */}
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '12px', marginTop: '5px' }}>
                  <button onClick={() => setEtapaLogin('email')} style={{ background: 'none', border: 'none', color: '#a855f7', cursor: 'pointer', textDecoration: 'underline' }}>
                    Trocar e-mail
                  </button>
                  <button onClick={() => setModo('recuperar')} style={{ background: 'none', border: 'none', color: '#a855f7', cursor: 'pointer', textDecoration: 'underline' }}>
                    Esqueceu a senha?
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {/* ========================================== */}
        {/* SEÇÃO 2: FLUXO DE REGISTRO (CRIAR CONTA)    */}
        {/* ========================================== */}
        {modo === 'registro' && (
          <>
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0' }}>Preencha os dados para se cadastrar</p>
            <input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '15px', borderRadius: '12px', backgroundColor: '#1e293b', border: '1px solid rgba(147, 51, 234, 0.4)', color: '#ffffff', outline: 'none', boxSizing: 'border-box' }} />
            <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '15px', borderRadius: '12px', backgroundColor: '#1e293b', border: '1px solid rgba(147, 51, 234, 0.4)', color: '#ffffff', outline: 'none', boxSizing: 'border-box' }} />
            <input placeholder="Número de Telefone (WhatsApp)" value={telefone} onChange={(e) => setTelefone(e.target.value)} style={{ width: '100%', padding: '15px', borderRadius: '12px', backgroundColor: '#1e293b', border: '1px solid rgba(147, 51, 234, 0.4)', color: '#ffffff', outline: 'none', boxSizing: 'border-box' }} />
            <button onClick={handleRegistrar} style={{ width: '100%', padding: '15px', backgroundColor: '#9333ea', color: 'white', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}>
              CADASTRAR CONTA
            </button>
          </>
        )}

        {/* ========================================== */}
        {/* SEÇÃO 3: FLUXO DE RECUPERAÇÃO DE SENHA      */}
        {/* ========================================== */}
        {modo === 'recuperar' && (
          <>
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0', textAlign: 'center' }}>Informe seu e-mail para recuperar a senha</p>
            <input placeholder="E-mail cadastrado" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '15px', borderRadius: '12px', backgroundColor: '#1e293b', border: '1px solid rgba(147, 51, 234, 0.4)', color: '#ffffff', outline: 'none', boxSizing: 'border-box' }} />
            <button onClick={handleRecuperarSenha} style={{ width: '100%', padding: '15px', backgroundColor: '#9333ea', color: 'white', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}>
              ENVIAR RECUPERAÇÃO
            </button>
            <button onClick={() => setModo('login')} style={{ background: 'none', border: 'none', color: '#a855f7', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' }}>
              Voltar ao login
            </button>
          </>
        )}

      </div>
    </div>
  );
};