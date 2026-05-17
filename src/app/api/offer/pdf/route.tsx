import { NextRequest } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { z } from 'zod';
import {
  calculatePrice,
  getPLZTier,
  isValidPLZ,
  type ServiceKey,
  type FrequencyKey,
} from '@/lib/plz/germany-tiers';
import { OfferPDF } from '@/lib/pdf/offer-pdf';

export const runtime = 'nodejs';

const serviceSchema = z.enum([
  'bueroreinigung',
  'treppenhaus',
  'grundreinigung',
  'baureinigung',
  'fenster',
  'boden',
  'teppich',
  'polster',
  'kueche',
  'aussen',
  'garage',
  'end',
]);

const freqSchema = z.enum([
  'einmalig',
  'woechentlich',
  'zweiwoechentlich',
  'monatlich',
  'taeglich',
]);

const inputSchema = z.object({
  service: serviceSchema,
  qty: z.coerce.number().min(1).max(10000),
  plz: z.string().regex(/^\d{5}$/, 'PLZ muss 5-stellig sein'),
  freq: freqSchema,
  kun: z.enum(['0', '1']).optional().default('0'),
  name: z.string().max(120).optional().default(''),
  email: z.string().max(200).optional().default(''),
});

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const parsed = inputSchema.safeParse(
    Object.fromEntries(url.searchParams.entries()),
  );

  if (!parsed.success) {
    return new Response(
      JSON.stringify({
        error: 'Ungültige Parameter',
        details: parsed.error.flatten(),
      }),
      { status: 400, headers: { 'content-type': 'application/json' } },
    );
  }

  const { service, qty, plz, freq, kun, name, email } = parsed.data;
  if (!isValidPLZ(plz)) {
    return new Response(JSON.stringify({ error: 'Ungültige PLZ' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  const breakdown = calculatePrice({
    service: service as ServiceKey,
    quantity: qty,
    plz,
    frequency: freq as FrequencyKey,
    isKleinunternehmer: kun === '1',
  });
  const tier = getPLZTier(plz);

  const offerNumber = `AN-${new Date()
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, '')}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

  const buffer = await renderToBuffer(
    <OfferPDF
      data={{
        offerNumber,
        date: new Date().toISOString().slice(0, 10),
        customerName: name,
        customerEmail: email,
        service: service as ServiceKey,
        quantity: qty,
        frequency: freq as FrequencyKey,
        plz,
        tier,
        breakdown,
      }}
    />,
  );

  // ArrayBuffer.from Buffer (Node) — Next/Web Response can accept a Buffer-like
  return new Response(new Uint8Array(buffer), {
    status: 200,
    headers: {
      'content-type': 'application/pdf',
      'content-disposition': `attachment; filename="${offerNumber}.pdf"`,
      'cache-control': 'no-store',
    },
  });
}
