
import React, { useEffect, useRef } from 'react';

const WaterRippleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Set canvas to full screen
    canvas.width = width;
    canvas.height = height;
    
    // Ripple settings
    const ripples: {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      opacity: number;
      speed: number;
    }[] = [];

    // Add new ripple at random position
    const addRipple = () => {
      ripples.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0,
        maxRadius: 100 + Math.random() * 100,
        opacity: 0.5,
        speed: 1 + Math.random() * 2,
      });

      // Limit number of ripples
      if (ripples.length > 20) {
        ripples.shift();
      }
    };

    // Initial ripples
    for (let i = 0; i < 5; i++) {
      addRipple();
    }

    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Set gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      const isDarkMode = document.documentElement.classList.contains('dark');
      
      if (isDarkMode) {
        gradient.addColorStop(0, 'rgba(22, 37, 52, 0.03)');
        gradient.addColorStop(1, 'rgba(33, 212, 253, 0.03)');
      } else {
        gradient.addColorStop(0, 'rgba(240, 249, 255, 0.5)');
        gradient.addColorStop(1, 'rgba(214, 242, 255, 0.5)');
      }
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Draw ripples
      ripples.forEach((ripple, index) => {
        // Update radius
        ripple.radius += ripple.speed;
        ripple.opacity -= 0.003;
        
        // Draw ripple
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(30, 136, 229, ${ripple.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Remove if too large or transparent
        if (ripple.radius > ripple.maxRadius || ripple.opacity <= 0) {
          ripples.splice(index, 1);
        }
      });
      
      // Add new ripple occasionally
      if (Math.random() < 0.02) {
        addRipple();
      }
      
      requestAnimationFrame(animate);
    };
    
    // Handle window resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener('resize', handleResize);
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default WaterRippleBackground;
