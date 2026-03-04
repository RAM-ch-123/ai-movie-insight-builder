import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
        return new NextResponse('Missing url parameter', { status: 400 });
    }

    try {
        const decodedUrl = decodeURIComponent(url);
        // Fetch the image pretending to be a regular external browser/client without strict referrer
        const imageRes = await fetch(decodedUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
            },
            cache: 'force-cache'
        });

        if (!imageRes.ok) {
            throw new Error(`Failed to fetch image: ${imageRes.status} ${imageRes.statusText}`);
        }

        const arrayBuffer = await imageRes.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const contentType = imageRes.headers.get('content-type') || 'image/jpeg';

        // Return the image buffer directly to the client
        return new NextResponse(buffer, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=86400, immutable',
            },
        });
    } catch (error) {
        console.error('Proxy Image Error:', error);
        // Return a transparent 1x1 pixel or heavily generic placeholder on failure
        return new NextResponse(
            Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'),
            {
                headers: { 'Content-Type': 'image/gif' },
            }
        );
    }
}
