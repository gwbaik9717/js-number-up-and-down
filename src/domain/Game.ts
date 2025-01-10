import ErrorMessage from "../error";

class Game {
  private answer: number;
  private history: number[] = [];
  private maxRetries: number;
  private minAllowedNumber: number;
  private maxAllowedNumber: number;

  constructor(
    minAllowedNumber: number,
    maxAllowedNumber: number,
    maxRetries: number
  ) {
    this.minAllowedNumber = minAllowedNumber;
    this.maxAllowedNumber = maxAllowedNumber;
    this.maxRetries = maxRetries;
    this.answer = this.generateAnswer();
  }

  generateAnswer() {
    return Math.floor(
      Math.random() * (this.maxAllowedNumber - this.minAllowedNumber + 1) +
        this.minAllowedNumber
    );
  }

  getAnswer() {
    return this.answer;
  }

  addToHistory(userInput: number) {
    if (this.history.length < this.maxRetries) {
      this.history.push(userInput);
      return;
    }

    throw new Error(ErrorMessage.game.EXCEED_MAX_RETRIES);
  }

  getHistory() {
    return [...this.history];
  }
}

export default Game;
