// src/lib/apiClient.js

export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, "") || "https://music-recommender-api.onrender.com";
