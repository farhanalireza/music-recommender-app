// src/Components/FirstTimeLogin.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    User, 
    Music2, 
    ArrowRight, 
    ArrowLeft, 
    Sparkles, 
    Info, 
    Compass, 
    Share2, 
    Bookmark 
} from 'lucide-react';

const FirstTimeLogin = ({ onSubmit }) => {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]);

    const genresList = [
        "Pop", "Hip Hop", "Electronic", "Rock", "R & B",
        "K-Pop", "Jazz", "Classical", "Blues", "Country"
    ];

    const toggleGenre = (genre) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter(g => g !== genre));
        } else {
            setSelectedGenres([...selectedGenres, genre]);
        }
    };

    const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
    const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

    const handleSubmit = (e) => {
        e.preventDefault();
        const userName = name.trim() === "" ? "User" : name;
        
        // Save to localStorage
        localStorage.setItem('userName', userName);
        localStorage.setItem('favoriteGenres', JSON.stringify(selectedGenres));

        // Call the parent app callback for dynamic layout transition
        if (onSubmit) {
            onSubmit(userName);
        }
    };

    // Animation settings
    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            x: direction < 0 ? 100 : -100,
            opacity: 0
        })
    };

    return (
        <div className="relative w-full max-w-lg bg-slate-950/80 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 text-white shadow-2xl flex flex-col overflow-hidden min-h-[480px]">
            {/* Background Glow */}
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-purple-600/20 rounded-full filter blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-indigo-600/20 rounded-full filter blur-2xl pointer-events-none" />

            {/* Step Indicators */}
            <div className="flex justify-between items-center mb-8 relative z-10">
                <div className="flex gap-1.5 w-full">
                    {[1, 2, 3].map((num) => (
                        <div 
                            key={num}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                step >= num ? 'bg-purple-500 w-1/3' : 'bg-white/10 w-1/3'
                            }`}
                        />
                    ))}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col relative z-10">
                {/* Step 1: Profile Customization */}
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial="enter"
                        animate="center"
                        exit="exit"
                        variants={slideVariants}
                        custom={1}
                        transition={{ duration: 0.2 }}
                        className="flex-1 flex flex-col justify-between"
                    >
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-black tracking-tight flex items-center gap-2">
                                    Welcome <Sparkles className="text-purple-400 animate-pulse" size={24} />
                                </h1>
                                <p className="text-sm text-gray-400">
                                    Let's get started. Enter your name to personalize your GrooveEstrella dashboard.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs uppercase tracking-wider text-gray-400 font-bold block">
                                    What should we call you?
                                </label>
                                <div className="relative flex items-center">
                                    <User className="absolute left-4 text-gray-500" size={18} />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your name (optional)"
                                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-medium placeholder-gray-600"
                                    />
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                                <Info className="text-purple-400 flex-shrink-0 mt-0.5" size={16} />
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    Your name is only used for interface greetings. It is saved directly to your device and is never shared.
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleNext}
                            className="mt-8 py-3.5 w-full bg-purple-600 hover:bg-purple-700 active:scale-98 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-purple-500/20"
                        >
                            <span>Continue</span>
                            <ArrowRight size={18} />
                        </button>
                    </motion.div>
                )}

                {/* Step 2: Music Taste Selection */}
                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial="enter"
                        animate="center"
                        exit="exit"
                        variants={slideVariants}
                        custom={1}
                        transition={{ duration: 0.2 }}
                        className="flex-1 flex flex-col justify-between"
                    >
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-black tracking-tight">
                                    Your Taste
                                </h1>
                                <p className="text-sm text-gray-400">
                                    Select your favorite genres. We'll use these to prioritize recommendations.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1 no-scrollbar">
                                {genresList.map((genre) => {
                                    const isSelected = selectedGenres.includes(genre);
                                    return (
                                        <button
                                            key={genre}
                                            type="button"
                                            onClick={() => toggleGenre(genre)}
                                            className={`p-3 rounded-2xl border text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                                                isSelected 
                                                    ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/10' 
                                                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                                            }`}
                                        >
                                            <Music2 size={14} className={isSelected ? 'text-white' : 'text-gray-500'} />
                                            <span>{genre}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex gap-3 mt-8">
                            <button
                                type="button"
                                onClick={handleBack}
                                className="py-3.5 px-6 bg-white/5 hover:bg-white/10 active:scale-98 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all border border-white/10"
                            >
                                <ArrowLeft size={18} />
                            </button>
                            <button
                                type="button"
                                onClick={handleNext}
                                className="py-3.5 flex-1 bg-purple-600 hover:bg-purple-700 active:scale-98 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-purple-500/20"
                            >
                                <span>Continue</span>
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Step 3: Tour & Finish */}
                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial="enter"
                        animate="center"
                        exit="exit"
                        variants={slideVariants}
                        custom={1}
                        transition={{ duration: 0.2 }}
                        className="flex-1 flex flex-col justify-between"
                    >
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-black tracking-tight">
                                    Quick Tour
                                </h1>
                                <p className="text-sm text-gray-400">
                                    Welcome to your new music sharing hub.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-2.5 bg-purple-600/20 rounded-xl border border-purple-500/10 text-purple-400">
                                        <Compass size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-white mb-0.5">Smart Music Discovery</h3>
                                        <p className="text-xs text-gray-400 leading-relaxed">
                                            Search and discover albums, artists, and playlists. Talk to the mood chatbot for tailored suggestions.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-2.5 bg-purple-600/20 rounded-xl border border-purple-500/10 text-purple-400">
                                        <Share2 size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-white mb-0.5">High-Res Share Cards & QR Codes</h3>
                                        <p className="text-xs text-gray-400 leading-relaxed">
                                            Share music cards on social media, customize themes, and let friends scan QR codes to discover with you.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-2.5 bg-purple-600/20 rounded-xl border border-purple-500/10 text-purple-400">
                                        <Bookmark size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-white mb-0.5">Local Music Library</h3>
                                        <p className="text-xs text-gray-400 leading-relaxed">
                                            Bookmark your favorite discoveries to save them directly to your local library.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-8">
                            <button
                                type="button"
                                onClick={handleBack}
                                className="py-3.5 px-6 bg-white/5 hover:bg-white/10 active:scale-98 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all border border-white/10"
                            >
                                <ArrowLeft size={18} />
                            </button>
                            <button
                                type="submit"
                                className="py-3.5 flex-1 bg-purple-600 hover:bg-purple-700 active:scale-98 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-purple-500/20"
                            >
                                <span>Get Started</span>
                                <Sparkles size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </form>
        </div>
    );
};

export default FirstTimeLogin;
