import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ qrCode: string }> }
) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const description = formData.get('description') as string
    const { qrCode } = await params

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // For now, just return success without database operations
    // TODO: Add database connection after fixing Prisma issues
    
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

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully (demo mode)',
      file: {
        filename,
        original_filename: file.name,
        file_type: fileType,
        description,
        table_id: 1, // Dummy table ID
        id: timestamp,
        created_at: new Date().toISOString()
      },
      note: 'Database connection disabled for demo'
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}
