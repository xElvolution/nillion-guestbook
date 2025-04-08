import { getVaultInstance } from '@/lib/secret-vault';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const vault = await getVaultInstance();
    const data = await vault.readFromNodes({});
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
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
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
