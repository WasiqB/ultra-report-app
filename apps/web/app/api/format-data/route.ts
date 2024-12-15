import { getData } from '@ultra-reporter/ui/data';
import { getTestResults } from '@ultra-reporter/utils/xml-parser';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { value } = await request.json();

    if (!value) {
      return NextResponse.json(
        { error: 'Please upload a file first' },
        { status: 404 }
      );
    }

    console.log(value);
    const testResult = getTestResults(value);
    const formattedData = getData(testResult);

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('Error getting formatted data:', error);
    return NextResponse.json(
      { error: 'Error retrieving formatted data' },
      { status: 500 }
    );
  }
}
