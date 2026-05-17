import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getServiceClient } from '@/lib/supabase/server';
import {
  calculatePrice,
  isValidPLZ,
  type ServiceKey,
  type FrequencyKey,
} from '@/lib/plz/germany-tiers';

export const runtime = 'nodejs';

const schema = z.object({
  customer_name: z.string().min(2).max(120),
  customer_email: z.string().email().max(200),
  customer_phone: z.string().max(60).optional().nullable(),
  service: z.string().min(1).max(40),
  plz: z.string().regex(/^\d{5}$/),
  quantity: z.coerce.number().min(1).max(10000),
  frequency: z.string().min(1).max(40),
  is_kleinunternehmer: z.boolean().optional().default(false),
  scheduled_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .nullable(),
  scheduled_time: z
    .string()
    .regex(/^\d{2}:\d{2}(:\d{2})?$/)
    .optional()
    .nullable(),
  notes: z.string().max(2000).optional().nullable(),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: 'Ungültiger JSON-Body' },
      { status: 400 },
    );
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validierungsfehler', details: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const data = parsed.data;

  if (!isValidPLZ(data.plz)) {
    return NextResponse.json({ error: 'Ungültige PLZ' }, { status: 400 });
  }

  const breakdown = calculatePrice({
    service: data.service as ServiceKey,
    quantity: data.quantity,
    plz: data.plz,
    frequency: data.frequency as FrequencyKey,
    isKleinunternehmer: data.is_kleinunternehmer,
  });

  const supabase = getServiceClient();
  const { data: inserted, error } = await supabase
    .from('bookings')
    .insert({
      customer_name: data.customer_name,
      customer_email: data.customer_email,
      customer_phone: data.customer_phone ?? null,
      service: data.service,
      plz: data.plz,
      quantity: data.quantity,
      price: breakdown.brutto,
      scheduled_date: data.scheduled_date ?? null,
      scheduled_time: data.scheduled_time ?? null,
      status: 'pending',
      notes: data.notes ?? null,
    })
    .select('id, created_at')
    .single();

  if (error) {
    return NextResponse.json(
      { error: 'Datenbankfehler', details: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, booking: inserted });
}
