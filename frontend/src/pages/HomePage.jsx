import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../App.css';
import DataNoticeModal from "../Components/DataNoticeModal";
import Greet from "../Components/Greet";

function HomePage({ userName }) {
    const [backendStatus, setBackendStatus] = useState("Waking Up...");

    useEffect(() => {
        const checkBackend = async () => {
            try {
                const res = await fetch("https://music-recommender-api.onrender.com/health");
                if (res.ok) {
                    setBackendStatus("Online");
                } else {
                    setBackendStatus("Error / Unavailable");
                }
            } catch (err) {
                setBackendStatus("Waking Up... (Cold Start Delay)");
                setTimeout(checkBackend, 5000);
            }
        };
        checkBackend();
    }, []);

    return (
        <div className="md:pl-10 md:pr-10 lg:pl-40 lg:pr-40 h-at-min relative flex flex-col items-center select-none">
            <DataNoticeModal />
            <div className="w-full">
                <Greet />
            </div>

            <div className="flex flex-col items-center justify-center p-8 bg-black/60 border border-white/10 rounded-3xl my-10 backdrop-blur-md text-center mx-4 max-w-4xl shadow-2xl glassmorpho">
                <div className="text-6xl mb-6">🚧</div>
                <h2 className="text-3xl font-bold text-white mb-6 tracking-wide">Discovery Paused</h2>
                
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                    Our music discovery database is currently paused as we are working on the next version of <span className="font-semibold text-white">GrooveEstrella</span>, which will be released soon!
                </p>
                
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                    Meanwhile, you can still search and discover music for yourself! Head over to the <Link to="/search" className="font-bold text-green-400 hover:text-green-300 underline underline-offset-4 transition-colors">Search section</Link> where you can find and save your favorite music, artists, and albums.
                </p>
                
                <div className="flex items-center gap-4 px-6 py-3 bg-black/80 rounded-full border border-white/5 shadow-inner mt-4">
                    <span className="text-base font-medium text-gray-400">Backend API Status:</span>
                    <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${backendStatus === 'Online' ? 'bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.6)]' : 'bg-yellow-500 animate-pulse shadow-[0_0_12px_rgba(234,179,8,0.6)]'}`}></div>
                        <span className={`text-base font-semibold tracking-wide ${backendStatus === 'Online' ? 'text-green-400' : 'text-yellow-400'}`}>
                            {backendStatus}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center text-white bg-gray-900 border border-white/10 rounded-2xl p-8 mb-10 w-full max-w-4xl text-center glassmorpho">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">GrooveEstrella v2 is coming</h1>
                <h2 className="text-xl text-gray-400 font-medium">Next year or sooner.....</h2>
            </div>
        </div>
    );
}

export default HomePage;
