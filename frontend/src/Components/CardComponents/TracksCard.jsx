import { ExplicitBadge } from "./ExplicitBadge";
import { PlayButton } from "./PlayButton";
import { ShareTrackComponent } from "./ShareTrackComponent"; // Add this import
import { usePlayer } from "../../contexts/PlayerContext";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bookmark, BookmarkCheck, Award, CirclePlay, EllipsisVertical, Share2 } from "lucide-react";
import { SpotifyButton, YouTubeButton } from "../MusicButtons";
import { useNavigate } from "react-router-dom";
import ShareModal from "../ShareModal";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "../ui/dropdown-menu";

export const TrackCard = ({
    url,
    title,
    artist,
    spoURL,
    popularity,
    explicit,
    trackURI,
    albumID,
    trackId, // Add this prop for the share component
}) => {
    // console.log(trackURI);
    

    const navigate = useNavigate();
    const { showPlayer } = usePlayer();
    const [saved, setSaved] = useState(false);
    const [isShareOpen, setIsShareOpen] = useState(false);

    useEffect(() => {
        const savedSongs = JSON.parse(localStorage.getItem("savedSongs")) || [];
        const isSaved = savedSongs.some(
            (album) => album.trackURI === trackURI
        );
        setSaved(isSaved);
    }, [trackURI]);

    function toggleSave() {
        const savedSongs = JSON.parse(localStorage.getItem("savedSongs")) || [];

        if (saved) {
            // REMOVE by trackURI
            const updated = savedSongs.filter(song => song.trackURI !== trackURI);
            localStorage.setItem("savedSongs", JSON.stringify(updated));
            setSaved(false);
        } else {
            // ADD the song
            const newSong = {
                title,
                artist,
                spoURL,
                image: url,
                popularity,
                explicit,
                trackURI,
                albumID,
                trackId,
            };
            savedSongs.push(newSong);
            localStorage.setItem("savedSongs", JSON.stringify(savedSongs));
            setSaved(true);
        }
    }

    const handlePlayClick = () => {
        if (trackURI && trackURI.startsWith("spotify:track:")) {
            showPlayer(trackURI, false);
        } else {
            console.warn("Invalid Spotify URI:", trackURI);
        }
    };

    const handleSave = () => {
        toggleSave();
    };

    const handleClick = (url) => {
        setTimeout(() => window.open(url, "_blank"), 300);
    };

    return (
        <motion.div
            initial={{ opacity: 0, translateY: 100, y: 20 }}
            whileInView={{ opacity: 1, translateY: 0, y: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative w-48 sm:w-84 bg-gradient-to-br from-gray-900/80 to-black/10 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl hover:shadow-green-500/10 transition-all duration-500"
        >
            {/* Image */}
            <div className="relative overflow-hidden">
                <img
                    src={url}
                    alt={title}
                    className="w-full h-auto object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

{/* Content */}
<div className="relative p-3 sm:p-4 space-y-3">
    {/* Header with Title and Desktop Controls */}
    <div className="flex justify-between items-start gap-2">
        <div className="flex-1 min-w-0">
            <h3 
                className="text-sm sm:text-lg font-bold text-white truncate cursor-pointer hover:underline transition-colors duration-200"
                title={title}
                onClick={() => navigate(`/album/${albumID}`)}
            >
                {title}
            </h3>
            
            <div className="flex flex-wrap gap-x-1 text-xs sm:text-sm text-gray-300 mt-1">
                {artist.map((a, i) => (
                    <span
                        key={a.id}
                        className="cursor-pointer hover:underline hover:text-white transition-colors duration-200"
                        title={a.name}
                        onClick={() => navigate(`/artist/${a.id}`)}
                    >
                        {a.name}{i < artist.length - 1 && ','}
                    </span>
                ))}
            </div>
        </div>

        {/* Desktop Controls */}
        <div className="hidden sm:flex gap-2 items-center">
            <PlayButton onPlay={handlePlayClick} />
            <ShareTrackComponent
                trackId={trackId}
                title={title}
                artist={artist}
                url={url}
                popularity={popularity}
                explicit={explicit}
            />
            <button
                onClick={handleSave}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
            >
                {saved ? (
                    <BookmarkCheck size={18} className="text-green-400" />
                ) : (
                    <Bookmark size={18} className="text-white" />
                )}
            </button>
        </div>

        {/* Mobile Dropdown */}
        <div className="flex sm:hidden">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 text-white">
                        <EllipsisVertical size={16} />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                    className="bg-black/95 backdrop-blur-xl text-white min-w-[160px] rounded-xl p-2 border border-white/20 shadow-2xl"
                    align="end"
                    side="top"
                    sideOffset={8}
                >
                    <DropdownMenuItem
                        onSelect={handlePlayClick}
                        className="cursor-pointer px-3 py-2.5 hover:bg-white/10 rounded-lg transition-all duration-200 flex items-center gap-2"
                    >
                        <CirclePlay size={16} /> Play
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator className="my-2 bg-white/20" />
                    
                    <DropdownMenuItem
                        onSelect={handleSave}
                        className="cursor-pointer px-3 py-2.5 hover:bg-white/10 rounded-lg transition-all duration-200 flex items-center gap-2"
                    >
                        {saved ? (
                            <>
                                <BookmarkCheck size={16} className="text-green-400" /> 
                                Saved
                            </>
                        ) : (
                            <>
                                <Bookmark size={16} /> 
                                Save
                            </>
                        )}
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem
                        onSelect={() => setIsShareOpen(true)}
                        className="cursor-pointer px-3 py-2.5 hover:bg-white/10 rounded-lg transition-all duration-200 flex items-center gap-2"
                    >
                        <Share2 size={16} /> Share Card
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator className="my-1.5 bg-white/10" />
                    
                    <DropdownMenuItem
                        onSelect={() => window.open(`https://music.apple.com/us/search?term=${encodeURIComponent(title + ' ' + artist.map(a => a.name).join(' '))}`, "_blank")}
                        className="cursor-pointer px-3 py-2.5 hover:bg-white/10 rounded-lg transition-all duration-200 flex items-center gap-2"
                    >
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-rose-400">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.51-.63.73-1.18 1.87-1.03 2.98 1.12.09 2.27-.56 2.98-1.43z"/>
                        </svg>
                        <span>Apple Music</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onSelect={() => window.open(`https://listen.tidal.com/search?q=${encodeURIComponent(title + ' ' + artist.map(a => a.name).join(' '))}`, "_blank")}
                        className="cursor-pointer px-3 py-2.5 hover:bg-white/10 rounded-lg transition-all duration-200 flex items-center gap-2"
                    >
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-cyan-400">
                            <path d="M12.012 0L6.006 6.006l6.006 6.006 6.006-6.006zm-6.006 6.006L0 12.012l6.006 6.006 6.006-6.006zm12.012 0l-6.006 6.006 6.006 6.006L24 12.012zM12.012 12.012L6.006 18.018l6.006 6.006 6.006-6.006z"/>
                        </svg>
                        <span>Tidal</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onSelect={() => window.open(`https://soundcloud.com/search?q=${encodeURIComponent(title + ' ' + artist.map(a => a.name).join(' '))}`, "_blank")}
                        className="cursor-pointer px-3 py-2.5 hover:bg-white/10 rounded-lg transition-all duration-200 flex items-center gap-2"
                    >
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-orange-400">
                            <path d="M11.56 16.75c0 .24-.18.42-.4.42H1.4c-.22 0-.4-.18-.4-.42v-5.2c0-.24.18-.42.4-.42h9.76c.22 0 .4.18.4.42v5.2zm1.6 0c0 .24-.18.42-.4.42h-.8c-.22 0-.4-.18-.4-.42v-6c0-.24.18-.42.4-.42h.8c.22 0 .4.18.4.42v6zm1.6 0c0 .24-.18.42-.4.42h-.8c-.22 0-.4-.18-.4-.42V8.35c0-.24.18-.42.4-.42h.8c.22 0 .4.18.4.42v8.4zm1.6 0c0 .24-.18.42-.4.42h-.8c-.22 0-.4-.18-.4-.42V6.75c0-.24.18-.42.4-.42h.8c.22 0 .4.18.4.42v10zm1.6 0c0 .24-.18.42-.4.42h-.8c-.22 0-.4-.18-.4-.42V7.55c0-.24.18-.42.4-.42h.8c.22 0 .4.18.4.42v9.2zm1.6 0c0 .24-.18.42-.4.42h-.8c-.22 0-.4-.18-.4-.42V9.15c0-.24.18-.42.4-.42h.8c.22 0 .4.18.4.42v7.6zm4.8-1.2c0 1.1-.9 2-2 2h-2c-.22 0-.4-.18-.4-.42V8.35c.6-.6 1.4-1 2.4-1 2.2 0 4 1.8 4 4v2.2c0 1.1-.9 2-2 2z"/>
                        </svg>
                        <span>SoundCloud</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>

    {/* Explicit Badge - positioned over the image */}
    {explicit && (
        <div className="absolute top-2 right-2 sm:top-20 sm:right-8 z-10">
            <ExplicitBadge />
        </div>
    )}

    {/* Popularity */}
    <div className={`flex items-center gap-1 text-sm ${popularity >= 80 ? "text-green-400" : "text-yellow-400"}`}>
        <Award size={16} />
        <span>Popularity: {popularity}</span>
        {popularity >= 80 && <span title="Trending">🔥</span>}
    </div>

    {/* External Buttons */}
    <div className="space-y-2 flex flex-col">
        <SpotifyButton clickHandle={() => handleClick(spoURL)} />
        <YouTubeButton clickHandle={() => handleClick(`https://www.youtube.com/results?search_query=${title + " " + artist.map((a, i) => a.name)}`)} />
    </div>
</div>
            <ShareModal
                isOpen={isShareOpen}
                onClose={() => setIsShareOpen(false)}
                itemId={trackId || trackURI?.split(':')[2]}
                title={title}
                artist={artist}
                imageUrl={url}
                popularity={popularity}
                explicit={explicit}
                type="track"
            />
        </motion.div>
    );
};