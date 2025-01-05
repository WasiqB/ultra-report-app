import { logger } from '@ultra-reporter/logger';
import { createClient } from '@ultra-reporter/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const origin = req.headers.get('origin') || 'http://localhost:3000';

    // Get the URL for Google OAuth sign-in
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        scopes: 'email profile',
      },
    });

    if (error) {
      logger.error('OAuth initialization failed', { error });
      return NextResponse.json(
        { error: 'Failed to start OAuth flow' },
        { status: 500 }
      );
    }

    if (!data.url) {
      logger.error('No OAuth URL returned');
      return NextResponse.json(
        { error: 'Invalid OAuth configuration' },
        { status: 500 }
      );
    }

    logger.info('OAuth flow initiated', { url: data.url });
    return NextResponse.json({ url: data.url }, { status: 200 });
  } catch (error) {
    logger.error('Unexpected error during OAuth initialization', { error });
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
