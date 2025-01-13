import { $, createElement } from "../utils/dom";
import { Input } from "../domain/Input";
import ErrorMessage from "../error";
import { Game } from "../domain/Game";

export const SectionGameMain = {
  minNumberRange: 0,
  maxNumberRange: 0,
  maxRetries: 0,
  game: null as Game | null,
  restartGameCallback: null as (() => void) | null,

  elements: {
    get inputUserNumber() {
      return $<HTMLInputElement>("#user-number");
    },
    get btnConfirmUserNumber() {
      return $<HTMLButtonElement>("#confirm-user-number");
    },
    get wrapperLogList() {
      return $<HTMLDivElement>("#wrapper-log-list");
    },
    get logList() {
      return $<HTMLUListElement>("#log-list");
    },
    get btnRestart() {
      return $<HTMLButtonElement>("#restart-game");
    },
  },

  get generateComputerLogMessage() {
    return SectionGameMain.generateLogMessage("computer");
  },

  get generateUserLogMessage() {
    return SectionGameMain.generateLogMessage("user");
  },

  generateLogMessage: (author: "user" | "computer") => {
    return (message: string) => {
      return `[${author === "user" ? "유저" : "컴퓨터"}]: ${message}`;
    };
  },

  printGameRule: (
    minNumberRange: number | string,
    maxNumberRange: number | string
  ) => {
    const message = SectionGameMain.generateComputerLogMessage(
      `${minNumberRange}~${maxNumberRange} 사이의 숫자를 입력하세요.`
    );
    SectionGameMain.addLogItem(message);
  },

  printUserNumber: (userNumber: number | string) => {
    const message = SectionGameMain.generateUserLogMessage(`${userNumber}`);
    SectionGameMain.addLogItem(message);
  },

  printDiff: (userNumber: number, answer: number) => {
    const diff = userNumber - answer;
    const message = SectionGameMain.generateComputerLogMessage(
      `${diff > 0 ? "다운" : "업"}`
    );
    SectionGameMain.addLogItem(message);
  },

  printAvailableRetries: (maxRetries: number, currentRetries: number) => {
    const availabeRetries = maxRetries - currentRetries;
    const message = SectionGameMain.generateComputerLogMessage(
      `${availabeRetries}회 남았습니다.`
    );
    SectionGameMain.addLogItem(message);
  },

  printCorrectAnswer: (currentRetries: number) => {
    const message = SectionGameMain.generateComputerLogMessage(
      `축하합니다. ${currentRetries}회 만에 맞추셨네요.`
    );
    SectionGameMain.addLogItem(message);
  },

  printExceedMaxRetries: (maxRetries: number) => {
    const message = SectionGameMain.generateComputerLogMessage(
      `재시도 횟수 ${maxRetries}회를 초과하였습니다.`
    );
    SectionGameMain.addLogItem(message);
  },

  printFinishGame: () => {
    const message =
      SectionGameMain.generateComputerLogMessage(`게임을 종료합니다.`);
    SectionGameMain.addLogItem(message);
  },

  addLogItem: (text: string) => {
    const WrapperLogList = SectionGameMain.elements.wrapperLogList;
    const LogList = SectionGameMain.elements.logList;

    const logItem = createElement("li");
    logItem.setAttribute("class", "py-2 text-sm text-left font-light");
    logItem.textContent = text;

    if (WrapperLogList && LogList) {
      LogList.appendChild(logItem);

      // Scroll to bottom
      WrapperLogList.scrollTop = WrapperLogList.scrollHeight;
    }
  },

  getTemplate: () => {
    const wrapper = createElement("div");

    wrapper.innerHTML = `
        <div class="px-2">
            <div class="mt-6 flex items-center gap-4">
                <label for="user-number" class="flex-shrink-0 block text-md/6 font-medium text-gray-900 text-center">숫자 입력</label>
                <input type="number" id="user-number" class="disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:outline-gray-200 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="숫자를 입력하세요">    
                <button id="confirm-user-number" type="button" class="disabled:text-gray-500 disabled:opacity-30 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:pointer-events-none flex-shrink-0 rounded-md bg-indigo-50 px-6 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100">확인</button>
            </div>
            
            
            <span class="block text-lg/6 font-bold text-gray-900 text-center mt-8">진행 화면</label>

            <div id="wrapper-log-list" class="max-h-44 overflow-y-scroll mt-4">
                <ul id="log-list" role="list" class="divide-y divide-gray-200">
                </ul>
            </div>
          
        </div>
        <button id="restart-game" type="button" class="w-full mt-20 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">메인으로 돌아가기</button>
    `;

    return wrapper;
  },

  render: (
    minNumberRange: number,
    maxNumberRange: number,
    maxRetries: number
  ) => {
    SectionGameMain.minNumberRange = minNumberRange;
    SectionGameMain.maxNumberRange = maxNumberRange;
    SectionGameMain.maxRetries = maxRetries;
    SectionGameMain.game = new Game(minNumberRange, maxNumberRange, maxRetries);

    const app = $("#app");

    if (!app) {
      throw new Error();
    }

    app.innerHTML = "";
    const template = SectionGameMain.getTemplate();
    app.appendChild(template);
    SectionGameMain.attachEventListeners();
  },

  setRestartGameCallback: (callback: () => void) => {
    SectionGameMain.restartGameCallback = callback;
  },

  attachEventListeners: () => {
    SectionGameMain.elements.inputUserNumber?.addEventListener(
      "change",
      SectionGameMain.onChangeUserNumber
    );
    SectionGameMain.elements.btnConfirmUserNumber?.addEventListener(
      "click",
      SectionGameMain.onClickConfirmUserNumber
    );
    SectionGameMain.elements.btnRestart?.addEventListener(
      "click",
      SectionGameMain.onClickRestartGame
    );
  },

  detachEventListeners: () => {
    SectionGameMain.elements.inputUserNumber?.removeEventListener(
      "change",
      SectionGameMain.onChangeUserNumber
    );
    SectionGameMain.elements.btnConfirmUserNumber?.removeEventListener(
      "click",
      SectionGameMain.onClickConfirmUserNumber
    );
    SectionGameMain.elements.btnRestart?.removeEventListener(
      "click",
      SectionGameMain.onClickRestartGame
    );
  },

  onChangeUserNumber: (e: Event) => {
    const userNumber = (e.target as HTMLInputElement).value;

    try {
      Input.validateUserNumber(
        userNumber,
        SectionGameMain.minNumberRange,
        SectionGameMain.maxNumberRange
      );
    } catch (e) {
      SectionGameMain.handleError(e);
      if (SectionGameMain.elements.inputUserNumber) {
        SectionGameMain.elements.inputUserNumber.value = "";
      }
    }
  },

  onClickConfirmUserNumber: () => {
    if (!SectionGameMain.game) return;

    if (SectionGameMain.game.history.includes(SectionGameMain.game.answer)) {
      return;
    }

    if (SectionGameMain.game.history.length >= SectionGameMain.maxRetries) {
      return;
    }

    const userNumber = SectionGameMain.elements.inputUserNumber?.value;

    if (!userNumber) {
      alert(ErrorMessage.general.ENTER_NUMBER_FIRST);
      return;
    }

    if (SectionGameMain.elements.inputUserNumber) {
      SectionGameMain.elements.inputUserNumber.value = "";
    }

    SectionGameMain.printUserNumber(userNumber);
    SectionGameMain.game.addToHistory(Number(userNumber));

    if (Number(userNumber) === SectionGameMain.game.answer) {
      SectionGameMain.printCorrectAnswer(SectionGameMain.game.history.length);
    } else {
      if (SectionGameMain.game.history.length < SectionGameMain.maxRetries) {
        SectionGameMain.printDiff(
          Number(userNumber),
          SectionGameMain.game.answer
        );
        SectionGameMain.printAvailableRetries(
          SectionGameMain.maxRetries,
          SectionGameMain.game.history.length
        );
        return;
      }

      SectionGameMain.printExceedMaxRetries(SectionGameMain.maxRetries);
    }

    if (SectionGameMain.elements.btnConfirmUserNumber) {
      SectionGameMain.elements.btnConfirmUserNumber.disabled = true;
    }

    if (SectionGameMain.elements.inputUserNumber) {
      SectionGameMain.elements.inputUserNumber.disabled = true;
    }

    SectionGameMain.printFinishGame();
  },

  onClickRestartGame: () => {
    SectionGameMain.detachEventListeners();
    if (SectionGameMain.restartGameCallback) {
      SectionGameMain.restartGameCallback();
    }
  },

  handleError: (e: unknown) => {
    if (e instanceof Error) {
      alert(e.message);
    } else {
      alert(ErrorMessage.general.UNKNOWN_ERROR);
    }
  },
};
