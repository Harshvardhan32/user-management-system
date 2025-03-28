import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="text-center p-8">
                <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-4">
                    Page Not Found
                </h2>
                <p className="text-gray-500 dark:text-gray-500 mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="cursor-pointer px-6 py-2 rounded-lg transition-all duration-200 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white shadow-md bg-white dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                    Go Home
                </button>
            </div>
        </div>
    );
};

export default ErrorPage; 