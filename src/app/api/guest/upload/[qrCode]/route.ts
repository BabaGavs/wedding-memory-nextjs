import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

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

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadsDir, { recursive: true })

    // Generate unique filename
    const timestamp = Date.now()
    const fileExtension = path.extname(file.name)
    const filename = `${timestamp}_${file.name}`
    const filepath = path.join(uploadsDir, filename)

    // Save file
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filepath, buffer)

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

    // Save to database
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
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}
