// Central lead forwarding — every CTA capture on the site (trial signup, sales /
// enterprise contact, colocation enquiry, gated document downloads) is pushed
// into the MSAI sales platform (sales.mediastreamai.com) so it lands as a lead
// in the system. The destination is overridable via SALES_PLATFORM_WEBHOOK; if
// unset it defaults to the sales platform ingest endpoint. Forwarding never
// throws — a failure here must not drop the lead (other sinks still capture it).

export interface LeadRecord {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  interest: string;      // what the lead is about (segment/topic)
  message?: string;
  source: string;        // which surface captured it
  segment?: string;
  [k: string]: unknown;  // forward-compatible extra fields
}

const DEFAULT_SALES_WEBHOOK = 'https://sales.mediastreamai.com/api/leads';

/** Push a lead to the MSAI sales platform. Returns true if the POST was sent. */
export async function forwardLeadToSalesPlatform(record: LeadRecord): Promise<boolean> {
  const webhook = process.env.SALES_PLATFORM_WEBHOOK || DEFAULT_SALES_WEBHOOK;
  const token = process.env.SALES_PLATFORM_TOKEN;
  try {
    await fetch(webhook, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ ...record, created_at: new Date().toISOString(), platform: 'mediastreamai' }),
      // Never let a slow/unreachable CRM block the user's request for long.
      signal: AbortSignal.timeout ? AbortSignal.timeout(4000) : undefined,
    });
    return true;
  } catch (e) {
    console.error('sales platform forward failed', e);
    return false;
  }
}
