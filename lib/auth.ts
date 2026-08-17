import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { getPostgres } from './db';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key-change-this');

export interface User {
  id: string;
  email: string;
  name: string;
  userType: 'viewer' | 'creator' | 'enterprise';
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function generateToken(user: User): Promise<string> {
  return new SignJWT({
    id: user.id,
    email: user.email,
    name: user.name,
    userType: user.userType,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .setIssuedAt()
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<User | null> {
  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    return verified.payload as unknown as User;
  } catch {
    return null;
  }
}

export async function createUser(email: string, password: string, name: string, userType: string) {
  const passwordHash = await hashPassword(password);
  const pool = getPostgres();

  const result = await pool.query(
    `INSERT INTO users (email, name, password_hash, user_type, email_verified)
     VALUES ($1, $2, $3, $4, FALSE)
     RETURNING id, email, name, user_type`,
    [email, name, passwordHash, userType]
  );

  return result.rows[0];
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const pool = getPostgres();
  const result = await pool.query(
    'SELECT id, email, name, password_hash, user_type FROM users WHERE email = $1',
    [email]
  );

  if (result.rows.length === 0) return null;

  const user = result.rows[0];
  const valid = await verifyPassword(password, user.password_hash);

  if (!valid) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    userType: user.user_type,
  };
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = cookies();
  const token = cookieStore.get('auth-token');

  if (!token) return null;

  return verifyToken(token.value);
}

export async function generateMagicLink(email: string): Promise<string> {
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(JWT_SECRET);

  return `${process.env.NEXT_PUBLIC_URL}/auth/magic?token=${token}`;
}
