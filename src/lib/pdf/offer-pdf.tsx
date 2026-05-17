import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import {
  SERVICES,
  FREQUENCY_LABELS,
  type ServiceKey,
  type FrequencyKey,
  type PriceBreakdown,
  type PLZTier,
  formatEURPrecise,
} from '@/lib/plz/germany-tiers';

// Avoid bundling fonts at build — fall back to built-in PDF fonts (Helvetica).
// If you want premium typography in the PDF, register hosted .ttf URLs here.
Font.register({
  family: 'Helvetica',
  fonts: [{ src: '' }],
});

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#0F172A',
    backgroundColor: '#FFFFFF',
  },
  headerBand: {
    height: 6,
    backgroundColor: '#003B73',
    marginHorizontal: -48,
    marginTop: -48,
    marginBottom: 28,
  },
  goldAccent: {
    height: 2,
    backgroundColor: '#FFD700',
    marginHorizontal: -48,
    marginTop: 0,
    marginBottom: 28,
  },
  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 28,
  },
  brand: {
    color: '#003B73',
    fontSize: 18,
    fontWeight: 'bold',
  },
  brandSub: {
    fontSize: 9,
    color: '#475569',
    marginTop: 2,
  },
  offerMeta: {
    textAlign: 'right',
    fontSize: 9,
    color: '#475569',
    lineHeight: 1.5,
  },
  h1: {
    fontSize: 22,
    color: '#003B73',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtle: {
    color: '#64748B',
    fontSize: 9,
    marginBottom: 24,
  },
  customerBox: {
    backgroundColor: '#F8FAFC',
    padding: 14,
    borderRadius: 6,
    marginBottom: 22,
    flexDirection: 'row',
    gap: 24,
  },
  customerCol: { flex: 1 },
  label: {
    fontSize: 8,
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 3,
  },
  value: { fontSize: 11, color: '#0F172A' },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#003B73',
    color: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  th: { color: '#FFFFFF', fontSize: 9, fontWeight: 'bold' },
  thPos: { width: '8%' },
  thDesc: { width: '52%' },
  thQty: { width: '12%', textAlign: 'right' },
  thUnit: { width: '12%', textAlign: 'right' },
  thTotal: { width: '16%', textAlign: 'right' },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottom: '1pt solid #E2E8F0',
  },
  cell: { fontSize: 10 },
  totalsBox: {
    marginTop: 24,
    marginLeft: 'auto',
    width: '55%',
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  totalsRowBold: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderTop: '1pt solid #CBD5E1',
    marginTop: 4,
  },
  grandTotalBox: {
    backgroundColor: '#003B73',
    color: '#FFD700',
    padding: 12,
    marginTop: 8,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  grandLabel: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  grandValue: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
  },
  note: {
    fontSize: 9,
    color: '#475569',
    marginTop: 22,
    lineHeight: 1.5,
  },
  footer: {
    position: 'absolute',
    bottom: 28,
    left: 48,
    right: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 8,
    color: '#94A3B8',
    borderTop: '1pt solid #E2E8F0',
    paddingTop: 10,
  },
});

export interface OfferData {
  offerNumber: string;
  date: string; // ISO yyyy-mm-dd
  customerName: string;
  customerEmail: string;
  service: ServiceKey;
  quantity: number;
  frequency: FrequencyKey;
  plz: string;
  tier: PLZTier;
  breakdown: PriceBreakdown;
}

