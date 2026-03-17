import QRCode from 'qrcode'

export async function generateQRCode(qrCode: string): Promise<string> {
  try {
    // Create full URL for the table page
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://your-domain.com' 
      : 'http://10.175.198.54:3000' // Local IP for mobile access
    
    const fullUrl = `${baseUrl}/table/${qrCode}`
    
    console.log('Generating QR code for URL:', fullUrl)
    
    const qrCodeDataURL = await QRCode.toDataURL(fullUrl, {
      width: 200,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    })
    return qrCodeDataURL
  } catch (error) {
    console.error('Error generating QR code:', error)
    throw error
  }
}
