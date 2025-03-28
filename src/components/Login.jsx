import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            navigate('/users');
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await login(email, password);
            localStorage.setItem('token', response?.token);
            setIsLoading(false);
            toast.success('Login successful!');
            navigate('/users');
        } catch (err) {
            setIsLoading(false);
            setError('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-2xl">
                {/* Header Section */}
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                    <p className="text-gray-600">Please sign in to your account</p>
                </div>

                {/* Error Alert */}
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Login Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="cursor-pointer group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-xl"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-indigo-200 group-hover:text-indigo-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </span>
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>

                    {/* Optional: Demo Credentials */}
                    <div className="text-center text-sm text-gray-600">
                        <p>Demo credentials:</p>
                        <p className="font-mono bg-gray-50 p-2 rounded mt-1">
                            Email: eve.holt@reqres.in<br />
                            Password: cityslicka
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;