export function OfferPDF({ data }: { data: OfferData }) {
  const svc = SERVICES[data.service];
  const dateFmt = new Intl.DateTimeFormat('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(data.date));
  const validUntilDate = new Date(data.date);
  validUntilDate.setDate(validUntilDate.getDate() + 30);
  const validUntilFmt = new Intl.DateTimeFormat('de-DE').format(validUntilDate);

  return (
    <Document
      title={`Angebot ${data.offerNumber} — SVD Clean Pro`}
      author="SVD Clean Pro"
      subject="Reinigungs-Angebot"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.headerBand} />

        <View style={styles.brandRow}>
          <View>
            <Text style={styles.brand}>SVD Clean Pro</Text>
            <Text style={styles.brandSub}>
              Der professionelle Kalkulator für Reinigungsfirmen
            </Text>
            <Text style={styles.brandSub}>app.svd-clean.de</Text>
          </View>
          <View style={styles.offerMeta}>
            <Text>Angebot Nr. {data.offerNumber}</Text>
            <Text>Datum: {dateFmt}</Text>
            <Text>Gültig bis: {validUntilFmt}</Text>
          </View>
        </View>

        <Text style={styles.h1}>Angebot</Text>
        <Text style={styles.subtle}>
          Vielen Dank für Ihr Interesse an unseren Reinigungsdienstleistungen.
        </Text>

        <View style={styles.customerBox}>
          <View style={styles.customerCol}>
            <Text style={styles.label}>Kunde</Text>
            <Text style={styles.value}>
              {data.customerName || '—'}
            </Text>
            <Text style={[styles.brandSub, { marginTop: 2 }]}>
              {data.customerEmail || '—'}
            </Text>
          </View>
          <View style={styles.customerCol}>
            <Text style={styles.label}>Standort</Text>
            <Text style={styles.value}>
              {data.plz} {data.tier.city}
            </Text>
            <Text style={[styles.brandSub, { marginTop: 2 }]}>
              {data.tier.region} • Tier {data.tier.tier}
            </Text>
          </View>
        </View>

        <View style={styles.tableHeader}>
          <Text style={[styles.th, styles.thPos]}>Pos.</Text>
          <Text style={[styles.th, styles.thDesc]}>Beschreibung</Text>
          <Text style={[styles.th, styles.thQty]}>Menge</Text>
          <Text style={[styles.th, styles.thUnit]}>Einheit</Text>
          <Text style={[styles.th, styles.thTotal]}>Gesamt</Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.cell, styles.thPos]}>1</Text>
          <Text style={[styles.cell, styles.thDesc]}>
            {svc.name} — {svc.description}
            {'\n'}
            <Text style={{ fontSize: 8, color: '#64748B' }}>
              Frequenz: {FREQUENCY_LABELS[data.frequency]}
              {'  •  '}Regionaler Faktor: x{data.tier.multiplier.toFixed(2)}
            </Text>
          </Text>
          <Text style={[styles.cell, styles.thQty]}>
            {data.quantity}
          </Text>
          <Text style={[styles.cell, styles.thUnit]}>{svc.unit}</Text>
          <Text style={[styles.cell, styles.thTotal]}>
            {formatEURPrecise(data.breakdown.netto)}
          </Text>
        </View>

        <View style={styles.totalsBox}>
          <View style={styles.totalsRow}>
            <Text>Zwischensumme (netto)</Text>
            <Text>{formatEURPrecise(data.breakdown.netto)}</Text>
          </View>
          {data.breakdown.isKleinunternehmer ? (
            <View style={styles.totalsRow}>
              <Text>MwSt (§19 UStG)</Text>
              <Text>—</Text>
            </View>
          ) : (
            <View style={styles.totalsRow}>
              <Text>MwSt 19%</Text>
              <Text>{formatEURPrecise(data.breakdown.mwst)}</Text>
            </View>
          )}
          <View style={styles.totalsRowBold}>
            <Text style={{ fontWeight: 'bold' }}>Summe</Text>
            <Text style={{ fontWeight: 'bold' }}>
              {formatEURPrecise(data.breakdown.brutto)}
            </Text>
          </View>
          <View style={styles.grandTotalBox}>
            <Text style={styles.grandLabel}>Gesamtbetrag</Text>
            <Text style={styles.grandValue}>
              {formatEURPrecise(data.breakdown.brutto)}
            </Text>
          </View>
        </View>

        {data.breakdown.isKleinunternehmer && (
          <Text style={styles.note}>
            Hinweis: Gemäß §19 UStG (Kleinunternehmerregelung) wird keine
            Umsatzsteuer ausgewiesen.
          </Text>
        )}

        <Text style={styles.note}>
          Dieses Angebot ist freibleibend und 30 Tage gültig. Die ausgewiesenen
          Preise basieren auf der angegebenen Postleitzahl und Frequenz. Es
          gelten unsere Allgemeinen Geschäftsbedingungen (AGB), einsehbar unter
          https://app.svd-clean.de/agb. Datenschutzerklärung:
          https://app.svd-clean.de/datenschutz.
        </Text>

        <View style={styles.footer} fixed>
          <Text>SVD Clean Pro · app.svd-clean.de</Text>
          <Text>
            Angebot {data.offerNumber} · Seite{' '}
            <Text render={({ pageNumber, totalPages }) => `${pageNumber}/${totalPages}`} />
          </Text>
        </View>
      </Page>
    </Document>
  );
}
