import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { qrCode: string } }
) {
  try {
    const { qrCode } = params
    console.log('API: Looking for table with QR code:', qrCode)

    const table = await prisma.table.findUnique({
      where: { qr_code: qrCode },
      include: {
        media_files: {
          orderBy: {
            created_at: 'desc',
          },
        },
      },
    })

    console.log('API: Found table:', table)

    if (!table) {
      console.log('API: Table not found for QR code:', qrCode)
      return NextResponse.json(
        { error: 'Table not found', qrCode },
        { status: 404 }
      )
    }

    return NextResponse.json({ table })
  } catch (error) {
    console.error('API Error fetching table:', error)
    return NextResponse.json(
      { error: 'Failed to fetch table', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
