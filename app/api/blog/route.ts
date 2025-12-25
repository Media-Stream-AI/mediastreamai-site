import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const INDEX_FILE = path.join(BLOG_DIR, 'index.json');

// Ensure blog directory exists
if (!fs.existsSync(BLOG_DIR)) {
  fs.mkdirSync(BLOG_DIR, { recursive: true });
}

// Ensure index file exists
if (!fs.existsSync(INDEX_FILE)) {
  fs.writeFileSync(INDEX_FILE, JSON.stringify([]));
}

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  sector?: string;
  tags: string[];
  imageUrl?: string;
}

// GET - Retrieve blog posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sector = searchParams.get('sector');

    // Read index
    const indexData = fs.readFileSync(INDEX_FILE, 'utf-8');
    let posts: BlogPost[] = JSON.parse(indexData);

    // Filter by sector if specified
    if (sector && sector !== 'all') {
      posts = posts.filter(post => post.sector === sector);
    }

    // Sort by date (newest first)
    posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST - Create new blog post
export async function POST(request: NextRequest) {
  try {
    // Check API key authentication
    const apiKey = request.headers.get('Authorization')?.replace('Bearer ', '');
    const validApiKey = process.env.BLOG_API_KEY;

    if (!validApiKey || apiKey !== validApiKey) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, excerpt, content, author, sector, tags, imageUrl } = body;

    // Validate required fields
    if (!title || !content || !author) {
      return NextResponse.json(
        { error: 'Missing required fields: title, content, author' },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Create post object
    const post: BlogPost = {
      slug,
      title,
      excerpt: excerpt || content.substring(0, 200) + '...',
      content,
      author,
      publishedAt: new Date().toISOString(),
      sector,
      tags: tags || [],
      imageUrl
    };

    // Read current index
    const indexData = fs.readFileSync(INDEX_FILE, 'utf-8');
    const posts: BlogPost[] = JSON.parse(indexData);

    // Check if slug already exists
    const existingIndex = posts.findIndex(p => p.slug === slug);
    if (existingIndex !== -1) {
      // Update existing post
      posts[existingIndex] = post;
    } else {
      // Add new post
      posts.push(post);
    }

    // Save updated index
    fs.writeFileSync(INDEX_FILE, JSON.stringify(posts, null, 2));

    // Save individual post file
    const postFile = path.join(BLOG_DIR, `${slug}.json`);
    fs.writeFileSync(postFile, JSON.stringify(post, null, 2));

    return NextResponse.json(
      { 
        message: 'Post created successfully',
        post,
        url: `/blog/${slug}`
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}

// DELETE - Remove blog post
export async function DELETE(request: NextRequest) {
  try {
    // Check API key authentication
    const apiKey = request.headers.get('Authorization')?.replace('Bearer ', '');
    const validApiKey = process.env.BLOG_API_KEY;

    if (!validApiKey || apiKey !== validApiKey) {
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

    // Read current index
    const indexData = fs.readFileSync(INDEX_FILE, 'utf-8');
    let posts: BlogPost[] = JSON.parse(indexData);

    // Remove post from index
    const initialLength = posts.length;
    posts = posts.filter(p => p.slug !== slug);

    if (posts.length === initialLength) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Save updated index
    fs.writeFileSync(INDEX_FILE, JSON.stringify(posts, null, 2));

    // Delete individual post file
    const postFile = path.join(BLOG_DIR, `${slug}.json`);
    if (fs.existsSync(postFile)) {
      fs.unlinkSync(postFile);
    }

    return NextResponse.json(
      { message: 'Post deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
