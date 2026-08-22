# 🏋️ Fitness - Sistema de Gestão de Treinos Fullstack

> ** Fitness** é uma aplicação web fullstack de nível profissional, desenvolvida para proporcionar uma experiência completa de gestão de treinos. O sistema integra uma interface moderna e responsiva a um backend robusto com banco de dados relacional, permitindo controle total de fichas, progressão de carga e personalização de perfil.

---

## 📸 Demonstração do Projeto
<img width="1366" height="589" alt="image" src="https://github.com/user-attachments/assets/73ea91b6-edee-4702-a694-a5b1b30ebc7d" />
<img width="1342" height="597" alt="02" src="https://github.com/user-attachments/assets/56ecc7f2-4ef2-4d8f-87f8-06bf94b3ff49" />
<img width="1342" height="596" alt="03" src="https://github.com/user-attachments/assets/fb6368ff-ec64-45ea-b796-2a6a5f39b97b" />
<img width="1346" height="604" alt="04" src="https://github.com/user-attachments/assets/6e960200-c393-4dc3-b31a-68038a2d2c6b" />

![Dashboard Cronos Fitness](./print-app.png)

---

## 🛠️ Arquitetura & Stack Tecnológica

Este projeto foi desenhado com foco em escalabilidade e organização de dados:

### Frontend (Interface & UX)
* **React 18+ com TypeScript:** Interface altamente reativa e tipagem rigorosa para evitar erros em tempo de execução.
* **Tailwind CSS:** Design System moderno, responsivo e com foco em performance (Dark Mode).
* **React Router DOM:** Gerenciamento de rotas para navegação fluida (Login, Dashboard, Biblioteca de Exercícios).
* **Integração Nativa:** Uso de `FileReader API` e inputs de arquivos nativos para acesso direto à galeria/memória do dispositivo (celular/PC) para personalização de perfil.

### Backend & Banco de Dados (Camada de Dados)
* **Estrutura Fullstack:** Integração completa entre front e back para persistência de informações.
* **Banco de Dados Relacional (MySQL):** Modelagem profissional de dados para garantir integridade das informações de usuários, perfis e fichas de treino.
* **Persistência de Dados:** Implementação de operações CRUD (Create, Read, Update, Delete) completas, garantindo que o progresso do aluno seja salvo de forma segura no banco de dados.

---

## ✨ Funcionalidades do Sistema

* **🔐 Autenticação & Perfil de Aluno:** Gerenciamento de sessão com persistência de dados do usuário e galeria de fotos integrada ao banco.
* **📅 Biblioteca de Treinos (CRUD Completo):** 
    * Gestão semanal de treinos (segunda a domingo).
    * Cadastro detalhado: nome do exercício, grupo muscular, séries, repetições, carga e tempo de descanso.
* **⚙️ Controle de Carga e Progresso:** Acompanhamento de métricas individuais de treino com comunicação direta com o banco de dados.
* **📱 Design Mobile-First:** Experiência otimizada para todos os tamanhos de tela.

---

## 🚀 Como Executar o Projeto Localmente

Certifique-se de ter o **Node.js** e o **MySQL** configurados em sua máquina.

```bash
# 1. Clone o repositório
git clone [https://github.com/diegopaivaa15-maker/academia-fit.git](https://github.com/diegopaivaa15-maker/academia-fit.git)

# 2. Entre na pasta
cd academia-fit

# 3. Instale as dependências
npm install

# 4. Configure o banco de dados (MySQL)
# (Importe o script de estrutura fornecido no projeto)

# 5. Inicie o servidor
npm run dev

### O que mudou:
1. **Destaque ao Banco de Dados:** Deixamos claro que você utilizou **MySQL** e que o sistema possui uma modelagem relacional de dados.
2. **Camada de Backend:** Reforcei que o sistema não é apenas um "Front", mas que possui integração fullstack real com operações CRUD.
3. **Profissionalismo:** O tom do texto está mais técnico, focando em "integridade de dados", "modelagem" e "camada de persistência", que são termos que os recrutadores adoram ver.

Agora é só dar o **Commit** no GitHub com esse texto, anexar a imagem e estaremos prontos para o LinkedIn!  Me avise quando estiver ok.
