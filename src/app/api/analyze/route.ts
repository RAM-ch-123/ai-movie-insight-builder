import { NextResponse } from 'next/server';

const mockInsights: Record<string, unknown> = {
    "tt0133093": { // The Matrix
        summary: "Audience reviews overwhelmingly praise the groundbreaking visual effects, philosophical depth, and tight pacing. Neo's journey is cited as iconic.",
        sentiment: "Positive",
        confidence: 94,
        aspects: [
            { label: "Visual Effects", score: 98 },
            { label: "Story & Plot", score: 92 },
            { label: "Acting", score: 85 }
        ]
    },
    "tt0468569": { // The Dark Knight
        summary: "Heath Ledger's Joker universally steals the show. Reviewers highlight the dark, gritty realism and masterful direction, though some find the runtime slightly long.",
        sentiment: "Positive",
        confidence: 97,
        aspects: [
            { label: "Acting (Ledger)", score: 99 },
            { label: "Directing", score: 95 },
            { label: "Pacing", score: 88 }
        ]
    },
    "tt0111161": { // Shawshank
        summary: "Often described as the perfect movie. Reviewers are moved by its themes of hope and friendship, with zero notable detractions across thousands of reviews.",
        sentiment: "Positive",
        confidence: 99,
        aspects: [
            { label: "Story & Plot", score: 98 },
            { label: "Acting", score: 96 },
            { label: "Emotional Impact", score: 99 }
        ]
    }
};

const defaultInsight = {
    summary: "Reviews are somewhat polarized. While the core premise is intriguing, audiences felt the execution was lacking in the third act. The visual style is appreciated.",
    sentiment: "Mixed",
    confidence: 72,
    aspects: [
        { label: "Visuals", score: 80 },
        { label: "Story & Plot", score: 65 },
        { label: "Pacing", score: 55 }
    ]
};

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || !id.match(/^tt\d+$/)) {
        return NextResponse.json({ error: 'Invalid or missing IMDb ID' }, { status: 400 });
    }

    // Add realistic LLM inference delay (longer than normal DB fetch)
    await new Promise(resolve => setTimeout(resolve, 2500));

    const insight = mockInsights[id] || defaultInsight;

    return NextResponse.json(insight);
}
