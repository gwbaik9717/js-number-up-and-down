import { MAX_RETRIES } from "../constants";
import Input from "../Input";
import Output from "../Output";

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
    return Math.floor(Math.random() * 50 + 1);
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

    throw new Error(`최대 시도 횟수는 ${MAX_RETRIES}번 입니다.`);
  }

  getHistory() {
    return [...this.history];
  }
}

export default Game;
