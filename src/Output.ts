import { MAX_RETRIES } from "./constants";

const Output = {
  printDiffMessage: (answer: number, userInput: number) => {
    const diff = answer - userInput;

    if (diff > 0) {
      console.log("업");
    } else if (diff < 0) {
      console.log("다운");
    } else {
      console.log("정답!");
    }
  },

  printHistory: (history: number[]) => {
    const renderedHistory = history.join(", ");
    console.log(`이전 추측: ${renderedHistory}`);
    console.log();
  },

  printSuccessMessage: (count: number) => {
    console.log(`정답!`);
    console.log(`축하합니다! ${count}번 만에 숫자를 맞추셨습니다.`);
  },

  printExceedRetriesCountMessgae: (answer: number) => {
    console.log(
      `${MAX_RETRIES}회 초과! 숫자를 맞추지 못했습니다. (정답: ${answer})`
    );
  },
};

export default Output;
