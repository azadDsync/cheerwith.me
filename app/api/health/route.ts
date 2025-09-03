export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

export async function GET() {
  const healthcheck = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version || '0.1.0',
  };

  return NextResponse.json(healthcheck);
}
