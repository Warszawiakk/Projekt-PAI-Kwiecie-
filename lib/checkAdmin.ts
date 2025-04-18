import { getServerSession } from 'next-auth';
import authOptions  from '@/lib/auth';

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.admin === true;
}
