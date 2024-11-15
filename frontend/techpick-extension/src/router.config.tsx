import { createMemoryRouter } from 'react-router-dom';
import { LoginGuard } from '@/components';
import { BookmarkPage, LoginPage, ErrorPage } from '@/pages';

export const router = createMemoryRouter([
  {
    path: '/',
    element: (
      <LoginGuard>
        <BookmarkPage />
      </LoginGuard>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);
