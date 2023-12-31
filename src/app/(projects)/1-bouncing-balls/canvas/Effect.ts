import { Particle } from "./Particle";

export class Effect {
  private particles: Particle[] = [];
  private numberOfParticles = 2000;

  public width: number;
  public height: number;

  public mouse: {
    x: number;
    y: number;
    pressed: boolean;
    radius: number;
  };

  constructor(
    public canvas: HTMLCanvasElement,
    public context: CanvasRenderingContext2D
  ) {
    this.canvas = canvas;
    this.context = context;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.createParticles();

    this.mouse = {
      x: 0,
      y: 0,
      pressed: false,
      radius: 150,
    };

    window.addEventListener("resize", () => {
      this.resize({
        width: window.innerWidth,
        height: window.innerHeight,
        context: this.context,
      });
    });

    window.addEventListener("mousemove", (event: MouseEvent) => {
      if (this.mouse.pressed) {
        this.mouse.x = event.x;
        this.mouse.y = event.y;
      }
    });
    window.addEventListener("mousedown", (event: MouseEvent) => {
      this.mouse.pressed = true;
      this.mouse.x = event.x;
      this.mouse.y = event.y;
    });
    window.addEventListener("mouseup", () => {
      this.mouse.pressed = false;
    });
  }

  createParticles() {
    for (let index = 0; index < this.numberOfParticles; index++) {
      this.particles.push(new Particle(this));
    }
  }

  draw(context: CanvasRenderingContext2D) {
    context.clearRect(0, 0, this.width, this.height);
    this.contextSetup(context);
    this.handleParticles(context);
  }

  contextSetup(context: CanvasRenderingContext2D) {
    context.fillStyle = "black";
    context.fillRect(0, 0, this.width, this.height);

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
  }

  handleParticles(context: CanvasRenderingContext2D) {
    // Set gradient colour for balls

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

  resize({
    width,
    height,
  }: {
    width: number;
    height: number;
    context?: CanvasRenderingContext2D;
  }) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = width;
    this.height = height;

    this.contextSetup(this.context);

    this.particles.forEach((particle) => {
      particle.reset();
    });
  }
}
