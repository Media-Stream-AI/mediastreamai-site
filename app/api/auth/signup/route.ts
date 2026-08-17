import { NextRequest, NextResponse } from 'next/server';
import { createUser, generateToken, generateMagicLink } from '@/lib/auth';
import { sendWelcomeEmail } from '@/lib/email';
import { trackEvent, AnalyticsEvents } from '@/lib/analytics';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, plan, userType = 'viewer' } = await request.json();

    // Create user
    const user = await createUser(email, password, name, userType);

    // Generate JWT token
    const token = await generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      userType: user.user_type,
    });

    // Set cookie
    cookies().set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // Generate magic link
    const magicLink = await generateMagicLink(email);

    // Send welcome email
    await sendWelcomeEmail({
      name,
      email,
      plan,
      magicLink,
    });

    // Track analytics
    await trackEvent(user.id, AnalyticsEvents.SIGNUP_COMPLETED, { plan, userType });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error: any) {
    console.error('Signup error:', error);

    if (error.code === '23505') {
      // Duplicate email
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
    }

    return NextResponse.json({ error: 'Failed to create account' }, { status: 500 });
  }
}
