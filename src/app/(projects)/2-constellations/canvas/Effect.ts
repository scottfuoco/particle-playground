import { Particle } from "./Particle";

export class Effect {
  private particles: Particle[] = [];
  private numberOfParticles = 200;

  public width: number;
  public height: number;

  constructor(public canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.createParticles();
  }

  createParticles() {
    for (let index = 0; index < this.numberOfParticles; index++) {
      this.particles.push(new Particle(this));
    }
  }

  draw(context: CanvasRenderingContext2D) {
    context.clearRect(0, 0, this.width, this.height);
    this.backgroundSetup(context);
    this.handleParticles(context);
  }

  backgroundSetup(context: CanvasRenderingContext2D) {
    context.fillStyle = "black";
    context.fillRect(0, 0, this.width, this.height);
  }

  handleParticles(context: CanvasRenderingContext2D) {
    const gradient = context.createLinearGradient(
      0,
      0,
      context.canvas.width,
      context.canvas.height
    );

    gradient.addColorStop(0, "white");
    gradient.addColorStop(0.5, "magenta");
    gradient.addColorStop(1, "blue");
    context.fillStyle = gradient;

    this.connectedParticles(context);

    this.particles.forEach((particle) => {
      particle.draw(context);
      particle.update();
    });
  }

  connectedParticles(context: CanvasRenderingContext2D) {
    const maxDistance = 100;
    for (let a = 0; a < this.particles.length; a++) {
      const particleA = this.particles[a];
      if (!particleA) continue;
      for (let b = a; b < this.particles.length; b++) {
        const particleB = this.particles[b];
        if (!particleB) continue;

        const dx = particleA.x - particleB.x;
        const dy = particleA.y - particleB.y;

        const distance = Math.hypot(dx, dy);

        if (distance < maxDistance) {
          // draw a line between the two particles
          context.save();
          const opacity = 1 - distance / maxDistance;
          context.globalAlpha = opacity;
          context.beginPath();
          context.strokeStyle = "white";
          context.moveTo(particleA.x, particleA.y);
          context.lineTo(particleB.x, particleB.y);
          context.stroke();
          context.restore();
        }
      }
    }
  }

  setCanvasSize(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  setCanvas(canvasRef: HTMLCanvasElement) {
    this.canvas = canvasRef;
    this.height = this.canvas.height;
    this.width = this.canvas.width;
  }
}
