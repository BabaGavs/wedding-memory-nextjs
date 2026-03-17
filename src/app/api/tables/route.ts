import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Table } from '@/types'

export async function GET() {
  try {
    const tables = await prisma.table.findMany({
      include: {
        media_files: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    })

    return NextResponse.json({ tables })
  } catch (error) {
    console.error('Error fetching tables:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tables' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json()

    if (!name) {
      return NextResponse.json(
        { error: 'Table name is required' },
        { status: 400 }
      )
    }

    // Generate unique QR code
    const qrCode = Math.random().toString(36).substring(2, 15)

    const table = await prisma.table.create({
      data: {
        name,
        qr_code: qrCode,
      },
      include: {
        media_files: true,
      },
    })

    return NextResponse.json({ table })
  } catch (error) {
    console.error('Error creating table:', error)
    return NextResponse.json(
      { error: 'Failed to create table' },
      { status: 500 }
    )
  }
}
