"use client";

import { useState } from "react";
import { Film, Sparkles } from "lucide-react";
import { SearchModule } from "@/components/movies/SearchModule";
import { TrendingMovies } from "@/components/movies/TrendingMovies";
import { MagazineViewer } from "@/components/movies/MagazineViewer";
import { motion, AnimatePresence } from "framer-motion";

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

interface AnalysisData {
  summary: string;
  sentiment: "Positive" | "Mixed" | "Negative";
  confidence: number;
  aspects: { label: string; score: number }[];
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState<MovieData | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);

  const handleSearch = async (id: string) => {
    setIsLoading(true);
    setMovie(null);
    setAnalysis(null);

    try {
      const [movieRes, analysisRes] = await Promise.all([
        fetch(`/api/movie?id=${id}`),
        fetch(`/api/analyze?id=${id}`)
      ]);

      if (movieRes.ok && analysisRes.ok) {
        const movieData = await movieRes.json();
        const analysisData = await analysisRes.json();
        setMovie(movieData);
        setAnalysis(analysisData);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHome = () => {
    setMovie(null);
    setAnalysis(null);
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen bg-noir text-cream selection:bg-gold/30 overflow-x-hidden font-sans">
      <AnimatePresence mode="wait">
        {!movie && !isLoading && (
          <motion.div
            key="home"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            {/* Dark Cinematic Hero */}
            <header className="relative w-full min-h-[70vh] flex flex-col items-center justify-center text-center overflow-hidden border-b border-surface">
              {/* Silhouette / Noir Background */}
              <div className="absolute inset-0 z-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2659&auto=format&fit=crop"
                  alt="Noir Silhouette"
                  className="w-full h-full object-cover opacity-30 filter grayscale contrast-150"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/60 to-noir/80"></div>
                <div className="absolute inset-0 bg-noir/40 mix-blend-overlay"></div>
              </div>

              <div className="relative z-10 max-w-4xl mx-auto px-6 mt-16">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-gold leading-[1.1] mb-6 drop-shadow-2xl font-bold tracking-tight">
                  DISCOVER THE SOUL<br className="hidden md:block" />
                  OF CINEMA'S CLASSICS
                </h1>
                <p className="text-sm md:text-base text-cream/70 max-w-2xl mx-auto mb-12 font-medium tracking-wide">
                  Enter a Film's Reel ID for In-Depth Critiques, Thematic Breakdowns, and <br className="hidden md:block" />
                  Sentiment Analysis from the Golden Age.
                </p>

                <div className="w-full max-w-2xl mx-auto relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 via-gold/5 to-gold/20 rounded-full blur-md opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                  <SearchModule onSearch={handleSearch} isLoading={isLoading} />
                </div>

                {/* Consulted users badge */}
                <div className="mt-12 flex items-center justify-center gap-4 border border-surface bg-surface/40 backdrop-blur-sm rounded-full py-2 px-6 w-fit mx-auto shadow-xl">
                  <div className="flex items-center gap-2">
                    <span className="material-icons text-cream/40 text-sm">local_movies</span>
                    <span className="material-icons text-gold text-sm">theaters</span>
                    <span className="material-icons text-cream/40 text-sm">movie_edit</span>
                  </div>
                  <span className="text-xs text-cream/60">Consulted by <strong className="text-cream">124+</strong> Vintage Film Aficionados</span>
                </div>
              </div>
            </header>

            <div className="container mx-auto px-4 lg:px-20 py-16">
              <TrendingMovies onSelect={handleSearch} />

              {/* Professional Insights Section */}
              <section className="mt-32 pt-16 border-t border-surface grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative overflow-hidden bg-noir">
                {/* Left massive quote layout */}
                <div className="lg:col-span-5 flex flex-col justify-start relative z-10">
                  <h2 className="text-3xl font-serif text-cream tracking-wider uppercase mb-8 pb-4 border-b border-surface inline-block max-w-fit pr-12">Professional Insights</h2>
                  <p className="text-4xl lg:text-[42px] font-serif italic text-cream leading-[1.3] drop-shadow-sm text-balance">
                    "A masterpiece<br />
                    of shadows and<br />
                    light, where<br />
                    every frame tells<br />
                    a story."
                    <br /><span className="text-3xl text-cream/50 mt-6 block">— The Cinematic<br />Archives</span>
                  </p>
                </div>

                {/* Right detailed columns layout */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12 relative z-10">
                  <div className="space-y-4">
                    <h3 className="text-gold uppercase tracking-widest text-[11px] font-bold">The Art of Critique</h3>
                    <p className="text-cream/60 text-xs leading-relaxed max-w-sm">
                      <span className="float-left text-5xl font-serif text-gold mr-2 mt-[-4px] leading-none">U</span>nderstanding film language, understanding process symbolism, and enclosing director's intent, nuancesate understanding in cinematic response to mainline language vision and contextual symbolism, and director's intent.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-gold uppercase tracking-widest text-[11px] font-bold">Decoding the Narrative</h3>
                    <p className="text-cream/60 text-xs leading-relaxed max-w-sm">
                      <span className="float-left text-5xl font-serif text-gold mr-2 mt-[-4px] leading-none">P</span>lot structure, character development, and historical context. Decoding developments and visual contexts and encapsulating mechanics through various strict historical analysis paradigms and exploring frames.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-gold text-2xl flex items-center gap-2"><span className="material-icons text-[28px] text-gold/80 hover:text-gold transition-colors cursor-pointer">movie</span></h3>
                    <p className="text-cream/60 text-xs leading-relaxed max-w-sm">
                      <span className="float-left text-5xl font-serif text-gold mr-2 mt-[-4px] leading-none">E</span>ncapsulating the process and understanding film language, historical context techniques, intrinsic tradition, exploration in dynamic relations between creators' language visions.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-gold text-2xl flex items-center gap-2"><span className="material-icons text-[28px] text-gold/80 hover:text-gold transition-colors cursor-pointer">camera_roll</span></h3>
                    <p className="text-cream/60 text-xs leading-relaxed max-w-sm">
                      <span className="float-left text-5xl font-serif text-gold mr-2 mt-[-4px] leading-none">T</span>he context architectures of plot development, and historical contexts, character formations and narrative structures within historical context.
                    </p>
                  </div>

                  <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8 mt-4 pt-8 border-t border-surface/50">
                    <div className="space-y-2">
                      <h4 className="text-gold uppercase tracking-widest text-[10px] font-bold">Archival Reel ID</h4>
                      <p className="text-cream/50 text-[10px] max-w-[200px]">Access definitive film data and historical records.</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-gold uppercase tracking-widest text-[10px] font-bold">Cinematic Intelligence</h4>
                      <p className="text-cream/50 text-[10px] max-w-[200px]">Analysis powered by our proprietary film archive.</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-gold uppercase tracking-widest text-[10px] font-bold">Comprehensive Dossier</h4>
                      <p className="text-cream/50 text-[10px] max-w-[200px]">Detailed reports and historical context.</p>
                    </div>
                  </div>
                </div>

                {/* Spotlight Projector graphic on right edge */}
                <div className="absolute right-[-15%] top-1/2 -translate-y-1/2 opacity-20 pointer-events-none hidden lg:block mix-blend-screen">
                  <div className="w-[800px] h-[800px] bg-gradient-radial from-cream/10 via-transparent to-transparent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                  <span className="material-icons text-[500px] text-cream drop-shadow-2xl">videocam</span>
                </div>
              </section>
            </div>

            <footer className="mt-8 border-t border-surface bg-noir py-10 px-8 flex flex-col items-center justify-center text-[9px] text-cream/40 uppercase tracking-widest">
              <div className="flex items-center gap-2 text-gold opacity-80 hover:opacity-100 transition">
                <span className="material-icons text-lg">movie_filter</span>
                <div className="flex flex-col items-start leading-none gap-0.5">
                  <span className="font-serif tracking-widest text-[10px]">CINEMATIC</span>
                  <span className="text-[7px] tracking-[0.2em]">ARCHIVES & ANALYSIS</span>
                </div>
              </div>
            </footer>

          </motion.div>
        )}

        {(movie || isLoading) && (
          <motion.div
            key="magazine-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full bg-noir"
          >
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-noir z-50">
                <span className="text-gold font-serif text-2xl animate-pulse tracking-widest uppercase">Initializing Projector...</span>
              </div>
            ) : (
              movie && analysis && <MagazineViewer movie={movie} analysis={analysis} onBack={handleHome} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
