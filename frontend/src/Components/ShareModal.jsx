// src/Components/ShareModal.jsx
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    X, 
    Download, 
    Copy, 
    Check, 
    Share2, 
    Maximize2, 
    Minimize2,
    Music2
} from 'lucide-react';
import { toPng } from 'html-to-image';
import { createPortal } from 'react-dom';

export default function ShareModal({
    isOpen,
    onClose,
    itemId,
    title,
    artist,
    imageUrl,
    popularity,
    explicit,
    type = "track" // track, album, artist, playlist
}) {
    const cardRef = useRef(null);
    const [copied, setCopied] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [zoomQR, setZoomQR] = useState(false);
    
    // Customization states
    const [cardTheme, setCardTheme] = useState('cosmic');
    const [qrColor, setQrColor] = useState('9333ea'); // Purple hex without hash

    // Generate clean share url based on current site host
    const shareUrl = `${window.location.origin}/${type}/${itemId}`;

    const themes = {
        cosmic: 'bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 border border-purple-500/20 shadow-[0_0_50px_rgba(147,51,234,0.15)]',
        ocean: 'bg-gradient-to-br from-slate-950 via-cyan-950 to-blue-950 border border-cyan-500/20 shadow-[0_0_50px_rgba(6,182,212,0.15)]',
        sunset: 'bg-gradient-to-br from-stone-950 via-rose-950 to-red-950 border border-rose-500/20 shadow-[0_0_50px_rgba(244,63,94,0.15)]',
        glass: 'bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]'
    };

    const qrColors = [
        { label: 'Purple', hex: '9333ea', class: 'bg-purple-600' },
        { label: 'Emerald', hex: '10b981', class: 'bg-emerald-500' },
        { label: 'Cyan', hex: '06b6d4', class: 'bg-cyan-500' },
        { label: 'Rose', hex: 'ec4899', class: 'bg-rose-500' },
        { label: 'Amber', hex: 'f59e0b', class: 'bg-amber-500' },
        { label: 'White', hex: 'ffffff', class: 'bg-white' }
    ];

    const qrApi = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(shareUrl)}&color=${qrColor}&bgcolor=030712&format=png`;

    // Copy Link to clipboard
    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy link:', err);
        }
    };

    // Download Card as high-res PNG image
    const handleDownloadCard = async () => {
        if (!cardRef.current) return;
        setIsGenerating(true);
        try {
            // Generate the data URL image representation of the element
            const dataUrl = await toPng(cardRef.current, {
                quality: 1.0,
                pixelRatio: 2, // makes the image look incredibly crisp and clean
                style: {
                    transform: 'scale(1)',
                    transformOrigin: 'top left',
                    width: cardRef.current.offsetWidth + 'px',
                    height: cardRef.current.offsetHeight + 'px'
                },
                cacheBust: true,
                useCORS: true // prevents tainted canvas/CORS errors with Spotify CDN images
            });

            const link = document.createElement('a');
            link.download = `groove_${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_card.png`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error('Error generating card image:', error);
            alert('Failed to generate high-quality image. Try copying the link instead!');
        } finally {
            setIsGenerating(false);
        }
    };

    // Native Web Share
    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${title} - GrooveEstrella`,
                    text: `Listen to "${title}" on GrooveEstrella!`,
                    url: shareUrl
                });
            } catch (err) {
                console.warn('Native share cancelled or failed:', err);
            }
        }
    };

    // Social shares
    const handleShareTwitter = () => {
        const text = `🎵 Check out "${title}" on GrooveEstrella!`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
    };

    const handleShareWhatsApp = () => {
        const text = `🎵 Check out "${title}" on GrooveEstrella!\n${shareUrl}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    };

    const handleShareTelegram = () => {
        const text = `🎵 Check out "${title}" on GrooveEstrella!`;
        window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`, '_blank');
    };

    // Prevent backdrop scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || typeof window === "undefined") return null;

    return createPortal(
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg overflow-y-auto">
                {/* Backdrop Click to Close */}
                <div className="absolute inset-0 cursor-default" onClick={onClose} />

                {/* Modal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 30 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                    className="relative w-full max-w-4xl max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible bg-slate-950/90 border border-white/10 rounded-3xl shadow-2xl z-10 grid grid-cols-1 md:grid-cols-2"
                >
                    {/* Close Button */}
                    <button 
                        onClick={onClose} 
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-all z-20"
                    >
                        <X size={20} />
                    </button>

                    {/* Column 1: Live GrooveCard Card Preview */}
                    <div className="flex flex-col items-center justify-center p-6 border-b md:border-b-0 md:border-r border-white/10 bg-black/40 rounded-t-3xl md:rounded-tr-none md:rounded-l-3xl">
                        <div className="text-xs uppercase tracking-widest text-purple-400 font-bold mb-4">
                            GrooveCard Preview
                        </div>

                        {/* Capture Container */}
                        <div 
                            ref={cardRef} 
                            className={`w-full max-w-[320px] rounded-2xl p-5 flex flex-col items-center select-none text-white ${themes[cardTheme]} transition-all duration-500`}
                        >
                            {/* Card Header: Type Badge */}
                            <div className="w-full flex justify-between items-center mb-4">
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold tracking-wider uppercase text-purple-200">
                                    <Music2 size={12} />
                                    {type}
                                </div>
                                {explicit && (
                                    <span className="bg-red-500/80 px-2 py-0.5 rounded text-[10px] font-bold text-white tracking-widest">
                                        E
                                    </span>
                                )}
                            </div>

                            {/* Cover Art Image */}
                            <div className="relative w-48 h-48 rounded-xl overflow-hidden shadow-xl mb-4 group border border-white/5">
                                <img
                                    src={imageUrl || "/placeholder.jpg"}
                                    alt={title}
                                    className="w-full h-full object-cover"
                                    crossOrigin="anonymous"
                                />
                            </div>

                            {/* Music Details */}
                            <div className="text-center w-full px-2 mb-4">
                                <h3 className="text-lg font-bold truncate leading-tight mb-1" title={title}>
                                    {title}
                                </h3>
                                <p className="text-sm text-gray-300 truncate" title={Array.isArray(artist) ? artist.map(a => a.name).join(', ') : artist}>
                                    {Array.isArray(artist) ? artist.map(a => a.name).join(', ') : artist}
                                </p>
                                {popularity && (
                                    <div className="flex items-center justify-center gap-1 mt-1 text-xs text-yellow-400">
                                        🔥 Popularity: {popularity}
                                    </div>
                                )}
                            </div>

                            {/* Embedded QR Code */}
                            <div className="relative group bg-gray-950 p-3 rounded-xl border border-white/5 shadow-inner">
                                <img
                                    src={qrApi}
                                    alt="Sharing QR Code"
                                    className="w-28 h-28 rounded-md transition-all duration-300"
                                />
                                <button 
                                    onClick={() => setZoomQR(true)}
                                    className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl text-white cursor-pointer"
                                >
                                    <Maximize2 size={20} />
                                </button>
                            </div>
                            <div className="text-[10px] text-gray-400 mt-2 text-center uppercase tracking-widest">
                                Scan to discover on GrooveEstrella
                            </div>

                            {/* Watermark branding */}
                            <div className="mt-4 flex items-center gap-1.5 text-xs text-white/40 font-semibold uppercase tracking-wider border-t border-white/5 pt-3 w-full justify-center">
                                <img src="/in.svg" alt="Logo" className="h-3.5 w-auto opacity-40" />
                                <span>GrooveEstrella</span>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Customizer and Actions */}
                    <div className="flex flex-col justify-between p-5 md:p-8 space-y-6 md:space-y-0">
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-black text-white mb-1">Share Music</h2>
                                <p className="text-sm text-gray-400">Personalize and share your music cards with others.</p>
                            </div>

                            {/* Customizer: Themes */}
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-gray-400 font-bold">
                                    Card Theme
                                </label>
                                <div className="grid grid-cols-4 gap-2">
                                    {Object.keys(themes).map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => setCardTheme(t)}
                                            className={`px-3 py-2 text-xs font-semibold rounded-lg capitalize border transition-all ${
                                                cardTheme === t 
                                                    ? 'bg-white text-black border-white' 
                                                    : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                                            }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Customizer: QR Color */}
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-gray-400 font-bold">
                                    QR Code Color
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {qrColors.map((color) => (
                                        <button
                                            key={color.hex}
                                            onClick={() => setQrColor(color.hex)}
                                            className={`w-8 h-8 rounded-full border transition-all flex items-center justify-center ${color.class} ${
                                                qrColor === color.hex 
                                                    ? 'border-white scale-110 shadow-lg ring-2 ring-purple-500/50' 
                                                    : 'border-transparent scale-100 hover:scale-105'
                                            }`}
                                            title={color.label}
                                        >
                                            {qrColor === color.hex && (
                                                <div className={`w-2 h-2 rounded-full ${color.hex === 'ffffff' ? 'bg-black' : 'bg-white'}`} />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Actions Area */}
                        <div className="space-y-4 mt-8 md:mt-0">
                            {/* Primary Action Row */}
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={handleDownloadCard}
                                    disabled={isGenerating}
                                    className="flex items-center justify-center gap-2 py-3.5 px-4 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-bold rounded-2xl transition-all shadow-lg hover:shadow-purple-500/20 disabled:opacity-50"
                                >
                                    <Download size={18} />
                                    {isGenerating ? 'Saving...' : 'Save Image'}
                                </button>

                                <button
                                    onClick={handleCopyLink}
                                    className="flex items-center justify-center gap-2 py-3.5 px-4 bg-white/10 hover:bg-white/15 active:scale-95 text-white font-bold rounded-2xl transition-all border border-white/15"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="text-green-400 animate-bounce" size={18} />
                                            <span className="text-green-400">Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={18} />
                                            <span>Copy Link</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Native / Social Share Grid */}
                            <div className="space-y-2">
                                <div className="text-xs uppercase tracking-wider text-gray-400 font-bold">
                                    Direct Share
                                </div>
                                <div className="flex gap-2">
                                    {navigator.share && (
                                        <button
                                            onClick={handleNativeShare}
                                            className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all flex-1 flex items-center justify-center gap-2 font-bold text-sm"
                                        >
                                            <Share2 size={16} />
                                            Share sheet
                                        </button>
                                    )}
                                    <button
                                        onClick={handleShareTwitter}
                                        className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all flex items-center justify-center flex-1 font-bold text-sm border border-white/5"
                                    >
                                        Twitter/X
                                    </button>
                                    <button
                                        onClick={handleShareWhatsApp}
                                        className="p-3 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-xl transition-all flex items-center justify-center flex-1 font-bold text-sm border border-green-500/10"
                                    >
                                        WhatsApp
                                    </button>
                                    <button
                                        onClick={handleShareTelegram}
                                        className="p-3 bg-sky-600/20 hover:bg-sky-600/30 text-sky-400 rounded-xl transition-all flex items-center justify-center flex-1 font-bold text-sm border border-sky-500/10"
                                    >
                                        Telegram
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

                {/* QR Code Full Zoom Overlay */}
                <AnimatePresence>
                    {zoomQR && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-6 backdrop-blur-xl"
                        >
                            <button 
                                onClick={() => setZoomQR(false)}
                                className="absolute top-6 right-6 p-3 rounded-full bg-white/5 hover:bg-white/15 text-white transition-all"
                            >
                                <Minimize2 size={24} />
                            </button>
                            <motion.div
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.9 }}
                                className="bg-slate-950 p-6 rounded-3xl border border-white/10 shadow-2xl text-center max-w-sm"
                            >
                                <h3 className="text-xl font-bold text-white mb-2 truncate">{title}</h3>
                                <p className="text-sm text-gray-400 mb-6 truncate">{Array.isArray(artist) ? artist.map(a => a.name).join(', ') : artist}</p>
                                <img
                                    src={qrApi.replace('size=400x400', 'size=800x800')}
                                    alt="Large QR Code"
                                    className="w-72 h-72 rounded-xl mx-auto shadow-inner border border-white/5 mb-4"
                                />
                                <div className="text-xs text-gray-500 uppercase tracking-widest">Scan to Discover</div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
        </AnimatePresence>,
        document.body
    );
}
