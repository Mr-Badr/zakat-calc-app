import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'en';
    
    // Validate language
    if (!['en', 'ar', 'fr'].includes(lang)) {
      return NextResponse.json({ error: 'Invalid language' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'src', 'locales', lang, 'sources.json');
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Sources not found' }, { status: 404 });
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const sourcesData = JSON.parse(fileContent);
    
    return NextResponse.json(sourcesData);
  } catch (error) {
    console.error('Error in sources API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 