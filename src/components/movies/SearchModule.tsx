import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchModuleProps {
    onSearch: (query: string) => void;
    isLoading: boolean;
}

export function SearchModule({ onSearch, isLoading }: SearchModuleProps) {
    const [query, setQuery] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = query.trim();

        if (!trimmed) {
            setError("Please enter a valid movie ID.");
            return;
        }

        if (trimmed.length < 2) {
            setError("Query must be at least 2 characters long.");
            return;
        }

        setError("");
        onSearch(trimmed);
    };

    return (
        <div className="w-full max-w-2xl mx-auto mb-16 relative z-20">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-gold/30 to-gold/10 rounded-full blur opacity-50"></div>
            <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row items-center gap-2 bg-surface/90 backdrop-blur-xl p-2 rounded-3xl sm:rounded-full border border-gold/20 shadow-2xl">
                <div className="relative flex-1 w-full flex items-center">
                    <Search className="absolute left-6 text-gold/60 h-5 w-5" />
                    <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Enter IMDb Reel ID (e.g., tt0133093)..."
                        className="pl-14 h-14 text-lg bg-transparent border-none text-cream placeholder:text-cream/30 focus-visible:ring-0 shadow-none font-serif tracking-wide"
                        disabled={isLoading}
                    />
                </div>
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="h-14 px-10 rounded-full bg-gradient-to-r from-gold to-gold/80 text-noir hover:from-cream hover:to-gold hover:text-noir text-sm font-bold tracking-[0.3em] uppercase transition-all duration-500 shadow-[0_0_20px_rgba(197,168,105,0.3)] w-full sm:w-auto"
                >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    {isLoading ? "Projecting" : "Analyze"}
                </Button>
            </form>

            {error && (
                <p className="text-red-400 text-sm mt-4 font-medium animate-in slide-in-from-top-1 fade-in text-center shadow-sm">
                    {error}
                </p>
            )}

            <div className="flex gap-4 justify-center items-center mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-cream/40">
                <span className="text-gold/60">Archives:</span>
                <button onClick={() => setQuery("tt0133093")} className="hover:text-gold transition-colors">The Matrix</button>
                <span className="text-surface">•</span>
                <button onClick={() => setQuery("tt0468569")} className="hover:text-gold transition-colors">The Dark Knight</button>
                <span className="text-surface">•</span>
                <button onClick={() => setQuery("tt0111161")} className="hover:text-gold transition-colors">Shawshank</button>
            </div>
        </div>
    );
}
