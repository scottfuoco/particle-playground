import { Particle } from "./Particle";

export class Effect {
  private particles: Particle[] = [];
  private numberOfParticles = 2000;

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

  handleParticles(context: CanvasRenderingContext2D) {
    this.particles.forEach((particle) => {
      particle.draw(context);
      particle.update();
    });
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
