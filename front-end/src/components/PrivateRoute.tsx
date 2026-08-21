        import { Navigate } from 'react-router-dom';
        import type { JSX } from 'react/jsx-runtime';

        export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
        const token = localStorage.getItem('token');

        // Se não houver token, redireciona para a tela de login
        return token ? children : <Navigate to="/login" />;
        };