import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5097/api',
    headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const verifyCode = (email, code) =>
    axios.create({ baseURL: 'http://localhost:5097/api/guest' }).post('/verify-code', { email, code });

export const register = (name, lastName, email, password, role = 'patient') =>
    axios.create({ baseURL: 'http://localhost:5097/api/guest' }).post('/register', { name, lastName, email, passwordHash: password, role });

export const getDoctors = (query, filter) =>
    axios.create({ baseURL: 'http://localhost:5097/api/guest' }).get('/doctors', { params: { query, filter } });

export const getSpecialities = () =>
    axios.create({ baseURL: 'http://localhost:5097/api/guest' }).get('/specialities');

export const getServices = (query) =>
    axios.create({ baseURL: 'http://localhost:5097/api/guest' }).get('/services', { params: { query } });

export const login = async (email, password) => {
    let response;
    try {
        console.log('Attempting login at /api/patient/login');
        response = await axios.create({ baseURL: 'http://localhost:5097/api/patient' }).post('/login', { email, password });
        console.log('Response from /api/patient/login:', response.data);
    } catch (err) {
        console.error('Error from /api/patient/login:', err.response?.data || err.message);
        if (err.response?.status === 400 && err.response?.data?.message === "Use /api/admin/login for admin accounts.") {
            console.log('Redirecting to /api/admin/login');
            try {
                response = await axios.create({ baseURL: 'http://localhost:5097/api/admin' }).post('/login', { email, password });
                console.log('Response from /api/admin/login:', response.data);
            } catch (adminErr) {
                console.error('Admin login error:', adminErr.response?.data || adminErr.message);
                throw adminErr;
            }
        } else {
            throw err;
        }
    }

    if (!response) {
        throw new Error('Login request failed: response is undefined');
    }

    const token = response.data.token;
    const user = response.data.user;
    if (!user) {
        console.warn('User data missing in response:', response.data);
    }
    localStorage.setItem('token', token || '');
    localStorage.setItem('user', JSON.stringify(user || {}));
    return response;
};

export const getMedicalRecord = (id) =>
    api.get(`/Patient/medical-record/${id}`);

export const getAppointments = (id) =>
    api.get(`/patient/appointments/${id}`);

export const bookAppointment = (data) =>
    api.post(`patient/appointments`, data);

export const addReview = (data) =>
    api.post(`/patient/reviews`, data);

export const addDoctor = (data) =>
    api.post(`/admin/add-doctor`, data);

export const addSpeciality = (data) =>
    api.post(`/admin/add-speciality`, data);

export const generateReport = () =>
    api.get(`/admin/generate-report`);

export const addSchedule = (data) =>
    api.post(`/admin/add-schedule`, data);

export const updateMedicalRecord = (data) =>
    api.post(`/admin/update-medical-record`, data);

export const addService = (data) =>
    api.post(`/admin/add-service`, data);

export default api;