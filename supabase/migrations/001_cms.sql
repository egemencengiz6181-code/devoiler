-- ─────────────────────────────────────────────────────────────────────────────
-- Devoiler CMS — Supabase SQL Editor'de bir kez çalıştırın.
-- Mevcut profiles / orders tablolarına dokunmaz.
-- ─────────────────────────────────────────────────────────────────────────────

-- 1) Ürünler ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS cms_products (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug       TEXT        UNIQUE NOT NULL,
  data       JSONB       NOT NULL DEFAULT '{}'::jsonb,
  sort_order INTEGER     NOT NULL DEFAULT 0,
  is_active  BOOLEAN     NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS cms_products_sort_idx ON cms_products (sort_order);

-- 2) Site içeriği (tek satır, key = 'site') ---------------------------------
CREATE TABLE IF NOT EXISTS cms_content (
  key        TEXT        PRIMARY KEY,
  data       JSONB       NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3) updated_at trigger -----------------------------------------------------
CREATE OR REPLACE FUNCTION cms_touch_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS cms_products_touch ON cms_products;
CREATE TRIGGER cms_products_touch BEFORE UPDATE ON cms_products
  FOR EACH ROW EXECUTE PROCEDURE cms_touch_updated_at();

DROP TRIGGER IF EXISTS cms_content_touch ON cms_content;
CREATE TRIGGER cms_content_touch BEFORE UPDATE ON cms_content
  FOR EACH ROW EXECUTE PROCEDURE cms_touch_updated_at();

-- 4) RLS: yazma yalnızca service_role (admin API) üzerinden ------------------
ALTER TABLE cms_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_content  ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS cms_products_public_read ON cms_products;
CREATE POLICY cms_products_public_read ON cms_products
  FOR SELECT USING (true);

DROP POLICY IF EXISTS cms_content_public_read ON cms_content;
CREATE POLICY cms_content_public_read ON cms_content
  FOR SELECT USING (true);

-- 5) Görseller için public storage bucket ------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "media public read" ON storage.objects;
CREATE POLICY "media public read" ON storage.objects
  FOR SELECT USING (bucket_id = 'media');
