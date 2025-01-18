import { ThemeProvider } from '@/providers/ThemeProvider.tsx';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { PORTAL_CONTAINER_ID } from './constants/portalContainer';
import { router } from './router.config';
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
