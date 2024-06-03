import React from 'react';

const RegisterForm = ({ onSubmit, loading, message, formData, handleChange }) => {
    return (
        <div className="-mt-14">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 text-center">Register for Carrom Tournament</h2>
            <p className="mt-1 text-gray-500 dark:text-gray-300 text-center">Join {formData.registeredCount} participants!</p>
            <form onSubmit={onSubmit} className="mt-4">
                <div>
                    <label htmlFor="fullName" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Full Name</label>
                    <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required
                           className="block w-full px-4 py-2 mt-2 bg-white text-gray-700 placeholder-gray-400 border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
                </div>
                <div className="mt-4">
                    <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email Address</label>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} placeholder="example@example.com" required
                           className="block w-full px-4 py-2 mt-2 bg-white text-gray-700 placeholder-gray-400 border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
                </div>
                <div className="mt-6">
                    <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </div>
            </form>
            {message.text && (
                <div className={`text-center mt-4 ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                    {message.text}
                </div>
            )}
             </div>
    );
};

export default RegisterForm;
