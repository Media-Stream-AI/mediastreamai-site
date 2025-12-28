// app/api/blog/route.ts
// MongoDB-based Blog API (works on Netlify/Vercel)

import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

// MongoDB connection (shared across all 3 sites)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://salesuser:i1ENUKg2tSLK6O5t@msaisales.r9timmt.mongodb.net/salesDB?retryWrites=true&w=majority&appName=msaiSALES';
const BLOG_API_KEY = process.env.BLOG_API_KEY || 'blog_api_XHChtYwp3WwmPP0k_unified_2025';

let cachedClient: MongoClient | null = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return client;
}

// Generate URL-friendly slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// POST - Create new blog post
export async function POST(request: NextRequest) {
  try {
    console.log('📝 Blog API called');

    // Authentication
    const authHeader = request.headers.get('Authorization');
    const expectedAuth = `Bearer ${BLOG_API_KEY}`;
    
    if (!authHeader || authHeader !== expectedAuth) {
      console.error('Auth failed');
      return NextResponse.json(
        { error: 'Unauthorized. Invalid API key.' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
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

    // Connect to MongoDB
    const client = await connectToDatabase();
    const db = client.db('salesDB');
    const collection = db.collection('blog_posts');

    // Create blog post object
    const blogPost = {
      slug,
      title: body.title,
      content: body.content,
      excerpt: body.excerpt || body.content.substring(0, 200).replace(/[#*]/g, '') + '...',
      sector: body.sector || 'AI Infrastructure',
      author: body.author || 'Media Stream AI Team',
      tags: body.tags || [],
      imageUrl: body.imageUrl || null,
      publishedAt: new Date(),
      createdAt: new Date(),
      site: request.headers.get('host') || 'unknown' // Track which site
    };

    // Check if slug exists, make unique if needed
    const existing = await collection.findOne({ slug });
    if (existing) {
      blogPost.slug = `${slug}-${Date.now()}`;
      console.log('⚠️ Slug exists, using:', blogPost.slug);
    }

    // Insert into MongoDB
    const result = await collection.insertOne(blogPost);
    console.log('💾 Saved to MongoDB:', result.insertedId);

    // Determine blog URL based on site
    const host = request.headers.get('host') || 'www.mediastreamai.com';
    const blogUrl = `https://${host}/blog/${blogPost.slug}`;
    
    console.log('✅ Blog created:', blogUrl);

    return NextResponse.json(
      {
        success: true,
        slug: blogPost.slug,
        url: blogUrl,
        message: 'Blog post published successfully'
      },
      { 
        status: 201,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
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
      'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

// GET - List all blog posts for this site
export async function GET(request: NextRequest) {
  try {
    const client = await connectToDatabase();
    const db = client.db('salesDB');
    const collection = db.collection('blog_posts');
    
    const host = request.headers.get('host') || 'www.mediastreamai.com';
    
    const posts = await collection
      .find({ site: host })
      .sort({ publishedAt: -1 })
      .limit(50)
      .toArray();

    return NextResponse.json({ 
      posts,
      count: posts.length 
    });
  } catch (error: any) {
    console.error('Error reading blogs:', error);
    return NextResponse.json({ 
      posts: [],
      error: error.message 
    });
  }
}
