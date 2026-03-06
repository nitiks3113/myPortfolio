import { useEffect, useRef } from "react";

class Star {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.radius = Math.random() * 1.2 + 0.2;
    this.speed = Math.random() * 0.05;
  }

  draw() {
    const ctx = this.ctx;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

    ctx.shadowBlur = 6;
    ctx.shadowColor = "white";

    ctx.fillStyle = "white";
    ctx.fill();
  }

  update() {
    this.y += this.speed;

    if (this.y > this.canvas.height) {
      this.y = 0;
      this.x = Math.random() * this.canvas.width;
    }

    this.draw();
  }
}

class Nebula {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.radius = Math.random() * 350 + 250;

    const colors = [
      "rgba(255, 80, 180, 0.25)",
      "rgba(120, 80, 255, 0.25)",
      "rgba(60, 140, 255, 0.25)",
      "rgba(255, 100, 200, 0.25)"
    ];

    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  draw() {
    const ctx = this.ctx;

    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.radius
    );

    gradient.addColorStop(0, this.color);
    gradient.addColorStop(1, "transparent");

    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default function GalaxyBackground() {

  const canvasRef = useRef(null);

  useEffect(() => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let stars = [];
    let nebulas = [];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createStars() {
      stars = [];
      for (let i = 0; i < 350; i++) {
        stars.push(new Star(canvas, ctx));
      }
    }

    function createNebula() {
      nebulas = [];
      for (let i = 0; i < 4; i++) {
        nebulas.push(new Nebula(canvas, ctx));
      }
    }

    let animationId;

    function animate() {
      ctx.fillStyle = "#02020a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      nebulas.forEach(n => n.draw());
      stars.forEach(s => s.update());

      animationId = requestAnimationFrame(animate);
    }

    resizeCanvas();
    createStars();
    createNebula();
    animate();

    window.addEventListener("resize", () => {
      resizeCanvas();
      createStars();
      createNebula();
    });

    return () => cancelAnimationFrame(animationId);

  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}