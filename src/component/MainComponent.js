import React, { useState, useEffect } from 'react';
import ProjectJailBreakImage from '../asset/ProjectJailBreak.webp'; // Ensure this path is correct
import RegisterForm from './RegisterForm';
import ParticipantsList from './ParticipantsList';
import { fetchRegisteredCount, fetchParticipants, registerParticipant } from '../api';

const MainComponent = () => {
    const [view, setView] = useState('Register');  // 'Register' or 'participants'
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        registeredCount: 0
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const count = await fetchRegisteredCount();
            setFormData(prevState => ({ ...prevState, registeredCount: count }));
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (view === 'participants') {
            const fetchData = async () => {
                const data = await fetchParticipants();
                setParticipants(data);
            };
            fetchData();
        }
    }, [view]);

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
        setMessage({ text: '', type: '' });
        try {
            const response = await registerParticipant(formData);
            if (response.status === 201) {
                setMessage({ text: 'Registration Successful!', type: 'success' });
                setFormData({ fullName: '', email: '', registeredCount: formData.registeredCount + 1 });
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400 && error.response.data === "Registration full: we've reached our 32-participant limit!") {
                    setMessage({ text: error.response.data, type: 'error' });
                } else {
                    setMessage({ text: 'Registration failed! ' + error.response.data, type: 'error' });
                }
            } else {
                setMessage({ text: 'Registration failed! Check your network and try again.', type: 'error' });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleViewChange = (newView) => {
        setView(newView);
    };

    return (
        <div className="bg-white dark:bg-gray-900 flex">
            <div className="hidden lg:block lg:w-2/3 bg-cover" style={{ backgroundImage: `url(${ProjectJailBreakImage})` }}>
            </div>
            <div className="w-full max-w-md px-6 mx-auto lg:w-1/3 mt-14">
                <div className="bg-gray-50 px-5 py-3 dark:bg-gray-800 flex justify-between">
                    <button onClick={() => handleViewChange('Register')} className={view === 'Register' ? 'text-blue-700' : 'text-gray-500'}>Register</button>
                    <button onClick={() => handleViewChange('participants')} className={view === 'participants' ? 'text-blue-700' : 'text-gray-500'}>Participants</button>
                </div>
                <div className="flex flex-col justify-center mx-auto overflow-auto" style={{ height: 'calc(96.6vh - 5rem)' }}>
                    {view === 'Register' ? (
                        <RegisterForm onSubmit={handleSubmit} loading={loading} message={message} formData={formData} handleChange={handleChange} />
                    ) : (
                        <ParticipantsList participants={participants} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default MainComponent;
