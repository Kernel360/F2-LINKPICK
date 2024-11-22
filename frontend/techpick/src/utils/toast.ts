import toast from 'react-hot-toast';
import type { ToastOptions } from 'react-hot-toast';

export const notifyError = (errorMessage: string, option: ToastOptions = {}) =>
  toast.error(errorMessage, option);

export const notifySuccess = (message: string, option: ToastOptions = {}) =>
  toast.success(message, option);
