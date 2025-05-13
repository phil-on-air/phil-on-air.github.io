// Add PowerGlitch script
const script = document.createElement('script');
script.src = 'https://unpkg.com/powerglitch@latest/dist/powerglitch.min.js';
document.head.appendChild(script);

// Wait for PowerGlitch to load
script.onload = () => {
  console.log('PowerGlitch loaded successfully');
  
  // Function to get random text elements
  const getRandomTextElements = () => {
    const textElements = Array.from(document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a'));
    const randomElements = [];
    const numElements = Math.floor(Math.random() * 3) + 1; // Random number between 1 and 3
    
    for (let i = 0; i < numElements; i++) {
      if (textElements.length > 0) {
        const randomIndex = Math.floor(Math.random() * textElements.length);
        randomElements.push(textElements[randomIndex]);
        textElements.splice(randomIndex, 1);
      }
    }
    
    return randomElements;
  };

  // Function to apply glitch effect
  const applyGlitch = (element) => {
    try {
      PowerGlitch.glitch(element, {
        playMode: 'always',
        createContainers: true,
        hideOverflow: false,
        timing: {
          duration: 1000,
          iterations: 1,
          easing: 'ease-in-out'
        },
        glitchTimeSpan: {
          start: 0.2,
          end: 0.8
        },
        shake: {
          velocity: 15,
          amplitudeX: 0.2,
          amplitudeY: 0.2
        },
        slice: {
          count: 6,
          velocity: 15,
          minHeight: 0.02,
          maxHeight: 0.15,
          hueRotate: true
        }
      });
    } catch (error) {
      console.error('Error applying glitch:', error);
    }
  };

  // Function to trigger random glitches
  const triggerRandomGlitches = () => {
    const elements = getRandomTextElements();
    elements.forEach(element => {
      applyGlitch(element);
    });
  };

  // Trigger glitches every 1-3 seconds
  const scheduleNextGlitch = () => {
    const delay = Math.random() * 2000 + 1000; // Random delay between 1-3 seconds
    setTimeout(() => {
      triggerRandomGlitches();
      scheduleNextGlitch();
    }, delay);
  };

  // Start the glitch cycle
  scheduleNextGlitch();
};

script.onerror = (error) => {
  console.error('Failed to load PowerGlitch:', error);
}; 