import { createMemoryRouter } from 'react-router-dom';
import { LoginGuard } from '@/components';
import { BookmarkPage, ErrorPage } from '@/pages';

export const router = createMemoryRouter([
  {
    path: '/',
    element: (
      <LoginGuard>
        <BookmarkPage />
      </LoginGuard>
    ),
    errorElement: <ErrorPage />,
    children: [],
  },
]);
