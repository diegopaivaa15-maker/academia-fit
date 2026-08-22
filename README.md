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

O projeto foi planejado e desenvolvido aplicando conceitos sólidos de desenvolvimento fullstack, separação de responsabilidades (SoC) e fluxos de dados reativos:

### 1. Camada de Frontend (Interface & Reatividade)
* **React 18 & TypeScript:** Construção baseada em componentes reutilizáveis, garantindo tipagem estática rigorosa para payloads de treinos, usuários e exercicios, eliminando erros em tempo de execução.
* **Gerenciamento de Estado Reativo:** Hooks avançados do React (`useState`, `useEffect`, `useCallback`) para renderização otimizada em tempo real da dashboard do aluno e alteração de fichas diárias.
* **Design System com Tailwind CSS:** Interface totalmente responsiva construída sob o conceito *Mobile-First*, garantindo usabilidade fluida tanto em smartphones quanto em desktops.
* **Roteamento Protegido:** Uso do *React Router DOM* para gerenciamento de sessões e rotas restritas (fluxo de autenticação, painel principal e área de edição de treinos).

### 2. Camada de Backend & Banco de Dados (Persistência & Regras de Negócio)
* **Banco de Dados Relacional (MySQL):** 
  * Modelagem de dados relacional normalizada para garantir integridade referencial estrita.
  * Estruturação de tabelas dedicadas para **Usuários**, **Fichas Semanais** e **Exercícios**, assegurando que o histórico de cargas e evoluções dos alunos seja persistido de forma segura.
* **API RESTful:** 
  * Arquitetura de servidor estruturada para processar requisições HTTP assíncronas (GET, POST, PUT, DELETE).
  * Controladores e serviços voltados para o processamento de regras de treino e validação de dados recebidos do cliente.

### 3. Integração com APIs Nativas do Dispositivo
* **FileReader API & Input Nativo:** Implementação de seletores de arquivos no ecossistema web que se comunicam diretamente com a memória interna de computadores e a galeria de fotos de smartphones, permitindo o upload, conversão em buffer/base64 e renderização instantânea de imagens de perfil do usuário.

---
## 🚀 Funcionalidades Principais

* **🔐 Autenticação e Perfis Personalizados:** Gestão de sessões de usuário com persistência de dados de perfil sincronizados com o banco de dados.
* **📅 Gestão de Treinos por Dias da Semana:** CRUD dinâmico para organizar fichas de segunda a domingo.
* **⚙️ Detalhamento Avançado de Exercícios:** Registro por exercício contendo:
  * Nome e Grupo Muscular Direcionado.
  * Número de Séries e Repetições.
  * Carga utilizada (Peso em KG).
  * Intervalo de Tempo de Descanso.
  * Links diretos para vídeos de execução correta.
* **📱 Otimização Mobile-First:** Layout adaptável pensado para academias, permitindo uso prático direto pelo celular durante os treinos.
---
