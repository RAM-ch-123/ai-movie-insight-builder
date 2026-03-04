import { useState } from "react";

interface Aspect {
    label: string;
    score: number;
}

interface AnalysisData {
    summary: string;
    sentiment: "Positive" | "Mixed" | "Negative";
    confidence: number;
    aspects: Aspect[];
}

interface MovieData {
    id: string;
    title: string;
    year: string;
    poster: string;
    rating: string;
    cast: { name: string, image: string }[];
    directors: string[];
    genres: string[];
    duration: string;
    plot: string;
}

interface MagazineViewerProps {
    movie: MovieData;
    analysis: AnalysisData;
    onBack: () => void;
}

export function MagazineViewer({ movie, analysis, onBack }: MagazineViewerProps) {
    // Generate stars for the rating system
    const ratingScore = parseFloat(movie.rating) || 0;
    const fullStars = Math.floor(ratingScore / 2);
    const hasHalfStar = ratingScore / 2 - fullStars >= 0.5;

    // Safety fallback for data
    const runtimeStr = movie.duration !== "Unknown Duration" ? movie.duration : "Unknown runtime";
    const genreStr = movie.genres.length > 0 ? movie.genres[0] : "Feature Film";

    // Text Parser for Editorial Inject
    const parseEditorialText = (text: string) => {
        return text
            .replace(/groundbreaking/gi, '<span class="text-gold font-bold">groundbreaking</span>')
            .replace(/visual effects/gi, '<span class="text-gold font-bold">visual effects</span>')
            .replace(/meticulously/gi, '<span class="text-cream italic">meticulously</span>')
            .replace(/85% positive sentiment/gi, '<span class="text-gold font-bold underline decoration-gold/40 decoration-2 underline-offset-4">85% positive sentiment</span>');
    };

    return (
        <div className="w-full bg-noir relative min-h-screen">
            <div className="relative w-full h-[55dvh] md:h-[65dvh] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    alt="Movie Poster Full Bleed"
                    className="w-full top-0 h-full object-cover object-top filter contrast-125 saturate-50 sepia-[.2]"
                    src={movie.poster}
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/1080x1920.png?text=Poster+Not+Found";
                    }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/60 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-noir to-transparent"></div>

                <header className="absolute top-0 left-0 right-0 z-50 px-6 py-8 flex items-center justify-between">
                    <button onClick={onBack} className="p-3 rounded-full bg-surface/40 backdrop-blur-md text-cream border border-surface/30 hover:bg-surface/60 transition shadow-lg">
                        <span className="material-icons text-xl">arrow_back_ios_new</span>
                    </button>
                    <div className="bg-surface/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-cream/10 shadow-sm mix-blend-screen">
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gold/80">Reel No. {movie.id} • Cinematic Archives</span>
                    </div>
                </header>

                <div className="absolute inset-x-0 bottom-0 px-6 pb-2">
                    <div className="max-w-md mx-auto w-full relative z-20">
                        <h1 className="text-5xl md:text-7xl font-serif text-cream leading-[1] mb-5 tracking-tighter uppercase drop-shadow-sm text-shadow-xl">
                            {movie.title}
                        </h1>

                        <div className="flex items-center justify-between pb-4 border-b border-cream/10">

                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-gold text-noir text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm">
                                    {genreStr === "Action" || genreStr === "Drama" ? "Classic Feature" : `${genreStr} Feature`}
                                </span>
                                <span className="text-cream/80 text-[11px] font-semibold tracking-wider">
                                    {movie.year} • {runtimeStr}
                                </span>
                            </div>

                            <div className="flex flex-col items-end gap-1 px-2">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-sm font-sans font-medium text-cream/90">{movie.rating}</span>
                                    <span className="text-[10px] font-bold text-cream/60 uppercase tracking-widest">Score</span>
                                </div>
                                <div className="flex gap-0.5 text-gold">
                                    {[...Array(fullStars)].map((_, i) => (
                                        <span key={`f-${i}`} className="material-icons text-xs" style={{ fontSize: "12px" }}>star</span>
                                    ))}
                                    {hasHalfStar && <span className="material-icons text-xs" style={{ fontSize: "12px" }}>star_half</span>}
                                    {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
                                        <span key={`e-${i}`} className="material-icons text-xs text-cream/10" style={{ fontSize: "12px" }}>star</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="relative z-10 px-6 pb-32 max-w-6xl mx-auto -mt-6">
                <section className="bg-noir pt-8 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    {/* Left Column: Editorial Insight */}
                    <div className="lg:col-span-6 space-y-6">
                        <div className="flex items-center gap-3 text-gold/60">
                            <div className="h-px flex-1 bg-gold/20"></div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cream/70">Archival Insight</span>
                            <div className="h-px flex-1 bg-gold/20"></div>
                        </div>
                        <div className="relative">
                            <p
                                className="text-2xl leading-relaxed text-cream/90 font-serif magazine-dropcap"
                                dangerouslySetInnerHTML={{
                                    __html: parseEditorialText(analysis.summary + ` This is reflected by an algorithm mapping an unprecedented <span class="text-gold font-bold underline decoration-gold/40 decoration-2 underline-offset-4">${analysis.confidence}% ${analysis.sentiment.toLowerCase()} sentiment</span> across the cinematic metrics.`)
                                }}
                            />

                            <div className="mt-8 flex items-center gap-3">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="https://images.unsplash.com/photo-1542385151-efd9000785a0?w=150&h=150&fit=crop"
                                    alt="Author"
                                    className="w-8 h-8 rounded-full object-cover filter grayscale contrast-125"
                                />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-cream/80">By Cinematic Archives • 3 Min Read</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Intelligence & Cast */}
                    <div className="lg:col-span-6 space-y-16 pt-10 lg:pt-0">
                        <div className="space-y-6">
                            <h3 className="text-[11px] font-bold text-gold uppercase tracking-[0.4em] text-center lg:text-left">Cinematic Intelligence</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {analysis.aspects.slice(0, 4).map((aspect, idx) => {
                                    const styles = [
                                        { bg: 'bg-surface', border: 'border-gold/20', text: 'text-gold', icon: 'psychology', triviaColor: 'text-gold' },
                                        { bg: 'bg-gold/5', border: 'border-gold/10', text: 'text-gold', icon: 'bolt', triviaColor: 'text-cream' },
                                        { bg: 'bg-noir', border: 'border-cream/10', text: 'text-cream/70', icon: 'grid_view', triviaColor: 'text-gold' },
                                        { bg: 'bg-surface/50', border: 'border-cream/10', text: 'text-cream/70', headerColor: 'text-cream', subColor: 'text-cream/60', icon: 'movie_edit', triviaColor: 'text-gold' }
                                    ];
                                    const s = styles[idx % styles.length];

                                    return (
                                        <div key={idx} className={`${s.bg} p-5 rounded-2xl border ${s.border}`}>
                                            <span className={`material-symbols-outlined ${s.text} mb-4`}>{s.icon}</span>
                                            <h4 className={`font-serif text-lg font-bold ${s.headerColor || 'text-cream'}`}>{aspect.label}</h4>
                                            <p className={`text-[10px] leading-tight mt-1 ${s.subColor || 'text-cream/60'}`}>Score: {aspect.score}/100 metric measurement.</p>
                                            <div className={`mt-3 text-[9px] font-bold uppercase ${s.triviaColor}`}>AI Analyzed</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {movie.cast && movie.cast.length > 0 && (
                            <div className="space-y-6">
                                <div className="flex items-baseline justify-between">
                                    <h3 className="font-serif text-3xl font-bold text-cream">The Protagonists</h3>
                                    <span className="text-[10px] font-bold text-gold uppercase tracking-widest">Profiles</span>
                                </div>
                                <div className="flex overflow-x-auto gap-5 pb-6 no-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0 snap-x">
                                    {movie.cast.map((actor, idx) => (
                                        <div key={idx} className="flex-shrink-0 w-48 space-y-3 snap-center">
                                            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-surface/50 border border-cream/10 flex items-center justify-center relative shadow-xl">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={actor.image} alt={actor.name} className="w-full h-full object-cover filter contrast-125 sepia-[.2]" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-noir via-transparent to-transparent opacity-50"></div>
                                            </div>
                                            <div>
                                                <p className="font-serif text-lg font-bold whitespace-nowrap overflow-hidden text-ellipsis text-cream">{actor.name}</p>
                                                <p className="text-[10px] text-gold font-bold uppercase tracking-widest">Leading Role</p>
                                                <p className="text-[10px] text-cream/50 mt-1 italic">Noted performance in {movie.title}.</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
