'use client';

import { useState, useTransition } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Mail, Phone, User, MapPin, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SERVICES, type ServiceKey } from '@/lib/plz/germany-tiers';

const schema = z.object({
  customer_name: z.string().min(2, 'Bitte Namen angeben'),
  customer_email: z.string().email('Ungültige E-Mail'),
  customer_phone: z.string().optional(),
  service: z.string().min(1, 'Bitte Service auswählen'),
  plz: z.string().regex(/^\d{5}$/, '5-stellige PLZ'),
  quantity: z.number({ message: 'Bitte Zahl angeben' }).min(1).max(10000),
  frequency: z.string().min(1),
  scheduled_date: z.string().min(1, 'Bitte Datum wählen'),
  scheduled_time: z.string().min(1, 'Bitte Uhrzeit wählen'),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function BookingForm({
  defaults,
}: {
  defaults?: Partial<FormValues>;
}) {
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      customer_name: '',
      customer_email: '',
      customer_phone: '',
      service: 'bueroreinigung',
      plz: '',
      quantity: 100,
      frequency: 'woechentlich',
      scheduled_date: '',
      scheduled_time: '10:00',
      notes: '',
      ...defaults,
    },
  });

  const submit = (values: FormValues) =>
    startTransition(async () => {
      try {
        const res = await fetch('/api/booking', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(values),
        });
        const data = await res.json();
        if (!res.ok) {
          toast.error(data.error ?? 'Fehler beim Senden');
          return;
        }
        toast.success('Termin angefragt — wir melden uns innerhalb von 24h');
        setDone(true);
        reset();
      } catch {
        toast.error('Verbindungsfehler — bitte erneut versuchen');
      }
    });

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-8 text-center"
      >
        <CheckCircle2 className="mx-auto size-12 text-emerald-400" />
        <h2 className="mt-4 font-serif text-2xl font-semibold text-slate-100">
          Vielen Dank!
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          Ihre Buchung wurde übermittelt. Sie erhalten eine Bestätigung per
          E-Mail innerhalb von 24 Stunden.
        </p>
        <Button
          variant="outline"
          className="mt-6 rounded-full"
          onClick={() => setDone(false)}
        >
          Weitere Buchung
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur sm:p-10"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          label="Name"
          icon={<User className="size-4" />}
          error={errors.customer_name?.message}
        >
          <Input
            {...register('customer_name')}
            placeholder="Max Mustermann"
            className="bg-white/[0.04]"
          />
        </Field>

        <Field
          label="E-Mail"
          icon={<Mail className="size-4" />}
          error={errors.customer_email?.message}
        >
          <Input
            type="email"
            {...register('customer_email')}
            placeholder="ihre@email.de"
            className="bg-white/[0.04]"
          />
        </Field>

        <Field
          label="Telefon (optional)"
          icon={<Phone className="size-4" />}
        >
          <Input
            {...register('customer_phone')}
            placeholder="+49 ..."
            className="bg-white/[0.04]"
          />
        </Field>

        <Field
          label="Postleitzahl"
          icon={<MapPin className="size-4" />}
          error={errors.plz?.message}
        >
          <Input
            {...register('plz')}
            maxLength={5}
            inputMode="numeric"
            placeholder="80331"
            className="bg-white/[0.04] font-mono"
          />
        </Field>

        <Field label="Service" error={errors.service?.message}>
          <select
            {...register('service')}
            className="h-9 w-full rounded-md border border-white/10 bg-white/[0.04] px-3 text-sm text-slate-100"
          >
            {Object.values(SERVICES).map((s) => (
              <option key={s.key} value={s.key} className="text-slate-900">
                {s.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Frequenz">
          <select
            {...register('frequency')}
            className="h-9 w-full rounded-md border border-white/10 bg-white/[0.04] px-3 text-sm text-slate-100"
          >
            <option value="einmalig" className="text-slate-900">Einmalig</option>
            <option value="woechentlich" className="text-slate-900">Wöchentlich</option>
            <option value="zweiwoechentlich" className="text-slate-900">Alle 2 Wochen</option>
            <option value="monatlich" className="text-slate-900">Monatlich</option>
            <option value="taeglich" className="text-slate-900">Täglich</option>
          </select>
        </Field>

        <Field
          label="Umfang (m² / Stunden / Stück)"
          error={errors.quantity?.message}
        >
          <Input
            type="number"
            inputMode="numeric"
            {...register('quantity', { valueAsNumber: true })}
            className="bg-white/[0.04]"
          />
        </Field>

        <Field
          label="Wunschdatum"
          icon={<Calendar className="size-4" />}
          error={errors.scheduled_date?.message}
        >
          <Input
            type="date"
            {...register('scheduled_date')}
            className="bg-white/[0.04]"
          />
        </Field>

        <Field
          label="Uhrzeit"
          icon={<Clock className="size-4" />}
          error={errors.scheduled_time?.message}
        >
          <Input
            type="time"
            {...register('scheduled_time')}
            className="bg-white/[0.04]"
          />
        </Field>
      </div>

      <Field label="Anmerkungen (optional)" className="mt-5">
        <textarea
          {...register('notes')}
          rows={3}
          placeholder="Besondere Wünsche, Zugang zum Gebäude, etc."
          className="w-full rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-100"
        />
      </Field>

      <Button
        type="submit"
        size="lg"
        disabled={pending}
        className="mt-8 h-12 w-full rounded-full bg-[#FFD700] font-semibold text-[#0F172A] hover:bg-[#FFC700]"
      >
        {pending ? 'Wird gesendet…' : 'Termin anfragen'}
      </Button>

      <p className="mt-4 text-center text-xs text-slate-500">
        Mit dem Absenden akzeptieren Sie unsere{' '}
        <a href="/datenschutz" className="underline hover:text-slate-300">
          Datenschutzerklärung
        </a>
        .
      </p>
    </form>
  );
}

function Field({
  label,
  icon,
  error,
  className,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <Label className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-400">
        {icon}
        {label}
      </Label>
      <div className="mt-1.5">{children}</div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1 text-xs text-red-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
