import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify, faYoutube, faApple, faSoundcloud } from '@fortawesome/free-brands-svg-icons'

export const SpotifyButton = ({ clickHandle }) => {
  return (
    <button onClick={clickHandle} className='text-md m-2 justify-center align-middle font-heavy text-center bg-green-500 text-white px-1 py-1.5 md:px-3 md:py-2 md:text-lg rounded flex items-center gap-2 hover:text-black active:text-black active:scale-90 transition-all duration-200 p-5'>
      Play on <span className='hidden sm:flex'>Spotify</span>
      <FontAwesomeIcon icon={faSpotify} className="text-2xl" />
    </button>
  )
}

export const YouTubeButton = ({ clickHandle }) => {
  return (
    <button onClick={clickHandle} className='text-md m-2 justify-center align-middle font-heavy text-center bg-red-500 text-white px-1 py-1.5 md:px-3 md:py-2 md:text-lg rounded flex items-center gap-2 hover:text-black active:text-black active:scale-90 transition-all duration-200'>
      Watch on <span className='hidden sm:flex'>Youtube</span>
      <FontAwesomeIcon icon={faYoutube} className="text-2xl" />
    </button>
  )
}

export const AppleMusicButton = ({ clickHandle }) => {
  return (
    <button onClick={clickHandle} className='text-md m-2 justify-center align-middle font-heavy text-center bg-[#FC3C44] text-white px-1 py-1.5 md:px-3 md:py-2 md:text-lg rounded flex items-center gap-2 hover:text-black active:text-black active:scale-90 transition-all duration-200'>
      Play on <span className='hidden sm:flex'>Apple Music</span>
      <FontAwesomeIcon icon={faApple} className="text-2xl" />
    </button>
  )
}

export const SoundCloudButton = ({ clickHandle }) => {
  return (
    <button onClick={clickHandle} className='text-md m-2 justify-center align-middle font-heavy text-center bg-[#FF5500] text-white px-1 py-1.5 md:px-3 md:py-2 md:text-lg rounded flex items-center gap-2 hover:text-black active:text-black active:scale-90 transition-all duration-200'>
      Listen on <span className='hidden sm:flex'>SoundCloud</span>
      <FontAwesomeIcon icon={faSoundcloud} className="text-2xl" />
    </button>
  )
}

export const TidalButton = ({ clickHandle }) => {
  return (
    <button onClick={clickHandle} className='text-md m-2 justify-center align-middle font-heavy text-center bg-black border border-white/20 text-white px-1 py-1.5 md:px-3 md:py-2 md:text-lg rounded flex items-center gap-2 hover:border-cyan-400 hover:text-cyan-400 active:scale-90 transition-all duration-200'>
      Listen on <span className='hidden sm:flex'>Tidal</span>
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
        <path d="M12.012 0L6.006 6.006l6.006 6.006 6.006-6.006zm-6.006 6.006L0 12.012l6.006 6.006 6.006-6.006zm12.012 0l-6.006 6.006 6.006 6.006L24 12.012zM12.012 12.012L6.006 18.018l6.006 6.006 6.006-6.006z"/>
      </svg>
    </button>
  )
}

export const SmallSpotifyButton = ({ clickHandle }) => {
    return (
        <button onClick={clickHandle} className='text-xs mx-2 my-1 justify-center align-middle font-heavy text-center bg-green-500 text-white px-2.5 py-2 md:px-3.5 md:py-2 md:text-lg rounded flex items-center gap-2 hover:scale-105 hover:text-black active:text-black active:scale-90 transition-all duration-300' title="Spotify">
            <FontAwesomeIcon icon={faSpotify} className="text-4xl" />
        </button>
    )
}

export const SmallYouTubeButton = ({ clickHandle }) => {
    return (
      <button onClick={clickHandle} className='text-xs mx-2 my-1 justify-center align-middle font-heavy text-center bg-red-500 text-white px-2 py-2 md:px-3 md:py-2 md:text-lg rounded flex items-center gap-2 hover:scale-105 hover:text-black active:text-black active:scale-90 transition-all duration-200' title="Youtube">
        <FontAwesomeIcon icon={faYoutube} className="text-4xl" />
      </button>
    )
}

export const SmallAppleMusicButton = ({ clickHandle }) => {
    return (
      <button onClick={clickHandle} className='text-xs mx-2 my-1 justify-center align-middle font-heavy text-center bg-[#FC3C44] text-white px-2 py-2 md:px-3 md:py-2 md:text-lg rounded flex items-center gap-2 hover:scale-105 hover:text-black active:text-black active:scale-90 transition-all duration-200' title="Apple Music">
        <FontAwesomeIcon icon={faApple} className="text-4xl" />
      </button>
    )
}

export const SmallSoundCloudButton = ({ clickHandle }) => {
    return (
      <button onClick={clickHandle} className='text-xs mx-2 my-1 justify-center align-middle font-heavy text-center bg-[#FF5500] text-white px-2 py-2 md:px-3 md:py-2 md:text-lg rounded flex items-center gap-2 hover:scale-105 hover:text-black active:text-black active:scale-90 transition-all duration-200' title="SoundCloud">
        <FontAwesomeIcon icon={faSoundcloud} className="text-4xl" />
      </button>
    )
}

export const SmallTidalButton = ({ clickHandle }) => {
    return (
      <button onClick={clickHandle} className='text-xs mx-2 my-1 justify-center align-middle font-heavy text-center bg-black border border-white/10 text-white px-2 py-2 md:px-3 md:py-2 md:text-lg rounded flex items-center gap-2 hover:scale-105 hover:border-cyan-400 hover:text-cyan-400 active:scale-90 transition-all duration-200' title="Tidal">
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M12.012 0L6.006 6.006l6.006 6.006 6.006-6.006zm-6.006 6.006L0 12.012l6.006 6.006 6.006-6.006zm12.012 0l-6.006 6.006 6.006 6.006L24 12.012zM12.012 12.012L6.006 18.018l6.006 6.006 6.006-6.006z"/>
        </svg>
      </button>
    )
}

const MusicButtons = () => {
  return (
    <div className="flex gap-4">
      <SpotifyButton />
      <YouTubeButton />
    </div>
  )
}

export default MusicButtons
