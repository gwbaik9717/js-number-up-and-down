import Game from "./domain/Game";
import Input from "./domain/Input";

const main = async () => {
  while (true) {
    const [minAllowedNumber, maxAllowedNumber] =
      await Input.getUserAnswerRange();
    const maxRetries = await Input.getUserRetryCount();

    const game = new Game(minAllowedNumber, maxAllowedNumber, maxRetries);
    await game.start();

    const restartOption = await Input.getUserRestartOption();
    if (!restartOption) {
      break;
    }
  }
};

main();
