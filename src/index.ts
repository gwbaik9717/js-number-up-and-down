import Game from "./domain/Game";
import Input from "./domain/Input";
import Output from "./domain/Output";

const main = async () => {
  while (true) {
    const [minAllowedNumber, maxAllowedNumber] =
      await Input.getUserAnswerRange();
    const maxRetries = await Input.getUserRetryCount();

    const game = new Game(minAllowedNumber, maxAllowedNumber, maxRetries);
    const answer = game.getAnswer();
    const history = game.getHistory();

    while (history.length < maxRetries) {
      const userNumber = await Input.getUserNumber(
        minAllowedNumber,
        maxAllowedNumber
      );
      game.addToHistory(userNumber);

      if (userNumber === answer) {
        Output.printSuccessMessage(history.length);
        return;
      }

      Output.printDiffMessage(answer, userNumber);
      Output.printHistory(history);
    }

    Output.printExceedRetriesCountMessgae(answer, maxRetries);

    const restartOption = await Input.getUserRestartOption();
    if (!restartOption) {
      break;
    }
  }
};

main();
