    import { useState } from 'react';
    import axios from 'axios';
       
        export const Perfil = () => {
          const [nome, setNome] = useState('');
          const [email, setEmail] = useState('');
          const [foto, setFoto] = useState<File | null>(null);
          // 1. Adicionamos este estado para guardar a URL que o back-end nos devolve
          const [fotoUrl, setFotoUrl] = useState<string | null>(null);

          const handleSalvar = async (e: React.FormEvent) => {
            e. preventDefault();

            // O FormData é obrigatório para enviar arquivos via API
            const formData = new FormData();
            if (foto) formData.append('foto', foto);
            formData.append('nome', nome);
            formData.append('email', email);

            try {
            // 2. Capturamos a resposta do servidor
            const response = await axios.post('http://localhost:3000/auth/upload-foto', formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
            });

            // 3. Atualizamos a fotoUrl com o caminho retornado pelo back-end
            // Certifique-se que o seu Controller esteja retornando { url: "..." }
            setFotoUrl(response.data.url); 
            
            alert('Perfil e foto atualizado com sucesso!');
          } catch (error) {
            console.error('Erro ao salvar:', error);
            alert('Erro ao atualizar o perfil.'); 
          }
        };

       return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
     backgroundColor: '#e9d5ff' // Cor do fundo da tela de login
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '40px', 
        borderRadius: '20px', 
        width: '400px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '20px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ color: 'black', textAlign: 'center' }}>Editar Perfil</h1>
        
        <input style={inputStyle} type="text" placeholder="Nome" onChange={(e) => setNome(e.target.value)} />
        <input style={inputStyle} type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
        <input style={{ ...inputStyle, border: 'none', paddingLeft: 0 }} type="file" onChange={(e) => e.target.files && setFoto(e.target.files[0])} />
        
        <button 
            onClick={handleSalvar} 
            style={{ 
            backgroundColor: '#7e45da', 
            color: 'white', 
            padding: '12px', 
            border: 'none', 
            borderRadius: '10px', 
            cursor: 'pointer',
            fontWeight: 'bold' 
          }}
        >
          SALVAR ALTERAÇÕES
        </button>
        {/* Agora o bloco está DENTRO do return, dentro da div principal */}
        {fotoUrl && (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <p style={{ color: 'black' }}>Sua foto atual:</p>
            <img 
              src={fotoUrl} 
              alt="Perfil" 
              style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} 
            />
          </div>
        )}
      </div>
    </div>
  );
};
    // Estilo compartilhado para os inputs
      const inputStyle: React.CSSProperties = {
      padding: '12px',
      border: '1px solid #e5e7eb',
      borderRadius: '10px',
      width: '100%',
      boxSizing: 'border-box'
    };