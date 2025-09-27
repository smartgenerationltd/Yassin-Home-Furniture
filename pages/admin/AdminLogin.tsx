import React, { useState } from 'react';
import { useUserAuth } from '../../context/UserAuthContext';
import { useNavigate, Navigate, Link } from 'react-router-dom';

const AdminLogin: React.FC = () => {
    const { adminLogin, isAuthenticated } = useUserAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    if (isAuthenticated) {
        return <Navigate to="/admin/dashboard" />;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const success = await adminLogin(email, password);
            if (success) {
                navigate('/admin/dashboard');
            } else {
                setError('Invalid credentials. Please try again.');
            }
        } catch (err) {
            setError('An error occurred during login.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-brand-light">
            <div className="relative p-10 text-center bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
                <Link to="/" className="absolute top-4 left-4 flex items-center text-sm text-gray-500 hover:text-brand-primary transition-colors" aria-label="Go back to site">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Site
                </Link>
                <h1 className="text-4xl font-bold text-brand-dark font-serif mb-4">
                    Admin Login
                </h1>
                <p className="text-gray-600 mb-8">
                    Please sign in to access the dashboard.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                            required
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:z-10 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="password"className="sr-only">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:z-10 sm:text-sm"
                        />
                    </div>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-dark">
                            Sign in
                        </button>
                    </div>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/admin/signup" className="font-medium text-brand-primary hover:text-brand-dark">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;