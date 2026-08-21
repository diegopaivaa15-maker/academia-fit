            import axios from 'axios';

            // Criamos uma instância do axios apontando para o meu backend
            const api = axios.create({
                baseURL: 'http://localhost:3000',
            });

            // Interceptor: Toda chamada que fizermos para a API passará por aqui antes
            api.interceptors.request.use((config) => {
                // Buscamos o token que salvamos quando o usuário fez login
                const token = localStorage.getItem('token');

                // Se existir um token, colocamos ele no cabeçalho (Authorization)
                if(token){
                    config.headers.Authorization = 'Bearer ${token}';
                }
                return config;
            });

            export default api;
        // Estamos configurando o "caminho" de dados. Sem essa configuração, seu Front-end ficaria cego, sem saber como conversar com o banco de dados que acabamos de migrar.