import { axiosInstanceWithInterceptors } from './helper';

export const api = axiosInstanceWithInterceptors(
  import.meta.env.VITE_API_HOST,
  () => 'Unknown error'
);
