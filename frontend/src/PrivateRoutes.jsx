import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoutes = () => {
    const auth = localStorage.getItem('token');
    
    // Check if token exists and is not expired
    const isTokenValid = () => {
        if (!auth) return false; // No token
        const tokenData = JSON.parse(atob(auth.split('.')[1])); // Decode token payload
        const expiry = tokenData.exp * 1000; // Expiry time in milliseconds
        return new Date().getTime() < expiry; // Check if current time is before expiry
    };

    // If token is valid, render the child routes, otherwise navigate to login
    return isTokenValid() ? <Outlet /> : <Navigate to='/login' />;
};
