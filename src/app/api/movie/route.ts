import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || !id.match(/^tt\d+$/)) {
        return NextResponse.json({ error: 'Invalid IMDb ID format.' }, { status: 400 });
    }

    try {
        const res = await fetch(`https://search.imdbot.workers.dev/?tt=${id}`);
        const data = await res.json();

        const short = data.short;
        if (!short) {
            return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
        }

        // Proxy image to base64 to avoid CORS issues for PDF export
        let posterBase64 = "https://via.placeholder.com/300x450.png?text=Poster+Not+Found";
        if (short.image) {
            try {
                const imgRes = await fetch(short.image);
                if (imgRes.ok) {
                    const arrayBuffer = await imgRes.arrayBuffer();
                    const buffer = Buffer.from(arrayBuffer);
                    const contentType = imgRes.headers.get('content-type') || 'image/jpeg';
                    posterBase64 = `data:${contentType};base64,${buffer.toString('base64')}`;
                }
            } catch (imgErr) {
                console.error("Failed to fetch image for base64 encoding", imgErr);
            }
        }

        // Parse ISO 8601 duration (e.g., PT2H16M)
        let formattedDuration = "Unknown Duration";
        if (short.duration) {
            const match = short.duration.match(/PT(\d+H)?(\d+M)?/);
            if (match) {
                const h = match[1] ? match[1].replace('H', 'h ') : '';
                const m = match[2] ? match[2].replace('M', 'm') : '';
                formattedDuration = (h + m).trim() || "Unknown Duration";
            }
        }

        const castNames = short.actor?.map((a: any) => a.name).slice(0, 5) || ["Unknown Actor"];
        const castWithPics = await Promise.all(castNames.map(async (name: string) => {
            let img = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=200`;
            try {
                const wikiRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(name)}&prop=pageimages&format=json&pithumbsize=300`);
                if (wikiRes.ok) {
                    const wikiData = await wikiRes.json();
                    const pages = wikiData.query?.pages;
                    if (pages) {
                        const pageId = Object.keys(pages)[0];
                        if (pages[pageId]?.thumbnail?.source) {
                            img = pages[pageId].thumbnail.source;
                        }
                    }
                }
            } catch (e) {
                // ignore
            }
            return { name, image: img };
        }));

        const movie = {
            id,
            title: short.name || "Unknown Title",
            year: short.datePublished ? new Date(short.datePublished).getFullYear().toString() : "Unknown",
            poster: posterBase64,
            rating: short.aggregateRating?.ratingValue?.toString() || "N/A",
            cast: castWithPics,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            directors: short.director ? (Array.isArray(short.director) ? short.director.map((d: any) => d.name) : [short.director.name]) : ["Unknown"],
            genres: short.genre || [],
            duration: formattedDuration,
            plot: short.description || "No plot summary available."
        };

        return NextResponse.json(movie);
    } catch (error) {
        console.error("Error fetching movie data:", error);
        return NextResponse.json({ error: 'Failed to fetch movie data' }, { status: 500 });
    }
}
