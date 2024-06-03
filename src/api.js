import axios from 'axios';

const BASE_URL = 'https://carrum-signup.uw.r.appspot.com/api/register';
// const BASE_URL = 'http://localhost:3001/api/register';


export const fetchRegisteredCount = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/users/count`);
        return response.data.count;
    } catch (error) {
        console.error('Error fetching registered count:', error);
        throw error;
    }
};

export const fetchParticipants = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch participants:', error);
        throw error;
    }
};

export const registerParticipant = async (formData) => {
    try {
        const response = await axios.post(BASE_URL, formData);
        return response;
    } catch (error) {
        throw error;
    }
};
