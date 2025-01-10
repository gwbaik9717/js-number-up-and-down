import ErrorMessage from "../error";
import Input from "./Input";
import Output from "./Output";

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

  async start() {
    while (this.history.length < this.maxRetries) {
      const userNumber = await Input.getUserNumber(
        this.minAllowedNumber,
        this.maxAllowedNumber
      );
      this.addToHistory(userNumber);

      if (userNumber === this.answer) {
        Output.printSuccessMessage(this.history.length);
        return;
      }

      Output.printDiffMessage(this.answer, userNumber);
      Output.printHistory(this.history);
    }

    Output.printExceedRetriesCountMessgae(this.answer, this.maxRetries);
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

  getDiffAnswer(toCompare: number) {
    return this.answer - toCompare;
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
