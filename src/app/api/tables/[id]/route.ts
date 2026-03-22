import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const tableId = parseInt(id)

    if (isNaN(tableId)) {
      return NextResponse.json(
        { error: 'Invalid table ID' },
        { status: 400 }
      )
    }

    // Delete table (cascade will delete associated media files)
    await prisma.table.delete({
      where: { id: tableId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting table:', error)
    return NextResponse.json(
      { error: 'Failed to delete table' },
      { status: 500 }
    )
  }
}
