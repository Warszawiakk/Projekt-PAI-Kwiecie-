import { getServerSession } from 'next-auth';
import authOptions from './auth';

export async function isAuthenticated() {
  const session = await getServerSession(authOptions);
  return !!session;
}
