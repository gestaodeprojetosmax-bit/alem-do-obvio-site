import { neon } from '@neondatabase/serverless';
import type { RegistrationStore } from '@/lib/registration-server';

export const saveRegistration: RegistrationStore = async ({
  submissionId,
  eventKey,
  record,
  answers,
  hash,
  noticeVersion,
  createdAt,
}) => {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error('DATABASE_URL is not configured.');

  const sql = neon(databaseUrl);
  const [, savedRows] = await sql.transaction([
    sql`
      INSERT INTO registrations (
        id, event_key, full_name, email, phone_e164, country, instagram, location,
        answers_json, payload_hash, notice_version, created_at
      ) VALUES (
        ${submissionId}, ${eventKey}, ${record.fullName}, ${record.email}, ${record.phone},
        ${record.country}, ${record.instagram}, ${record.location}, ${answers}, ${hash},
        ${noticeVersion}, ${createdAt}
      )
      ON CONFLICT (id) DO NOTHING
    `,
    sql`SELECT payload_hash FROM registrations WHERE id = ${submissionId}`,
  ]);

  const saved = savedRows[0] as { payload_hash?: string } | undefined;
  return saved?.payload_hash;
};
