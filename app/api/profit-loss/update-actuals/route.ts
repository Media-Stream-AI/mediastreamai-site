// app/api/profit-loss/update-actuals/route.ts
// Update monthly actuals vs forecast

import { NextRequest, NextResponse } from 'next/server';
import { updateOne, findOne } from '@/lib/mongodb-enhanced';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { year, month, actuals } = await req.json();

    if (!year || !month || !actuals) {
      return NextResponse.json({ 
        error: 'year, month, and actuals required' 
      }, { status: 400 });
    }

    console.log(`📊 Updating actuals for ${month} ${year}...`);

    // Find the forecast entry
    const forecast = await findOne('profit_loss_forecast', { year, month });

    if (!forecast) {
      return NextResponse.json({ 
        error: `Forecast not found for ${month} ${year}` 
      }, { status: 404 });
    }

    // Calculate variances
    const variance = {
      revenue: actuals.total_revenue - forecast.total_revenue,
      costs: actuals.total_costs - forecast.total_costs,
      ebitda: actuals.ebitda - forecast.total_ebitda,
      percentage: forecast.total_revenue > 0 
        ? ((actuals.total_revenue - forecast.total_revenue) / forecast.total_revenue * 100)
        : 0
    };

    // Update the entry
    await updateOne(
      'profit_loss_forecast',
      { year, month },
      {
        $set: {
          actuals,
          variance,
          actuals_entered: true,
          updated_at: new Date()
        }
      }
    );

    console.log(`✅ Updated actuals for ${month} ${year}`);

    return NextResponse.json({
      success: true,
      month,
      year,
      forecast: {
        revenue: forecast.total_revenue,
        ebitda: forecast.total_ebitda
      },
      actuals: {
        revenue: actuals.total_revenue,
        ebitda: actuals.ebitda
      },
      variance,
      message: `Successfully updated actuals for ${month} ${year}`
    });

  } catch (error: any) {
    console.error('❌ Update actuals error:', error);
    return NextResponse.json({
      error: 'Failed to update actuals',
      details: error.message
    }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
