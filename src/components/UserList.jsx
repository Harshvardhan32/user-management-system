import React, { useEffect, useState } from 'react';
import { getUsers, updateUser, deleteUser } from '../services/api';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

const UserList = () => {

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [editUser, setEditUser] = useState(null);
    const [deletingUser, setDeletingUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, [page, updateUser, deleteUser]);

    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            const response = await getUsers(page);
            setUsers(response?.data);
            setTotalPages(response?.total_pages);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error.message);
            setIsLoading(false);
        }
    };

    const handleEdit = (user) => {
        setEditUser({ ...user });
        setIsModalOpen(true);
    };

    const handleUpdate = async () => {
        try {
            setIsLoading(true);
            await updateUser(editUser.id, editUser);
            setIsLoading(false);
            toast.success('User updated successfully!');
            setIsModalOpen(false);
            fetchUsers();
        } catch (error) {
            setIsLoading(false);
            toast.error('Error updating user!');
            console.error('Error updating user:', error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            setIsLoading(true);
            setDeletingUser(id);
            await deleteUser(id);
            setIsLoading(false);
            toast.success('User deleted successfully!');
            fetchUsers();
        } catch (error) {
            setIsLoading(false);
            toast.error('Error deleting user!');
            console.error('Error deleting user:', error.message);
        }
    };

    const filteredUsers = users.filter(user => {
        const search = searchTerm.toLowerCase();
        return (
            user.first_name.toLowerCase().includes(search) ||
            user.last_name.toLowerCase().includes(search) ||
            user.email.toLowerCase().includes(search)
        );
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
            {
                isLoading && users?.length === 0 ? <div className='flex justify-center items-center h-screen text-2xl font-bold text-gray-900 dark:text-white'>Loading...</div> :
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                            User Management
                        </h1>

                        <div className="mb-6">
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full max-w-md mx-auto block p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredUsers?.map((user) => (
                                <div key={user.id}
                                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300 border border-gray-100 dark:border-gray-700"
                                >
                                    <div className="relative">
                                        <img
                                            className="w-full h-48 object-cover"
                                            src={user.avatar}
                                            alt={`${user.first_name} ${user.last_name}`}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                            {user.first_name} {user.last_name}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 mb-4">{user.email}</p>
                                        <div className="flex space-x-3">
                                            <button
                                                onClick={() => handleEdit(user)}
                                                className="cursor-pointer flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                                            >
                                                <FiEdit2 className="w-4 h-4" />
                                                <span>Edit</span>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="cursor-pointer flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                                            >
                                                {(isLoading && user.id === deletingUser) ? 'Deleting...'
                                                    : <>
                                                        <FiTrash2 className="w-4 h-4" />
                                                        <span>Delete</span>
                                                    </>
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 flex justify-center space-x-2">
                            {[...Array(totalPages)]?.map((_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => setPage(i + 1)}
                                    className={`cursor-pointer px-6 py-2 rounded-lg transition-all duration-200 ${page === i + 1
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white shadow-md'
                                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>

                        {/* Modal */}
                        {isModalOpen && (
                            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 w-full max-w-md shadow-2xl transform transition-all">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                        Edit User
                                    </h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                value={editUser?.first_name}
                                                onChange={(e) => setEditUser({ ...editUser, first_name: e.target.value })}
                                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                                                placeholder="First Name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                value={editUser?.last_name}
                                                onChange={(e) => setEditUser({ ...editUser, last_name: e.target.value })}
                                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                                                placeholder="Last Name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                value={editUser?.email}
                                                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                                                placeholder="Email"
                                            />
                                        </div>
                                        <div className="flex space-x-3 mt-6">
                                            <button
                                                onClick={handleUpdate}
                                                className="cursor-pointer flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                                            >
                                                {(isLoading && editUser?.id === editUser?.id) ? 'Saving...' : 'Save Changes'}
                                            </button>
                                            <button
                                                onClick={() => setIsModalOpen(false)}
                                                className="cursor-pointer flex-1 bg-gray-500 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
            }
        </div>
    );
};

export default UserList;