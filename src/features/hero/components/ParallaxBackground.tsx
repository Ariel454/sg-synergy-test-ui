import { useHeroParallax } from '../hooks/useHeroParallax';

// Public domain video — just a sample for the parallax effect.
const VIDEO_SRC =
  'https://videos.pexels.com/video-files/3571264/3571264-hd_1280_720_30fps.mp4';

export default function ParallaxBackground() {
  const bgRef = useHeroParallax('background', 0.4);

  return (
    <div ref={bgRef} className="absolute inset-0 will-change-transform">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Fallback gradient shown while video loads */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-neutral-950 to-purple-950" />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/60" />
    </div>
  );
}
