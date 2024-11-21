class Game {
  private targetNumber: number;

  constructor() {
    this.targetNumber = this.generateTargetNumber();
  }

  private generateTargetNumber() {
    return Math.floor(Math.random() * 50 + 1);
  }

  getTargetNumber() {
    return this.targetNumber;
  }
}

export default Game;
