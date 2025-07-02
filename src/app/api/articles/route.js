import { NextResponse } from 'next/server';
import { getAllArticles } from '@/features/articles/services/articleService';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'en';
    
    // Validate language
    if (!['en', 'ar', 'fr'].includes(lang)) {
      return NextResponse.json({ error: 'Invalid language' }, { status: 400 });
    }

    const articles = await getAllArticles(lang);
    
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error in articles API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 