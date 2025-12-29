// app/api/profit-loss/import-forecast/route.ts
// Import 2026 P&L Forecast from CSV data

import { NextRequest, NextResponse } from 'next/server';
import { insertMany } from '@/lib/mongodb-enhanced';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { csvData, year } = await req.json();

    if (!csvData || !year) {
      return NextResponse.json({ 
        error: 'csvData and year required' 
      }, { status: 400 });
    }

    console.log(`📊 Importing P&L forecast for ${year}...`);

    // Parse CSV data into structured format
    const lines = csvData.trim().split('\n');
    const entries = [];

    // Skip header rows (first 2) and total row (last)
    for (let i = 2; i < lines.length - 1; i++) {
      const line = lines[i];
      if (!line.trim()) continue;

      // Parse CSV line (handling quotes and commas)
      const values = line.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g)?.map(v => 
        v.replace(/^"|"$/g, '').trim()
      ) || [];

      if (values.length < 12) continue;

      const month = values[0];
      if (!month || month === 'TOTAL') continue;

      // Parse financial values (remove £, spaces, commas)
      const parseValue = (str: string) => {
        if (!str || str === '£-' || str === '-') return 0;
        return parseFloat(str.replace(/[£,\s]/g, '')) || 0;
      };

      const entry = {
        year: parseInt(year),
        month: month,
        date: new Date(`${month.split('-')[0]} 1, ${year}`),
        
        // GPUaaS (MSAI Cloud)
        gpuaas_revenue: parseValue(values[1]),
        gpuaas_ebitda: parseValue(values[2]),
        
        // IntuiTV (MSAI Enterprise)
        intuitv_revenue: parseValue(values[3]),
        intuitv_ebitda: parseValue(values[4]),
        
        // MOTHER AI
        mother_revenue: parseValue(values[5]),
        mother_ebitda: parseValue(values[6]),
        
        // Costs
        salaries: parseValue(values[7]),
        other_costs: parseValue(values[8]),
        
        // Totals
        total_revenue: parseValue(values[9]),
        total_costs: parseValue(values[10]),
        total_ebitda: parseValue(values[11]),
        
        // Actuals (to be filled in monthly)
        actuals: {
          gpuaas_revenue: 0,
          intuitv_revenue: 0,
          mother_revenue: 0,
          total_revenue: 0,
          salaries: 0,
          other_costs: 0,
          total_costs: 0,
          ebitda: 0,
          notes: ''
        },
        
        variance: {
          revenue: 0,
          costs: 0,
          ebitda: 0,
          percentage: 0
        },
        
        type: 'forecast',
        imported_at: new Date(),
        updated_at: new Date()
      };

      entries.push(entry);
    }

    if (entries.length === 0) {
      return NextResponse.json({ 
        error: 'No valid entries found in CSV' 
      }, { status: 400 });
    }

    // Insert into MongoDB
    const result = await insertMany('profit_loss_forecast', entries);

    console.log(`✅ Imported ${entries.length} P&L forecast entries for ${year}`);

    return NextResponse.json({
      success: true,
      imported: entries.length,
      year,
      entries: entries.map(e => ({
        month: e.month,
        total_revenue: e.total_revenue,
        total_ebitda: e.total_ebitda
      })),
      message: `Successfully imported ${year} P&L forecast`
    });

  } catch (error: any) {
    console.error('❌ P&L import error:', error);
    return NextResponse.json({
      error: 'Failed to import P&L forecast',
      details: error.message
    }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
