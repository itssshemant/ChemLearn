import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  pulse: number;
  pulseSpeed: number;
}

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particles: Particle[] = [];
      const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 12000));
      
      const colors = [
        'rgba(0, 217, 255, 0.8)',  // Cyan - Chemistry blue
        'rgba(99, 102, 241, 0.7)', // Purple - Noble gases
        'rgba(0, 255, 136, 0.6)',  // Green - Alkali metals
        'rgba(255, 100, 100, 0.6)', // Red - Halogens
        'rgba(255, 200, 0, 0.5)',  // Yellow - Metalloids
        'rgba(255, 0, 255, 0.4)',  // Magenta - Transition metals
      ];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 4 + 2,
          opacity: Math.random() * 0.6 + 0.3,
          color: colors[Math.floor(Math.random() * colors.length)],
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.01
        });
      }
      
      particlesRef.current = particles;
    };

    const animate = () => {
      timeRef.current += 0.016; // ~60fps
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach((particle, index) => {
        // Update position with slight orbital motion
        particle.x += particle.vx + Math.sin(timeRef.current * 0.5 + particle.pulse) * 0.1;
        particle.y += particle.vy + Math.cos(timeRef.current * 0.3 + particle.pulse) * 0.1;
        
        // Update pulse for glowing effect
        particle.pulse += particle.pulseSpeed;
        const pulseIntensity = (Math.sin(particle.pulse) + 1) * 0.5;
        
        // Bounce off edges with some randomness
        if (particle.x <= 0 || particle.x >= canvas.width) {
          particle.vx *= -0.9;
          particle.vx += (Math.random() - 0.5) * 0.1;
        }
        if (particle.y <= 0 || particle.y >= canvas.height) {
          particle.vy *= -0.9;
          particle.vy += (Math.random() - 0.5) * 0.1;
        }
        
        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        
        // Draw particle with enhanced glow effect
        ctx.save();
        
        const currentOpacity = particle.opacity * (0.7 + pulseIntensity * 0.3);
        const currentSize = particle.size * (0.8 + pulseIntensity * 0.4);
        
        // Outer glow (largest)
        ctx.globalAlpha = currentOpacity * 0.1;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentSize * 6, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Middle glow
        ctx.globalAlpha = currentOpacity * 0.3;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentSize * 3, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Inner particle (brightest)
        ctx.globalAlpha = currentOpacity;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Core highlight
        ctx.globalAlpha = currentOpacity * 1.5;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentSize * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
        
        ctx.restore();
        
        // Draw molecular bonds between nearby particles
        particlesRef.current.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            const bondStrength = (1 - distance / 120);
            ctx.save();
            ctx.globalAlpha = bondStrength * 0.4 * currentOpacity;
            
            // Create gradient for the bond
            const gradient = ctx.createLinearGradient(
              particle.x, particle.y, 
              otherParticle.x, otherParticle.y
            );
            gradient.addColorStop(0, particle.color);
            gradient.addColorStop(1, otherParticle.color);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = bondStrength * 2;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            
            // Add small energy pulse along the bond
            const pulsePos = (Math.sin(timeRef.current * 2 + distance * 0.1) + 1) * 0.5;
            const pulseX = particle.x + (otherParticle.x - particle.x) * pulsePos;
            const pulseY = particle.y + (otherParticle.y - particle.y) * pulsePos;
            
            ctx.globalAlpha = bondStrength * 0.8;
            ctx.beginPath();
            ctx.arc(pulseX, pulseY, 1, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.fill();
            
            ctx.restore();
          }
        });
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};