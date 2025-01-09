import { MAX_RETRIES } from "../constants";

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
