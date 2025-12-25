// ===================================
// WEBSITE: www.mediastreamai.com
// 
// WHERE TO PLACE THIS FILE:
// /mediastreamai-site/app/api/blog/route.ts
// 
// INSTRUCTIONS:
// 1. Navigate to: mediastreamai-site/app/api/
// 2. Create folder: blog
// 3. Create file: route.ts
// 4. Copy this ENTIRE file into route.ts
// ===================================

import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// API key from environment
const VALID_API_KEY = process.env.BLOG_API_KEY || '';

interface BlogPostInput {
  title: string;
  content: string;
  excerpt?: string;
  sector: string;
  author?: string;
  tags?: string[];
  imageUrl?: string;
}

interface BlogPost extends BlogPostInput {
  id: string;
  slug: string;
  publishedAt: string;
}

// POST - Create new blog post
export async function POST(request: NextRequest) {
  try {
    // Authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || authHeader !== `Bearer ${VALID_API_KEY}`) {
      return NextResponse.json(
        { error: 'Unauthorized. Invalid API key.' },
        { status: 401 }
      );
    }

    // Parse request body
    const body: BlogPostInput = await request.json();

    // Validate required fields
    if (!body.title || !body.content || !body.sector) {
      return NextResponse.json(
        { error: 'Missing required fields: title, content, sector' },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = generateSlug(body.title);

    // Create blog post object
    const blogPost: BlogPost = {
      id: Date.now().toString(),
      slug,
      title: body.title,
      content: body.content,
      excerpt: body.excerpt || body.content.substring(0, 200).replace(/<[^>]*>/g, '') + '...',
      sector: body.sector,
      author: body.author || 'Media Stream AI Team',
      tags: body.tags || [],
      imageUrl: body.imageUrl,
      publishedAt: new Date().toISOString(),
    };

    // Save to file system (in content/blog directory)
    const contentDir = path.join(process.cwd(), 'content', 'blog');
    
    // Create directory if it doesn't exist
    if (!existsSync(contentDir)) {
      await mkdir(contentDir, { recursive: true });
    }

    const filePath = path.join(contentDir, `${slug}.json`);
    
    // Check if file already exists
    if (existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Blog post with this title already exists' },
        { status: 409 }
      );
    }

    // Write file
    await writeFile(filePath, JSON.stringify(blogPost, null, 2), 'utf-8');

    // Update index file (for listing all posts)
    await updateBlogIndex(blogPost);

    return NextResponse.json(
      {
        success: true,
        slug,
        url: `https://www.mediastreamai.com/blog/${slug}`,
        message: 'Blog post published successfully'
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Blog API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET - Retrieve blog posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sector = searchParams.get('sector');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Read blog index
    const indexPath = path.join(process.cwd(), 'content', 'blog', 'index.json');
    
    if (!existsSync(indexPath)) {
      return NextResponse.json({ posts: [] });
    }

    const indexData = await readFile(indexPath, 'utf-8');
    let posts: BlogPost[] = JSON.parse(indexData);

    // Filter by sector if specified
    if (sector && sector !== 'all') {
      posts = posts.filter(post => post.sector === sector);
    }

    // Sort by date (newest first)
    posts.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    // Limit results
    posts = posts.slice(0, limit);

    return NextResponse.json({ posts });

  } catch (error) {
    console.error('Blog GET Error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve blog posts' },
      { status: 500 }
    );
  }
}

// Helper: Generate URL-safe slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Helper: Update blog index file
async function updateBlogIndex(newPost: BlogPost) {
  const indexPath = path.join(process.cwd(), 'content', 'blog', 'index.json');
  
  let posts: BlogPost[] = [];
  
  if (existsSync(indexPath)) {
    const indexData = await readFile(indexPath, 'utf-8');
    posts = JSON.parse(indexData);
  }

  // Add new post to beginning of array
  posts.unshift({
    id: newPost.id,
    slug: newPost.slug,
    title: newPost.title,
    excerpt: newPost.excerpt,
    sector: newPost.sector,
    author: newPost.author,
    publishedAt: newPost.publishedAt,
    imageUrl: newPost.imageUrl,
    tags: newPost.tags,
    content: '' // Don't include full content in index
  });

  // Write updated index
  await writeFile(indexPath, JSON.stringify(posts, null, 2), 'utf-8');
}

// DELETE endpoint for removing posts
export async function DELETE(request: NextRequest) {
  try {
    // Authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || authHeader !== `Bearer ${VALID_API_KEY}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json(
        { error: 'Missing slug parameter' },
        { status: 400 }
      );
    }

    // Remove from index
    const indexPath = path.join(process.cwd(), 'content', 'blog', 'index.json');
    if (existsSync(indexPath)) {
      const indexData = await readFile(indexPath, 'utf-8');
      let posts: BlogPost[] = JSON.parse(indexData);
      posts = posts.filter(post => post.slug !== slug);
      await writeFile(indexPath, JSON.stringify(posts, null, 2), 'utf-8');
    }

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully'
    });

  } catch (error) {
    console.error('Blog DELETE Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
