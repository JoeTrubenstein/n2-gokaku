import GhostContentAPI from '@tryghost/content-api';
import type { PostsOrPages, PostOrPage } from '@tryghost/content-api';

export const ghost = new GhostContentAPI({
  url:    import.meta.env.GHOST_API_URL,
  key:    import.meta.env.GHOST_CONTENT_API_KEY,
  version:'v5.0',
});

// Helper to fetch posts
export async function getLatestPosts(limit = 5): Promise<PostOrPage[]> {
  return ghost.posts.browse({
    limit,
    include: ['authors', 'tags'],
  }) as Promise<PostOrPage[]>;
}
