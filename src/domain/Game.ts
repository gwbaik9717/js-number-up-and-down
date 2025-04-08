import ErrorMessage from "../error";

export class Game {
  private _answer: number;
  private _history: number[] = [];
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
    this._answer = this.generateAnswer();
  }

  get answer() {
    return this._answer;
  }

  get history() {
    return [...this._history];
  }

  private generateAnswer() {
    return Math.floor(
      Math.random() * (this.maxAllowedNumber - this.minAllowedNumber + 1) +
        this.minAllowedNumber
    );
  }

  addToHistory(userInput: number) {
    if (this._history.length < this.maxRetries) {
      this._history.push(userInput);
      return;
    }

    throw new Error(ErrorMessage.game.EXCEED_MAX_RETRIES);
  }
}
