import { ROUTES } from '@/constants/route';
import { redirect } from 'next/navigation';

export default function FolderPage() {
  redirect(ROUTES.RECOMMEND);
}
