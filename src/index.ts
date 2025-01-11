import Game from "./domain/Game";
import Input from "./Input";
import Output from "./Output";
import { $ } from "./utils/dom";
import { GameSettings } from "./view/GameSettings";

const main = async () => {
  GameSettings.render();

  // while (true) {
  //   const [minAllowedNumber, maxAllowedNumber] =
  //     await Input.getUserAnswerRange();
  //   const maxRetries = await Input.getUserRetryCount();
  //   const game = new Game(minAllowedNumber, maxAllowedNumber, maxRetries);
  //   const answer = game.getAnswer();
  //   const history = game.getHistory();
  //   while (history.length < maxRetries) {
  //     const userNumber = await Input.getUserNumber(
  //       minAllowedNumber,
  //       maxAllowedNumber
  //     );
  //     game.addToHistory(userNumber);
  //     if (userNumber === answer) {
  //       Output.printSuccessMessage(history.length);
  //       return;
  //     }
  //     Output.printDiffMessage(answer, userNumber);
  //     Output.printHistory(history);
  //   }
  //   Output.printExceedRetriesCountMessgae(answer, maxRetries);
  //   const restartOption = await Input.getUserRestartOption();
  //   if (!restartOption) {
  //     break;
  //   }
  // }
};

main();
