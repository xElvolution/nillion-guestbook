import { getVaultInstance } from '@/lib/secret-vault';
import { NextRequest, NextResponse } from 'next/server';

// Type for error object
interface ErrorWithMessage {
  message: string;
}

export async function GET() {
  try {
    const vault = await getVaultInstance();
    const data = await vault.readFromNodes({});
    return NextResponse.json({ data });
  } catch (error: unknown) {
    if ((error as ErrorWithMessage).message) {
      return NextResponse.json({ error: (error as ErrorWithMessage).message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { name, memo } = await req.json();
  if (!name || !memo) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  try {
    const vault = await getVaultInstance();
    await vault.writeToNodes([{ name, memo }]);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if ((error as ErrorWithMessage).message) {
      return NextResponse.json({ error: (error as ErrorWithMessage).message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}
