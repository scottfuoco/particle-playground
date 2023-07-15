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
    // Set gradient colour for balls

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
