// utils/config.ts
export const getConfig = () => {
  // Use window config if available (for runtime configuration)
  if (typeof window !== 'undefined' && (window as any).APP_CONFIG) {
    return (window as any).APP_CONFIG;
  }

  // Fallback to build-time environment variables
  return {
    API_URL: process.env.REACT_APP_API_URL || 'https://lokestore.in/api/v1',
    UPLOADS_URL: process.env.REACT_APP_UPLOADS_URL || 'https://lokestore.in/uploads'
  };
};

export const baseURL = 'https://lokestore.in';