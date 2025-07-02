import { NextResponse } from 'next/server';
import { getArticle } from '@/features/articles/services/articleService';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'en';
    
    // Validate language
    if (!['en', 'ar', 'fr'].includes(lang)) {
      return NextResponse.json({ error: 'Invalid language' }, { status: 400 });
    }

    const article = await getArticle(id, lang);
    
    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error('Error in article API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 