const VITE_URL = import.meta.env.VITE_URL;

export const apiClient = {
  url: `${VITE_URL}/api/v1`,
  image_url: `${VITE_URL}/uploads`,
  headers: {
    'Content-Type': 'application/json',
  },
};
