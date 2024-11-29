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
};

export default Output;
