'use client';
import React, { useEffect, useRef } from 'react';
import styles from './NatureParticles.module.css';

interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    type: 'leaf' | 'firefly' | 'mist' | 'petal';
    rotation: number;
    rotationSpeed: number;
    color: string;
    scale: number;
    life: number;
    maxLife: number;
}

const LEAF_COLORS = ['#52b788', '#40916c', '#2d6a4f', '#95d5b2', '#74c69d', '#b7e4c7'];
const PETAL_COLORS = ['#ffccd5', '#ffc8dd', '#ffd6e0', '#ff9f1c', '#ffb347'];
const FIREFLY_COLORS = ['#d4fc79', '#96e6a1', '#fff47d', '#a3de83'];

function createParticle(canvasWidth: number, canvasHeight: number): Particle {
    const types: Particle['type'][] = ['leaf', 'firefly', 'mist', 'petal'];
    const weights = [40, 20, 30, 10];
    let rand = Math.random() * 100;
    let type: Particle['type'] = 'leaf';
    let cumulative = 0;
    for (let i = 0; i < types.length; i++) {
        cumulative += weights[i];
        if (rand < cumulative) { type = types[i]; break; }
    }

    const maxLife = type === 'firefly' ? 180 + Math.random() * 120
        : type === 'mist' ? 300 + Math.random() * 200
            : 200 + Math.random() * 150;

    return {
        x: Math.random() * canvasWidth,
        y: canvasHeight + 20,
        size: type === 'mist' ? 60 + Math.random() * 80
            : type === 'leaf' ? 6 + Math.random() * 10
                : type === 'petal' ? 4 + Math.random() * 6
                    : 2 + Math.random() * 3,
        speedX: (Math.random() - 0.5) * (type === 'mist' ? 0.4 : 0.8),
        speedY: -(0.3 + Math.random() * (type === 'mist' ? 0.4 : 0.9)),
        opacity: type === 'mist' ? 0.05 + Math.random() * 0.1 : 0.6 + Math.random() * 0.4,
        type,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * (type === 'leaf' ? 3 : 1),
        color: type === 'leaf' ? LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)]
            : type === 'petal' ? PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)]
                : type === 'firefly' ? FIREFLY_COLORS[Math.floor(Math.random() * FIREFLY_COLORS.length)]
                    : '#ffffff',
        scale: 0.8 + Math.random() * 0.6,
        life: 0,
        maxLife,
    };
}

function drawLeaf(ctx: CanvasRenderingContext2D, p: Particle) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    const lifeRatio = p.life / p.maxLife;
    const alpha = lifeRatio < 0.1 ? lifeRatio * 10 * p.opacity
        : lifeRatio > 0.8 ? (1 - lifeRatio) * 5 * p.opacity : p.opacity;
    ctx.globalAlpha = Math.min(alpha, 1);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, p.size * p.scale, p.size * 0.5 * p.scale, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(-p.size * p.scale, 0);
    ctx.lineTo(p.size * p.scale, 0);
    ctx.stroke();
    ctx.restore();
}

function drawFirefly(ctx: CanvasRenderingContext2D, p: Particle) {
    const lifeRatio = p.life / p.maxLife;
    const pulse = Math.sin(p.life * 0.1) * 0.5 + 0.5;
    const alpha = lifeRatio < 0.15 ? lifeRatio / 0.15 * pulse
        : lifeRatio > 0.75 ? (1 - lifeRatio) / 0.25 * pulse : pulse;
    ctx.save();
    ctx.globalAlpha = Math.min(alpha * 0.85, 1);
    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6);
    gradient.addColorStop(0, p.color);
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = Math.min(alpha, 1);
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

function drawMist(ctx: CanvasRenderingContext2D, p: Particle) {
    const lifeRatio = p.life / p.maxLife;
    const alpha = lifeRatio < 0.2 ? lifeRatio / 0.2 * p.opacity
        : lifeRatio > 0.7 ? (1 - lifeRatio) / 0.3 * p.opacity : p.opacity;
    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(alpha, 1));
    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
    gradient.addColorStop(0, 'rgba(255,255,255,0.3)');
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

function drawPetal(ctx: CanvasRenderingContext2D, p: Particle) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    const lifeRatio = p.life / p.maxLife;
    const alpha = lifeRatio < 0.1 ? lifeRatio * 10 * p.opacity
        : lifeRatio > 0.8 ? (1 - lifeRatio) * 5 * p.opacity : p.opacity;
    ctx.globalAlpha = Math.min(alpha, 0.85);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, p.size * p.scale * 0.7, p.size * p.scale * 1.2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

export const NatureParticles: React.FC<{ intensity?: number }> = ({ intensity = 1 }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animFrameRef = useRef<number>(0);
    const frameRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const maxParticles = Math.floor(55 * intensity);

        const animate = () => {
            frameRef.current++;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Spawn new particles
            const spawnRate = frameRef.current % Math.floor(4 / intensity) === 0;
            if (spawnRate && particlesRef.current.length < maxParticles) {
                particlesRef.current.push(createParticle(canvas.width, canvas.height));
            }

            // Update & draw
            particlesRef.current = particlesRef.current.filter(p => {
                p.life++;
                p.x += p.speedX + Math.sin(p.life * 0.03) * 0.3;
                p.y += p.speedY;
                p.rotation += p.rotationSpeed;

                if (p.life >= p.maxLife || p.y < -50) return false;

                switch (p.type) {
                    case 'leaf': drawLeaf(ctx, p); break;
                    case 'firefly': drawFirefly(ctx, p); break;
                    case 'mist': drawMist(ctx, p); break;
                    case 'petal': drawPetal(ctx, p); break;
                }
                return true;
            });

            animFrameRef.current = requestAnimationFrame(animate);
        };

        animate();
        return () => {
            cancelAnimationFrame(animFrameRef.current);
            window.removeEventListener('resize', resize);
        };
    }, [intensity]);

    return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
};

export default NatureParticles;
