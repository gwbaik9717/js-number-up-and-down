import { Game } from "./domain/Game";
import { Input } from "./domain/Input";
import { SectionGameMain } from "./view/SectionGameMain";
import { SectionGameSettings } from "./view/SectionGameSettings";

const main = async () => {
  renderSettings();
};

const renderSettings = () => {
  SectionGameSettings.render();

  const onChangeMinNumberRange = (e: Event) => {
    const minNumberRange = (e.target as HTMLInputElement).value;
    const maxNumberRange = InputMaxNumberRange?.value ?? null;

    try {
      Input.validateUserAnswerRange(minNumberRange, maxNumberRange);
    } catch (e) {
      alert(e);

      if (InputMinNumberRange) {
        InputMinNumberRange.value = "";
      }
    }
  };

  const onChangeMaxNumberRange = (e: Event) => {
    const minNumberRange = InputMinNumberRange?.value ?? null;
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

  const onChangeRetryCount = (e: Event) => {
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

  const onClickStartGame = () => {
    const minNumberRange = InputMinNumberRange?.value;
    const maxNumberRange = InputMaxNumberRange?.value;
    const maxRetries = InputRetryCount?.value;

    if (!minNumberRange || !maxNumberRange || !maxRetries) {
      alert("모든 정보를 채워주세요");
      return;
    }

    detachEventListeners();

    renderMain(
      Number(minNumberRange),
      Number(maxNumberRange),
      Number(maxRetries)
    );
  };

  const attachEventListeners = () => {
    InputMinNumberRange?.addEventListener("change", onChangeMinNumberRange);
    InputMaxNumberRange?.addEventListener("change", onChangeMaxNumberRange);
    InputRetryCount?.addEventListener("change", onChangeRetryCount);
    BtnStartGame?.addEventListener("click", onClickStartGame);
  };

  const detachEventListeners = () => {
    InputMinNumberRange?.removeEventListener("change", onChangeMinNumberRange);
    InputMaxNumberRange?.removeEventListener("change", onChangeMaxNumberRange);
    InputRetryCount?.removeEventListener("change", onChangeRetryCount);
    BtnStartGame?.removeEventListener("click", onClickStartGame);
  };

  const InputMinNumberRange = SectionGameSettings.elements.inputMinNumberRange;
  const InputMaxNumberRange = SectionGameSettings.elements.inputMaxNumberRange;
  const InputRetryCount = SectionGameSettings.elements.inputMaxRetries;
  const BtnStartGame = SectionGameSettings.elements.btnStartGame;

  attachEventListeners();
};

const renderMain = (
  minNumberRange: number,
  maxNumberRange: number,
  maxRetries: number
) => {
  SectionGameMain.render();
  SectionGameMain.printGameRule(minNumberRange, maxNumberRange);

  const onChangeUserNumber = (e: Event) => {
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

  const onClickConfirmUserNumber = () => {
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
        SectionGameMain.printAvailableRetries(maxRetries, game.history.length);
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

  const onClickRestartGame = () => {
    detachEventListeners();
    main();
  };

  const attachEventListeners = () => {
    InputUserNumber?.addEventListener("change", onChangeUserNumber);
    BtnConfirmUserNumber?.addEventListener("click", onClickConfirmUserNumber);
    BtnRestart?.addEventListener("click", onClickRestartGame);
  };

  const detachEventListeners = () => {
    InputUserNumber?.removeEventListener("change", onChangeUserNumber);
    BtnConfirmUserNumber?.removeEventListener(
      "click",
      onClickConfirmUserNumber
    );
    BtnRestart?.removeEventListener("click", onClickRestartGame);
  };

  const InputUserNumber = SectionGameMain.elements.inputUserNumber;
  const BtnConfirmUserNumber = SectionGameMain.elements.btnConfirmUserNumber;
  const BtnRestart = SectionGameMain.elements.btnRestart;

  const game = new Game(minNumberRange, maxNumberRange, maxRetries);

  attachEventListeners();
};

main();
