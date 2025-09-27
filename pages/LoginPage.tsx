import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useUserAuth } from '../context/UserAuthContext';
import { useNavigate, Navigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const { handleLoginSuccess, isAuthenticated } = useUserAuth();
    const navigate = useNavigate();

    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-brand-light">
            <div className="p-10 text-center bg-white rounded-xl shadow-2xl">
                <h1 className="text-4xl font-bold text-brand-dark font-serif mb-4">
                    Welcome to Yassin Home
                </h1>
                <p className="text-gray-600 mb-8">
                    Please sign in to continue with your Google account.
                </p>
                <div className="flex justify-center">
                    <GoogleLogin
                        onSuccess={(credentialResponse) => {
                            handleLoginSuccess(credentialResponse);
                            navigate('/');
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
