class Game {
  private answer: number;
  private history: number[] = [];

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

  addToHistory(userInput: number) {
    this.history.push(userInput);
  }

  getHistory() {
    return [...this.history];
  }
}

export default Game;
