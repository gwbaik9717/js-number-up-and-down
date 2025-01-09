import { MAX_ALLOWED_NUMBER, MAX_RETRIES } from "../constants";
import ErrorMessage from "../error";
import Input from "./Input";
import Output from "./Output";

class Game {
  private answer: number;
  private history: number[] = [];

  constructor() {
    this.answer = this.generateAnswer();
  }

  async start() {
    while (this.history.length < MAX_RETRIES) {
      const userNumber = await Input.getUserNumber();
      this.addToHistory(userNumber);

      if (userNumber === this.answer) {
        Output.printSuccessMessage(this.history.length);
        return;
      }

      Output.printDiffMessage(this.answer, userNumber);
      Output.printHistory(this.history);
    }

    Output.printExceedRetriesCountMessgae(this.answer);
  }

  generateAnswer() {
    return Math.floor(Math.random() * MAX_ALLOWED_NUMBER + 1);
  }

  getAnswer() {
    return this.answer;
  }

  getDiffAnswer(toCompare: number) {
    return this.answer - toCompare;
  }

  addToHistory(userInput: number) {
    if (this.history.length < MAX_RETRIES) {
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
