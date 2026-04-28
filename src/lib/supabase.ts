import { createClient } from "@supabase/supabase-js";

// ─────────────────────────────────────────────────────────────────────────────
// Supabase SQL Migration — run once in Supabase SQL Editor
// ─────────────────────────────────────────────────────────────────────────────
//
// CREATE TABLE IF NOT EXISTS profiles (
//   id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
//   email      TEXT        UNIQUE NOT NULL,
//   full_name  TEXT,
//   phone      TEXT,
//   address    TEXT,
//   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
// );
//
// CREATE TABLE IF NOT EXISTS orders (
//   id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
//   user_id          UUID        REFERENCES profiles(id) ON DELETE SET NULL,
//   paytr_oid        TEXT        UNIQUE,
//   total_amount     INTEGER     NOT NULL DEFAULT 0,  -- kuruş cinsinden
//   status           TEXT        NOT NULL DEFAULT 'pending',
//   basket_details   JSONB,
//   address_snapshot JSONB,
//   created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
//   updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
// );
//
// CREATE OR REPLACE FUNCTION update_updated_at()
// RETURNS TRIGGER AS $$
// BEGIN
//   NEW.updated_at = NOW();
//   RETURN NEW;
// END;
// $$ LANGUAGE plpgsql;
//
// CREATE TRIGGER set_updated_at
// BEFORE UPDATE ON orders
// FOR EACH ROW EXECUTE PROCEDURE update_updated_at();
//
// -- Allow service role full access (already default in Supabase)
// ─────────────────────────────────────────────────────────────────────────────

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
