import axios from 'axios';

// Base URL for backend API, provided by Vite env (prefix VITE_)
// Example: VITE_BACKEND_URI=http://localhost:3000
export const API_BASE: string = (import.meta as any).env?.VITE_BACKEND_URI || '';

export const api = axios.create({
  baseURL: API_BASE,
});
