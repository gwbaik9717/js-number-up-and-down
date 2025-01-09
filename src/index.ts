import Game from "./domain/Game";
import Input from "./domain/Input";

const main = async () => {
  while (true) {
    const game = new Game();

    await game.start();

    const retryOption = await Input.getUserRetryOption();
    if (!retryOption) {
      break;
    }
  }
};

main();
