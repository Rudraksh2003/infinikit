
// Updated Overlay component without any buttons, letting the user add their own
const Overlay = ({ 
  src, 
  mediaType = 'image',
  opacity = 30,
  position = 'center',
  size = 'cover',
  blur = false,
  blurAmount = 3,
  darkOverlay = false,
  darkOverlayOpacity = 50,
  height = 'screen',
  className = '',
  children 
}) => {
  // Convert position to Tailwind classes
  const positionClasses = {
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'top': 'top-0 left-1/2 -translate-x-1/2',
    'bottom': 'bottom-0 left-1/2 -translate-x-1/2',
    'left': 'left-0 top-1/2 -translate-y-1/2',
    'right': 'right-0 top-1/2 -translate-y-1/2',
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0',
  };

  // Convert size to Tailwind classes
  const sizeClasses = {
    'cover': 'object-cover',
    'contain': 'object-contain',
    'auto': 'object-none',
    'fill': 'object-fill',
  };

  // Height classes
  const heightClasses = {
    'screen': 'h-screen',
    'auto': 'h-auto',
    'full': 'h-full',
  };

  // Generate blur class (using standard Tailwind classes)
  const blurClass = blur ? `blur-${Math.min(Math.max(blurAmount, 1), 3) * 2}` : '';

  return (
    <div className={`relative ${heightClasses[height]} overflow-hidden ${className}`}>
      {/* Background Media */}
      {mediaType === 'video' ? (
        <video
          src={src}
          autoPlay
          loop
          muted
          className={`absolute w-full h-full ${positionClasses[position]} ${sizeClasses[size]} ${blurClass} pointer-events-none select-none`}
          style={{ opacity: opacity / 100 }}
        />
      ) : (
        <img
          src={src}
          alt="background"
          className={`absolute w-full h-full ${positionClasses[position]} ${sizeClasses[size]} ${blurClass} pointer-events-none select-none`}
          style={{ opacity: opacity / 100 }}
        />
      )}

      {/* Dark Overlay */}
      {darkOverlay && (
        <div 
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ opacity: darkOverlayOpacity / 100 }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default Overlay;



/*
<Overlay 
        src={thela} // Use the imported variable here
        mediaType="image"
        opacity={30}
        height="screen"
        darkOverlay={true}
        darkOverlayOpacity={20}
      >
        {/* Content centered in the middle of the screen 
        <div className="flex flex-col justify-center items-center h-full text-center px-4">
          <h1 className="text-6xl font-bold text-white mb-4">
            Manage Your Files Seamlessly<br />Share in a Secure Way
          </h1>
          {/* No buttons here, as requested 
        </div>
      </Overlay>
    */