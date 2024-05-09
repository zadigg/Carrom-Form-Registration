import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://carrum-signup.uw.r.appspot.com/api/register', formData);
            if (response.status === 201) {
                alert('Registration Successful!');
                setFormData({ fullName: '', email: '' }); // Reset form
            }
        } catch (error) {
            console.error('Failed to register:', error);
            alert('Registration failed!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Full Name:
                <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </label>
            <button type="submit">Register</button>
        </form>
    );
}

export default RegisterForm;
