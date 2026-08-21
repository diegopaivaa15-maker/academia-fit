// src/components/Layout.tsx
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const Layout = () => {
  const navigate = useNavigate();

  // Função para limpar os dados e voltar ao início
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      
      {/* ==========================================
          MENU SUPERIOR COMPARTILHADO
          ========================================== */}
      <header className="flex justify-center gap-4 p-4 border-b border-gray-800 bg-gray-950">
        <button 
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 bg-purple-600 rounded-lg font-medium hover:bg-purple-700 transition shadow-lg"
        >
          📱 Tela Inicial (Dashboard)
        </button>

        <button 
          onClick={() => navigate('/exercises')}
          className="px-4 py-2 bg-gray-800 rounded-lg font-medium hover:bg-gray-700 transition border border-gray-700"
        >
          🏋️‍♂️ Biblioteca de Exercícios
        </button>

        <button 
          onClick={handleLogout}
          className="px-4 py-2 bg-red-900 rounded-lg font-medium hover:bg-red-800 transition"
        >
          Sair
        </button>
      </header>

      {/* ==========================================
          ÁREA DINÂMICA (Renderiza o Dashboard ou a Biblioteca)
          ========================================== */}
      <main>
        <Outlet />
      </main>

    </div>
  );
};