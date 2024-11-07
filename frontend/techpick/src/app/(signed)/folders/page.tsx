import { redirect } from 'next/navigation';
import { ROUTES } from '@/constants';

export default function FolderPage() {
  redirect(ROUTES.FOLDERS_UNCLASSIFIED);
}
