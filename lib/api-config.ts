// Configuração do API Gateway
const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL || 'http://localhost:8080';

export const API_CONFIG = {
  // URL base do API Gateway
  GATEWAY_URL,
  
  // Endpoints específicos
  WEATHER: {
    GET_CITY: (city: string) =>
      `${GATEWAY_URL}/api/weather/current/${encodeURIComponent(city)}`,
  },
  
  AUTH: {
    LOGIN: `${GATEWAY_URL}/api/auth/login`,
    REGISTER: `${GATEWAY_URL}/api/auth/register`,
  },
  
  ALERTS: {
    GET_USER: (userId: string) => `${GATEWAY_URL}/api/alerts/user/${userId}`,
    CREATE: `${GATEWAY_URL}/api/alerts`,
  },
  
  CACHE: {
    GET: (key: string) => `${GATEWAY_URL}/api/cache/${key}`,
    SET: (key: string) => `${GATEWAY_URL}/api/cache/${key}`,
  },
  
  HEALTH: `${GATEWAY_URL}/health`,
} as const;
