'use client';

import { FormEvent, useEffect, useState } from 'react';
import styles from './page.module.css';

const difficultyOptions = [
  'Atrair pacientes com maior poder de compra',
  'Converter avaliações em tratamentos',
  'Cobrar melhor pelo meu trabalho',
  'Posicionamento e autoridade',
  'Comercial e vendas',
  'Organização e gestão da clínica',
  'Aumentar faturamento e lucratividade',
];

const revenueOptions = ['Até R$ 20 mil', 'R$ 20 mil a R$ 40 mil', 'R$ 40 mil a R$ 70 mil', 'R$ 70 mil a R$ 100 mil', 'Acima de R$ 100 mil', 'Prefiro não informar'];

type FormState = { name: string; whatsapp: string; instagram: string; revenue: string; difficultyOne: string; difficultyTwo: string; other: string; consent: boolean };
type Tracking = Record<string, string>;

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function captureTracking(): Tracking {
  const params = new URLSearchParams(window.location.search);
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'campaign_name', 'campaign_id', 'adset_name', 'adset_id', 'ad_name', 'ad_id', 'fbclid'];
  const tracking: Tracking = {};
  for (const key of keys) if (params.get(key)) tracking[key] = params.get(key)!;
  for (const cookie of document.cookie.split(';')) {
    const [key, ...parts] = cookie.trim().split('=');
    if (['_fbp', '_fbc'].includes(key) && parts.length) tracking[key] = parts.join('=');
  }
  try { sessionStorage.setItem('ao_tracking', JSON.stringify(tracking)); document.cookie = `ao_tracking=${encodeURIComponent(JSON.stringify(tracking))}; Max-Age=1800; Path=/; SameSite=Lax`; } catch { /* storage unavailable */ }
  return tracking;
}

const initial: FormState = { name: '', whatsapp: '', instagram: '', revenue: '', difficultyOne: '', difficultyTwo: '', other: '', consent: false };

export default function LeadForm() {
  const [form, setForm] = useState(initial);
  const [tracking, setTracking] = useState<Tracking>({});
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setTracking(captureTracking()), 0);
    return () => window.clearTimeout(timer);
  }, []);
  const update = (field: keyof FormState, value: string | boolean) => setForm(current => ({ ...current, [field]: value }));

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    if (!form.name.trim() || form.whatsapp.replace(/\D/g, '').length < 10 || !form.instagram.trim() || !form.revenue || !form.difficultyOne || !form.difficultyTwo || !form.consent) {
      setError('Preencha todos os campos obrigatórios e aceite o contato pelo WhatsApp.');
      return;
    }
    setSending(true);
    try {
      const response = await fetch('/api/alem-do-obvio', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, whatsapp: form.whatsapp.replace(/\D/g, ''), tracking }) });
      const result = await response.json() as { ok?: boolean; error?: string; reference?: string };
      if (!response.ok || !result.ok) throw new Error(result.error || 'Não foi possível enviar seus dados agora.');
      window.dispatchEvent(new CustomEvent('ao_lead_submitted', { detail: { reference: result.reference } }));
      const message = [`Olá! Quero saber valores e condições do Além do Óbvio (4 a 6 de dezembro).`, `Nome: ${form.name}`, `Instagram: ${form.instagram}`, `Faturamento mensal: ${form.revenue}`, `Maiores dificuldades: ${form.difficultyOne} / ${form.difficultyTwo}${form.other ? ` / ${form.other}` : ''}`, `Campanha: ${tracking.utm_campaign || tracking.campaign_name || 'não informada'} | Conjunto: ${tracking.adset_name || 'não informado'} | Anúncio: ${tracking.ad_name || 'não informado'}`, `Ref: ${result.reference}`, `Não apague esta mensagem, ela é enviada ao comercial com as suas informações.`].join('\n');
      window.location.href = `https://wa.me/5511936206406?text=${encodeURIComponent(message)}`;
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Não foi possível enviar seus dados agora.');
      setSending(false);
    }
  }

  return <form className={styles.form} onSubmit={submit} noValidate>
    <div className={styles.formGrid}>
      <label>Nome e sobrenome<input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Como podemos chamar você?" autoComplete="name" required /></label>
      <label>WhatsApp<input value={form.whatsapp} onChange={e => update('whatsapp', formatPhone(e.target.value))} placeholder="(11) 99999-9999" inputMode="tel" autoComplete="tel" required /></label>
      <label>Instagram<input value={form.instagram} onChange={e => update('instagram', e.target.value)} placeholder="@seuperfil" autoCapitalize="none" required /></label>
      <label>Faturamento mensal<select value={form.revenue} onChange={e => update('revenue', e.target.value)} required><option value="">Selecione uma faixa</option>{revenueOptions.map(option => <option key={option}>{option}</option>)}</select></label>
      <label>Maior dificuldade hoje<select value={form.difficultyOne} onChange={e => update('difficultyOne', e.target.value)} required><option value="">Selecione uma dificuldade</option>{difficultyOptions.map(option => <option key={option}>{option}</option>)}</select></label>
      <label>Segunda maior dificuldade<select value={form.difficultyTwo} onChange={e => update('difficultyTwo', e.target.value)} required><option value="">Selecione uma dificuldade</option>{difficultyOptions.filter(option => option !== form.difficultyOne).map(option => <option key={option}>{option}</option>)}</select></label>
    </div>
    <label>Algo mais que a equipe deveria saber? <span className={styles.optional}>(opcional)</span><textarea value={form.other} onChange={e => update('other', e.target.value)} placeholder="Conte brevemente, se quiser…" rows={3} /></label>
    <label className={styles.consent}><input type="checkbox" checked={form.consent} onChange={e => update('consent', e.target.checked)} /> <span>Concordo em ser contatado(a) pela equipe pelo WhatsApp.</span></label>
    {error && <p className={styles.error} role="alert">{error}</p>}
    <button className={styles.submit} type="submit" disabled={sending}>{sending ? 'ENVIANDO…' : 'QUERO SABER VALORES E CONDIÇÕES'} <span>→</span></button>
    <p className={styles.microcopy}>A equipe responde no WhatsApp com o investimento e as formas de pagamento.</p>
  </form>;
}
