import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: { qrCode: string } }
) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const description = formData.get('description') as string
    const { qrCode } = params

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Find table by QR code
    const table = await prisma.table.findUnique({
      where: { qr_code: qrCode },
    })

    if (!table) {
      return NextResponse.json(
        { error: 'Table not found' },
        { status: 404 }
      )
    }

    // For Vercel deployment, we'll store file info without actual file storage
    // In production, you'd use a service like Vercel Blob, AWS S3, or Cloudinary
    const timestamp = Date.now()
    const filename = `${timestamp}_${file.name}`

    // Determine file type
    let fileType: 'photo' | 'video' | 'audio' | 'text' = 'text'
    const mimeType = file.type.toLowerCase()
    
    if (mimeType.startsWith('image/')) {
      fileType = 'photo'
    } else if (mimeType.startsWith('video/')) {
      fileType = 'video'
    } else if (mimeType.startsWith('audio/')) {
      fileType = 'audio'
    }

    // Save to database (without actual file storage for now)
    const mediaFile = await prisma.mediaFile.create({
      data: {
        table_id: table.id,
        filename,
        original_filename: file.name,
        file_type: fileType,
        description,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      mediaFile,
      note: 'File storage not configured - only metadata saved'
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}
