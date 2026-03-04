import { TrendingUp, Award, Star } from "lucide-react";

interface TrendingMoviesProps {
    onSelect: (id: string) => void;
}

export function TrendingMovies({ onSelect }: TrendingMoviesProps) {
    const getProxy = (url: string) => `/api/proxy?url=${encodeURIComponent(url)}`;

    const trending = [
        { id: "tt0816692", title: "Interstellar", year: "2014", poster: getProxy("https://m.media-amazon.com/images/M/MV5BNTE0MmZiNGEtOGY3NS00NDcyLWFiYTItM2IwMWI4YzBkMzk3XkEyXkFqcGc@._V1_.jpg"), badge: "Modern Masterpiece" },
        { id: "tt15398776", title: "Oppenheimer", year: "2023", poster: getProxy("https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"), badge: "Critically Acclaimed" },
        { id: "tt9362722", title: "Spider-Man: Across the Spider-Verse", year: "2023", poster: getProxy("https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg"), badge: "Visual Triumph" },
        { id: "tt10366206", title: "John Wick: Chapter 4", year: "2023", poster: getProxy("https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg"), badge: "Action Epic" },
    ];

    return (
        <div className="mt-20 mb-16 animate-in fade-in duration-1000 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-gold/30"></div>

            <div className="flex flex-col items-center justify-center gap-3 mb-16 text-cream pt-16">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-gold/80 flex items-center gap-2">
                    <Star className="w-3 h-3" />
                    Archive Selections
                    <Star className="w-3 h-3" />
                </span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tighter text-shadow-sm">Trending Editorials</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-0">
                {trending.map((movie) => (
                    <div
                        key={movie.id}
                        onClick={() => onSelect(movie.id)}
                        className="group flex flex-col gap-4 cursor-pointer relative"
                    >
                        {/* Film Strip Border Effect */}
                        <div className="absolute -inset-2 bg-noir border border-surface rounded-sm z-0 shadow-2xl overflow-hidden">
                            <div className="absolute left-1 top-0 bottom-0 w-2 flex flex-col justify-between py-2 overflow-hidden opacity-50">
                                {[...Array(20)].map((_, i) => <div key={`l-${i}`} className="w-1.5 h-2 bg-surface/50 rounded-sm mb-1.5"></div>)}
                            </div>
                            <div className="absolute right-1 top-0 bottom-0 w-2 flex flex-col justify-between py-2 overflow-hidden opacity-50">
                                {[...Array(20)].map((_, i) => <div key={`r-${i}`} className="w-1.5 h-2 bg-surface/50 rounded-sm mb-1.5"></div>)}
                            </div>
                        </div>

                        {/* Gold Wax Seal Badge */}
                        <div className="absolute -top-3 -right-3 z-20 bg-gradient-to-br from-gold/80 to-gold/40 text-noir text-[8px] font-bold uppercase tracking-widest py-4 px-2 rounded-full shadow-lg border border-gold/30 flex items-center justify-center text-center transform rotate-12 group-hover:rotate-0 transition-transform duration-500 w-16 h-16 backdrop-blur-md">
                            {movie.badge}
                        </div>

                        <div className="aspect-[2/3] w-full bg-surface relative overflow-hidden z-10 border border-gold/10">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={movie.poster}
                                alt={movie.title}
                                className="w-full h-full object-cover filter sepia-[.3] contrast-125 saturate-50 transition-all duration-700 group-hover:sepia-0 group-hover:contrast-100 group-hover:saturate-100 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-noir via-transparent to-transparent opacity-80"></div>
                        </div>

                        <div className="flex flex-col z-10 px-2">
                            <h3 className="font-serif font-bold text-cream text-lg leading-tight group-hover:text-gold transition-colors text-shadow-sm">{movie.title}</h3>
                            <div className="flex items-center justify-between mt-2">
                                <p className="text-[10px] font-bold tracking-[0.2em] text-gold/60 uppercase">{movie.year}</p>
                                <span className="text-[9px] uppercase tracking-widest text-cream/40 border border-cream/10 px-2 py-0.5 rounded-sm">View Reel</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
