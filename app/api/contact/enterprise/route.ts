import { NextRequest, NextResponse } from 'next/server';
import { sendEnterpriseContactNotification } from '@/lib/email';
import { getMongoDb } from '@/lib/db';
import { forwardLeadToSalesPlatform } from '@/lib/leads';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // Save to database
    const db = await getMongoDb();
    await db.collection('enterprise_contacts').insertOne({
      ...formData,
      created_at: new Date(),
      status: 'new',
    });

    // Send notification email
    await sendEnterpriseContactNotification(formData);

    // Push into the MSAI sales platform (non-blocking).
    void forwardLeadToSalesPlatform({
      name: String(formData.name || formData.contactName || ''),
      email: String(formData.email || ''),
      company: String(formData.company || ''),
      phone: String(formData.phone || ''),
      interest: 'Enterprise / Studios enquiry',
      message: String(formData.message || ''),
      source: String(formData.source || 'enterprise'),
      segment: 'Enterprise',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Enterprise contact error:', error);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}
