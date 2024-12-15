import { convertToJson } from '@ultra-reporter/utils/xml-parser';
import { FileReader } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!file.name.endsWith('.xml')) {
      return NextResponse.json(
        { error: 'Invalid file type. Only XML files are allowed.' },
        { status: 400 }
      );
    }

    let xmlContent: string | null = null;
    const reader = new FileReader();
    reader.onload = async (e) => {
      xmlContent = e.target?.result as string;
    };
    reader.readAsText(file);

    if (!xmlContent) {
      return NextResponse.json(
        { error: 'Empty file content' },
        { status: 400 }
      );
    }

    const jsonData = convertToJson(xmlContent);
    return NextResponse.json(jsonData);
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json(
      { error: 'Error processing file' },
      { status: 500 }
    );
  }
}
