import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' }); // Message state with text and type

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: '', type: '' }); // Clear previous messages
        try {
            const response = await axios.post('https://carrum-signup.uw.r.appspot.com/api/register', formData);
            if (response.status === 201) {
                setMessage({ text: 'Registration Successful!', type: 'success' });
                setFormData({ fullName: '', email: '' });
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 409) {
                    setMessage({ text: 'You are already registered.', type: 'error' });
                } else {
                    setMessage({ text: 'Registration failed! ' + error.response.data, type: 'error' });
                }
            } else {
                console.error('Failed to register:', error);
                setMessage({ text: 'Registration failed!', type: 'error' });
            }
        } finally {
            setLoading(false);
        }
    };

    const messageStyle = {
        color: message.type === 'error' ? '#ff0000' : '#008000', // Red for error, green for success
        textAlign: 'center',
        marginTop: '20px'
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f4f9' }}>
            <form onSubmit={handleSubmit} style={{ padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', backgroundColor: '#fff', width: '100%', maxWidth: '400px' }}>
                <h2 style={{ textAlign: 'center', color: '#333' }}>Register for Carrom Tournament</h2>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        Full Name:
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </label>
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
                {message.text && <div style={messageStyle}>{message.text}</div>}
            </form>
        </div>
    );
}

export default RegisterForm;
