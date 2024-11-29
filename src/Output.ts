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

  showHistory: (history: number[]) => {
    const renderedHistory = history.join(", ");
    console.log(`이전 추측: ${renderedHistory}`);
  },
};

export default Output;
