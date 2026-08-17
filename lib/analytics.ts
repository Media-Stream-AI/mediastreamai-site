import { getPostgres } from './db';

export async function trackEvent(
  userId: string | null,
  eventType: string,
  eventData?: Record<string, any>
) {
  const pool = getPostgres();
  await pool.query(
    'INSERT INTO analytics_events (user_id, event_type, event_data) VALUES ($1, $2, $3)',
    [userId, eventType, eventData ? JSON.stringify(eventData) : null]
  );
}

// Common events
export const AnalyticsEvents = {
  // Signup funnel
  SIGNUP_STARTED: 'signup_started',
  SIGNUP_COMPLETED: 'signup_completed',
  PAYMENT_SUCCESS: 'payment_success',
  PAYMENT_FAILED: 'payment_failed',

  // Engagement
  FIRST_VIDEO_WATCHED: 'first_video_watched',
  VIDEO_WATCHED: 'video_watched',
  EPISODE_CREATED: 'episode_created',

  // Conversion
  TRIAL_STARTED: 'trial_started',
  TRIAL_CONVERTED: 'trial_converted',
  SUBSCRIPTION_CANCELLED: 'subscription_cancelled',

  // Navigation
  PAGE_VIEW: 'page_view',
  CTA_CLICKED: 'cta_clicked',
};

// Usage:
// await trackEvent(userId, AnalyticsEvents.SIGNUP_STARTED, { plan: 'premium' });
