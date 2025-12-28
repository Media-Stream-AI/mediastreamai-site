// app/api/blog/route.ts
// Blog API for www.mediastreamai.com

import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// API key from environment
const VALID_API_KEY = process.env.BLOG_API_KEY || 'blog_api_XHChtYwp3WwmPP0k_unified_2025';

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

// Generate URL-friendly slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Update blog index file
async function updateBlogIndex(blogPost: BlogPost) {
  try {
    const indexPath = path.join(process.cwd(), 'content', 'blog', 'index.json');
    let posts: BlogPost[] = [];

    if (existsSync(indexPath)) {
      const indexContent = await readFile(indexPath, 'utf-8');
      posts = JSON.parse(indexContent);
    }

    posts.unshift(blogPost);
    await writeFile(indexPath, JSON.stringify(posts, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to update blog index:', error);
  }
}

// POST - Create new blog post
export async function POST(request: NextRequest) {
  try {
    console.log('📝 Blog API called');

    // Authentication
    const authHeader = request.headers.get('Authorization');
    const expectedAuth = `Bearer ${VALID_API_KEY}`;
    
    console.log('Auth check:', authHeader ? 'Provided' : 'Missing');
    
    if (!authHeader || authHeader !== expectedAuth) {
      console.error('Auth failed:', authHeader?.substring(0, 20));
      return NextResponse.json(
        { error: 'Unauthorized. Invalid API key.' },
        { status: 401 }
      );
    }

    // Parse request body
    const body: BlogPostInput = await request.json();
    console.log('📄 Creating blog:', body.title);

    // Validate required fields
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: 'Missing required fields: title, content' },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = generateSlug(body.title);
    console.log('📝 Slug:', slug);

    // Create blog post object
    const blogPost: BlogPost = {
      id: Date.now().toString(),
      slug,
      title: body.title,
      content: body.content,
      excerpt: body.excerpt || body.content.substring(0, 200).replace(/[#*]/g, '') + '...',
      sector: body.sector || 'AI Infrastructure',
      author: body.author || 'Media Stream AI Team',
      tags: body.tags || [],
      imageUrl: body.imageUrl,
      publishedAt: new Date().toISOString(),
    };

    // Save to file system (in content/blog directory)
    const contentDir = path.join(process.cwd(), 'content', 'blog');
    
    // Create directory if it doesn't exist
    if (!existsSync(contentDir)) {
      console.log('📁 Creating blog directory:', contentDir);
      await mkdir(contentDir, { recursive: true });
    }

    const filePath = path.join(contentDir, `${slug}.json`);
    
    // Check if file already exists - if so, add timestamp to make unique
    let finalPath = filePath;
    if (existsSync(filePath)) {
      console.log('⚠️ File exists, creating unique version');
      const timestamp = Date.now();
      finalPath = path.join(contentDir, `${slug}-${timestamp}.json`);
    }

    // Write file
    console.log('💾 Saving to:', finalPath);
    await writeFile(finalPath, JSON.stringify(blogPost, null, 2), 'utf-8');

    // Update index file (for listing all posts)
    await updateBlogIndex(blogPost);

    const blogUrl = `https://www.mediastreamai.com/blog/${slug}`;
    console.log('✅ Blog created:', blogUrl);

    return NextResponse.json(
      {
        success: true,
        slug,
        url: blogUrl,
        message: 'Blog post published successfully'
      },
      { 
        status: 201,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      }
    );

  } catch (error: any) {
    console.error('❌ Blog API Error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

// OPTIONS - Handle CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

// GET - List all blog posts
export async function GET() {
  try {
    const indexPath = path.join(process.cwd(), 'content', 'blog', 'index.json');
    
    if (!existsSync(indexPath)) {
      return NextResponse.json({ posts: [] });
    }

    const indexContent = await readFile(indexPath, 'utf-8');
    const posts = JSON.parse(indexContent);

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error reading blog index:', error);
    return NextResponse.json({ posts: [] });
  }
}
