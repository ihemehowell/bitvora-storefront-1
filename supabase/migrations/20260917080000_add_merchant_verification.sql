-- ============================================
-- MERCHANT VERIFICATION: phone OTP + NIN/CAC identity check
-- Verification is mandatory and blocks store creation (enforced in stores/new).
-- Note: `phone` already exists on merchants from the init migration, so it's
-- not re-added here.
-- ============================================

alter table merchants
  add column phone_verified_at timestamptz,
  add column verification_status text not null default 'unverified'
    check (verification_status in ('unverified', 'pending', 'verified', 'failed')),
  add column verification_type text
    check (verification_type in ('nin', 'cac')),
  add column verification_reference text,
  add column verified_at timestamptz;

-- ============================================
-- PHONE OTP: short-lived, hashed codes. Never store plaintext.
-- ============================================
create table merchant_otps (
  id uuid primary key default gen_random_uuid(),
  merchant_id uuid not null references merchants(id) on delete cascade,
  phone text not null,
  code_hash text not null,
  expires_at timestamptz not null,
  attempts int not null default 0,
  consumed_at timestamptz,
  created_at timestamptz not null default now()
);

create index merchant_otps_merchant_id_idx on merchant_otps(merchant_id);

alter table merchant_otps enable row level security;

create policy "Merchants can manage their own OTP rows"
  on merchant_otps for all
  using (
    merchant_id in (select id from merchants where user_id = auth.uid())
  )
  with check (
    merchant_id in (select id from merchants where user_id = auth.uid())
  );

-- ============================================
-- IDENTITY VERIFICATION AUDIT LOG: every NIN/CAC lookup attempt
-- ============================================
create table merchant_verifications (
  id uuid primary key default gen_random_uuid(),
  merchant_id uuid not null references merchants(id) on delete cascade,
  type text not null check (type in ('nin', 'cac')),
  reference text not null,
  provider text not null default 'qoreid',
  status text not null default 'pending' check (status in ('pending', 'verified', 'failed')),
  provider_response jsonb,
  created_at timestamptz not null default now()
);

create index merchant_verifications_merchant_id_idx on merchant_verifications(merchant_id);

alter table merchant_verifications enable row level security;

create policy "Merchants can view their own verification attempts"
  on merchant_verifications for select
  using (
    merchant_id in (select id from merchants where user_id = auth.uid())
  );

create policy "Merchants can insert their own verification attempts"
  on merchant_verifications for insert
  with check (
    merchant_id in (select id from merchants where user_id = auth.uid())
  );

-- Note: no update/delete policies on merchant_verifications — it's an append-only
-- audit log. Status transitions happen via new inserts or a service-role process.