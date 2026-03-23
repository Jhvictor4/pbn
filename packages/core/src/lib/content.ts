import { supabase } from './supabase'

export interface PbnArticle {
  id: string
  title: string
  slug: string
  content: string
  meta_description: string | null
  target_keywords: string[] | null
  article_type: string | null
  word_count: number | null
  created_at: string
  updated_at: string
}

/**
 * Fetch all articles deployed to this site via pbn_deployments.
 * Called at build time — SITE_ID env var identifies the seedbox_site.
 */
export async function getArticlesForSite(siteId: string): Promise<PbnArticle[]> {
  const { data, error } = await supabase
    .from('pbn_deployments')
    .select(`
      deployed_slug,
      content:content_history(
        id, title, slug, content, meta_description,
        target_keywords, article_type, word_count,
        created_at, updated_at
      )
    `)
    .eq('seedbox_site_id', siteId)
    .in('status', ['deployed', 'building', 'pending'])

  if (error) {
    console.error('[PBN] Failed to fetch articles:', error.message)
    return []
  }

  return (data ?? [])
    .map((d: any) => ({
      ...d.content,
      slug: d.deployed_slug || d.content?.slug,
    }))
    .filter((a: any) => a.content) // skip nulls
}

/**
 * Get site config from seedbox_sites.
 */
export async function getSiteConfig(siteId: string) {
  const { data, error } = await supabase
    .from('seedbox_sites')
    .select('id, name, niche, domain, config, languages')
    .eq('id', siteId)
    .single()

  if (error) {
    console.error('[PBN] Failed to fetch site config:', error.message)
    return null
  }

  return data
}
