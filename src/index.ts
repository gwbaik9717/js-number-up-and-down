import { Game } from "./domain/Game";
import { Input } from "./domain/Input";
import { SectionGameMain } from "./view/SectionGameMain";
import { SectionGameSettings } from "./view/SectionGameSettings";

const main = async () => {
  SectionGameSettings.render();

  const InputMinNumberRange = SectionGameSettings.elements.inputMinNumberRange;
  const onMinNumberRangeChange = (e: Event) => {
    const minNumberRange = (e.target as HTMLInputElement).value;
    const maxNumberRange =
      SectionGameSettings.elements.inputMaxNumberRange?.value ?? null;

    try {
      Input.validateUserAnswerRange(minNumberRange, maxNumberRange);
    } catch (e) {
      alert(e);

      if (InputMinNumberRange) {
        InputMinNumberRange.value = "";
      }
    }
  };
  InputMinNumberRange?.addEventListener("change", onMinNumberRangeChange);

  const InputMaxNumberRange = SectionGameSettings.elements.inputMaxNumberRange;
  const onMaxNumberRangeChange = (e: Event) => {
    const minNumberRange =
      SectionGameSettings.elements.inputMinNumberRange?.value ?? null;
    const maxNumberRange = (e.target as HTMLInputElement).value;

    try {
      Input.validateUserAnswerRange(minNumberRange, maxNumberRange);
    } catch (e) {
      alert(e);

      if (InputMaxNumberRange) {
        InputMaxNumberRange.value = "";
      }
    }
  };
  InputMaxNumberRange?.addEventListener("change", onMaxNumberRangeChange);

  const InputRetryCount = SectionGameSettings.elements.inputMaxRetries;
  const onRetryCountChange = (e: Event) => {
    const maxRetries = (e.target as HTMLInputElement).value;

    try {
      Input.validateUserRetryCount(maxRetries);
    } catch (e) {
      alert(e);

      if (InputRetryCount) {
        InputRetryCount.value = "";
      }
    }
  };
  InputRetryCount?.addEventListener("change", onRetryCountChange);

  const onStartGameClick = () => {
    const minNumberRange = InputMinNumberRange?.value;
    const maxNumberRange = InputMaxNumberRange?.value;
    const maxRetries = InputRetryCount?.value;

    if (!minNumberRange || !maxNumberRange || !maxRetries) {
      alert("모든 정보를 채워주세요");
      return;
    }

    startGame(
      Number(minNumberRange),
      Number(maxNumberRange),
      Number(maxRetries)
    );
  };
  SectionGameSettings.elements.btnStartGame?.addEventListener(
    "click",
    onStartGameClick
  );

  const startGame = (
    minNumberRange: number,
    maxNumberRange: number,
    maxRetries: number
  ) => {
    SectionGameMain.render();
    SectionGameMain.printGameRule(minNumberRange, maxNumberRange);

    const game = new Game(minNumberRange, maxNumberRange, maxRetries);

    const InputUserNumber = SectionGameMain.elements.inputUserNumber;
    const onUserNumberChange = (e: Event) => {
      const userNumber = (e.target as HTMLInputElement).value;

      try {
        Input.validateUserNumber(userNumber, minNumberRange, maxNumberRange);
      } catch (e) {
        alert(e);

        if (InputUserNumber) {
          InputUserNumber.value = "";
        }
      }
    };
    InputUserNumber?.addEventListener("change", onUserNumberChange);

    const BtnConfirmUserNumber = SectionGameMain.elements.btnConfirmUserNumber;
    const onConfirmUserNumberClick = () => {
      if (game.history.includes(game.answer)) {
        return;
      }

      if (game.history.length >= maxRetries) {
        return;
      }

      const userNumber = InputUserNumber?.value;

      if (!userNumber) {
        alert("숫자를 먼저 입력하세요.");
        return;
      }

      InputUserNumber.value = "";

      SectionGameMain.printUserNumber(userNumber);
      game.addToHistory(Number(userNumber));

      if (Number(userNumber) === game.answer) {
        SectionGameMain.printCorrectAnswer(game.history.length);
      } else {
        if (game.history.length < maxRetries) {
          SectionGameMain.printDiff(Number(userNumber), game.answer);
          SectionGameMain.printAvailableRetries(
            maxRetries,
            game.history.length
          );
          return;
        }

        SectionGameMain.printExceedMaxRetries(maxRetries);
      }

      if (BtnConfirmUserNumber) {
        BtnConfirmUserNumber.disabled = true;
      }

      InputUserNumber.disabled = true;
      SectionGameMain.printFinishGame();
    };
    BtnConfirmUserNumber?.addEventListener("click", onConfirmUserNumberClick);

    const BtnRestart = SectionGameMain.elements.btnRestart;
    const onConfirmRestartGame = () => {
      endGame();
      main();
    };
    BtnRestart?.addEventListener("click", onConfirmRestartGame);

    const endGame = () => {
      InputMinNumberRange?.removeEventListener(
        "change",
        onMinNumberRangeChange
      );
      InputMaxNumberRange?.removeEventListener(
        "change",
        onMaxNumberRangeChange
      );
      InputRetryCount?.removeEventListener("change", onRetryCountChange);
      SectionGameSettings.elements.btnStartGame?.removeEventListener(
        "click",
        onStartGameClick
      );
      InputUserNumber?.removeEventListener("change", onUserNumberChange);
      BtnConfirmUserNumber?.removeEventListener(
        "click",
        onConfirmUserNumberClick
      );
      BtnRestart?.removeEventListener("click", onConfirmRestartGame);
    };
  };
};

main();
