import React, { useState } from 'react';
import { useUserAuth } from '../../context/UserAuthContext';
import { useNavigate, Link, Navigate } from 'react-router-dom';

const AdminSignUp: React.FC = () => {
    const { adminSignUp, isAuthenticated } = useUserAuth();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    if (isAuthenticated) {
        return <Navigate to="/admin/dashboard" />;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            const result = await adminSignUp(name, email, password);
            if (result.success) {
                setMessage(result.message);
                setTimeout(() => navigate('/admin/login'), 2000); // Redirect after a short delay
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('An error occurred during sign up.');
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
                    Create Admin Account
                </h1>
                <p className="text-gray-600 mb-8">
                    Register a new administrator account.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="sr-only">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Full Name"
                            required
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:z-10 sm:text-sm"
                        />
                    </div>
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
                            minLength={6}
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:z-10 sm:text-sm"
                        />
                    </div>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    {message && <p className="text-sm text-green-600">{message}</p>}
                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-dark">
                            Sign Up
                        </button>
                    </div>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/admin/login" className="font-medium text-brand-primary hover:text-brand-dark">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default AdminSignUp;