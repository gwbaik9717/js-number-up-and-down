import { Game } from "./domain/Game";
import { Input } from "./domain/Input";
import { SectionGameMain } from "./view/SectionGameMain";
import { SectionGameSettings } from "./view/SectionGameSettings";

const main = async () => {
  SectionGameSettings.render();

  const InputMinNumberRange = SectionGameSettings.elements.inputMinNumberRange;
  InputMinNumberRange?.addEventListener("change", (e) => {
    const minNumberRange = (e.target as HTMLInputElement).value;
    const maxNumberRange =
      SectionGameSettings.elements.inputMaxNumberRange?.value ?? null;

    try {
      Input.validateUserAnswerRange(minNumberRange, maxNumberRange);
    } catch (e) {
      InputMinNumberRange.value = "";
      alert(e);
    }
  });

  const InputMaxNumberRange = SectionGameSettings.elements.inputMaxNumberRange;
  InputMaxNumberRange?.addEventListener("change", (e) => {
    const minNumberRange =
      SectionGameSettings.elements.inputMinNumberRange?.value ?? null;
    const maxNumberRange = (e.target as HTMLInputElement).value;

    try {
      Input.validateUserAnswerRange(minNumberRange, maxNumberRange);
    } catch (e) {
      alert(e);
      InputMaxNumberRange.value = "";
    }
  });

  const InputRetryCount = SectionGameSettings.elements.inputRetryCount;
  InputRetryCount?.addEventListener("change", (e) => {
    const retryCount = (e.target as HTMLInputElement).value;

    try {
      Input.validateUserRetryCount(retryCount);
    } catch (e) {
      alert(e);
      InputRetryCount.value = "";
    }
  });

  let game = null;

  SectionGameSettings.elements.btnStartGame?.addEventListener("click", () => {
    const minNumberRange = InputMaxNumberRange?.value;
    const maxNumberRange = InputMaxNumberRange?.value;
    const retryCount = InputRetryCount?.value;

    if (!minNumberRange || !maxNumberRange || !retryCount) {
      alert("모든 정보를 채워주세요");
      return;
    }

    SectionGameMain.render();

    game = new Game(
      Number(minNumberRange),
      Number(maxNumberRange),
      Number(retryCount)
    );
  });

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
