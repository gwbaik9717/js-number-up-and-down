class Game {
  private answer: number;

  constructor() {
    this.answer = this.generateAnswer();
  }

  generateAnswer() {
    return Math.floor(Math.random() * 50 + 1);
  }

  getAnswer() {
    return this.answer;
  }

  getDiffAnswer(toCompare: number) {
    return this.answer - toCompare;
  }
}

export default Game;
