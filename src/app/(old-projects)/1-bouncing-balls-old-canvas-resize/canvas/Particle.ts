import { type Effect } from "./Effect";

export class Particle {
  private x: number;
  private y: number;
  private hslColour: string;

  private radius = Math.random() * 10 + 5;
  private vx = Math.random();
  private vy = Math.random();

  constructor(public effect: Effect) {
    this.effect = effect;

    const xMin = this.radius;
    const xMax = effect.width - this.radius * 2;
    this.x = xMin + Math.random() * xMax;

    const yMin = this.radius;
    const yMax = effect.height - this.radius * 2;
    this.y = yMin + Math.random() * yMax;

    this.hslColour = `hsl(${Math.random() * 360}, 100%, 50%)`;
  }

  draw(context: CanvasRenderingContext2D) {
    context.lineWidth = 3;
    context.strokeStyle = "blue";

    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fill();
    context.stroke();
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x >= this.effect.width - this.radius || this.x <= this.radius) {
      this.vx *= -1;
    }

    if (this.y <= this.radius || this.y >= this.effect.height - this.radius) {
      this.vy *= -1;
    }
  }
}
