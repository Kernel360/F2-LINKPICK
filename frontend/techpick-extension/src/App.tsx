import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/providers/ThemeProvider.tsx';
import { router } from './router.config';
import { PORTAL_CONTAINER_ID } from './constants';
import '@/styles/reset.css.ts';

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <Toaster />
      <div id={PORTAL_CONTAINER_ID} />
    </ThemeProvider>
  );
}

export default App;
