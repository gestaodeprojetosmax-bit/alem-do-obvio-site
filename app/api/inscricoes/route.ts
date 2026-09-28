import { saveRegistration } from '@/db';
import { handleRegistration } from '@/lib/registration-server';

export const runtime = 'nodejs';

export function POST(request: Request) {
  return handleRegistration(request, saveRegistration, () => ({
    webhookUrl: process.env.FORM_WEBHOOK_URL,
    webhookToken: process.env.FORM_WEBHOOK_TOKEN,
  }));
}
