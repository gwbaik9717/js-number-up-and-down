const Output = {
  printDiffMessage: (diff: number) => {
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
  },

  printSuccessMessage: (count: number) => {
    console.log(`정답!`);
    console.log(`축하합니다! ${count}번 만에 숫자를 맞추셨습니다.`);
  },
};

export default Output;
