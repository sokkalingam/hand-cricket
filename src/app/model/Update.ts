export class Update {
  level: number; // 1 to 5, 1 being the highest
  message: string;

  constructor(level: number, message: string) {
    this.level = level;
    this.message = message;
  }
}
