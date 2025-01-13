// src/utils/dom.ts
var $ = (selector, parent = document) => parent.querySelector(selector);
var createElement = (tagName) => {
  const element = document.createElement(tagName);
  return element;
};

// src/error.ts
var ErrorMessage = {
  input: {
    WRONG_INPUT_TYPE: "\uC22B\uC790\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694.",
    WRONG_INPUT_RANGE: `\uC22B\uC790\uC758 \uBC94\uC704\uB97C \uB2E4\uC2DC \uD655\uC778\uD574\uC8FC\uC138\uC694.`,
    WRONG_RETRY_OPTION: "yes \uB610\uB294 no \uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694.",
    WRONG_ANSWER_RANGE_EMPTY: "\uCD5C\uC18C \uAC12\uACFC \uCD5C\uB300 \uAC12\uC744 \uBAA8\uB450 \uC785\uB825\uD574\uC8FC\uC138\uC694.",
    WRONG_ANSWER_RANGE_NAN: "\uCD5C\uC18C \uAC12\uACFC \uCD5C\uB300 \uAC12\uC740 \uC22B\uC790\uC5EC\uC57C \uD569\uB2C8\uB2E4.",
    WRONG_ANSWER_RANGE_MIN_GREATER: "\uCD5C\uC18C \uAC12\uC740 \uCD5C\uB300 \uAC12\uBCF4\uB2E4 \uC791\uC544\uC57C \uD569\uB2C8\uB2E4.",
    WRONG_RETRY_COUNT: "\uC9C4\uD589 \uAC00\uB2A5 \uD69F\uC218\uB294 1 \uC774\uC0C1\uC758 \uC22B\uC790\uC5EC\uC57C \uD569\uB2C8\uB2E4."
  },
  game: {
    EXCEED_MAX_RETRIES: `\uCD5C\uB300 \uC2DC\uB3C4 \uD69F\uC218\uB97C \uCD08\uACFC\uD558\uC600\uC2B5\uB2C8\uB2E4.`
  },
  general: {
    UNKNOWN_ERROR: "\uC54C \uC218 \uC5C6\uB294 \uC5D0\uB7EC\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4.",
    FILL_ALL_FIELDS: "\uBAA8\uB4E0 \uC815\uBCF4\uB97C \uCC44\uC6CC\uC8FC\uC138\uC694.",
    ENTER_NUMBER_FIRST: "\uC22B\uC790\uB97C \uBA3C\uC800 \uC785\uB825\uD558\uC138\uC694."
  }
};
var error_default = ErrorMessage;

// src/domain/Input.ts
var Input = {
  validateUserNumber: (userInput, minAllowedNumber, maxAllowedNumber) => {
    const numerifiedUserInput = Number(userInput);
    if (isNaN(numerifiedUserInput)) {
      throw new Error(error_default.input.WRONG_INPUT_TYPE);
    }
    if (numerifiedUserInput < minAllowedNumber || numerifiedUserInput > maxAllowedNumber) {
      throw new Error(error_default.input.WRONG_INPUT_RANGE);
    }
  },
  validateUserAnswerRange: (minAnswerRange, maxAnswerRange) => {
    if (minAnswerRange === "" || maxAnswerRange === "" || minAnswerRange === null || maxAnswerRange === null) {
      return;
    }
    if (isNaN(Number(minAnswerRange)) || isNaN(Number(maxAnswerRange))) {
      throw new Error(error_default.input.WRONG_ANSWER_RANGE_NAN);
    }
    if (Number(minAnswerRange) > Number(maxAnswerRange)) {
      throw new Error(error_default.input.WRONG_ANSWER_RANGE_MIN_GREATER);
    }
  },
  validateUserRetryCount: (userInput) => {
    if (userInput === "") {
      return;
    }
    if (isNaN(Number(userInput))) {
      throw new Error(error_default.input.WRONG_RETRY_COUNT);
    }
    if (Number(userInput) <= 0) {
      throw new Error(error_default.input.WRONG_RETRY_COUNT);
    }
  }
};

// src/domain/Game.ts
var Game = class {
  constructor(minAllowedNumber, maxAllowedNumber, maxRetries) {
    this._history = [];
    this.minAllowedNumber = minAllowedNumber;
    this.maxAllowedNumber = maxAllowedNumber;
    this.maxRetries = maxRetries;
    this._answer = this.generateAnswer();
  }
  get answer() {
    return this._answer;
  }
  get history() {
    return [...this._history];
  }
  generateAnswer() {
    return Math.floor(
      Math.random() * (this.maxAllowedNumber - this.minAllowedNumber + 1) + this.minAllowedNumber
    );
  }
  addToHistory(userInput) {
    if (this._history.length < this.maxRetries) {
      this._history.push(userInput);
      return;
    }
    throw new Error(error_default.game.EXCEED_MAX_RETRIES);
  }
};

// src/view/SectionGameMain.ts
var SectionGameMain = {
  minNumberRange: 0,
  maxNumberRange: 0,
  maxRetries: 0,
  game: null,
  restartGameCallback: null,
  elements: {
    get inputUserNumber() {
      return $("#user-number");
    },
    get btnConfirmUserNumber() {
      return $("#confirm-user-number");
    },
    get wrapperLogList() {
      return $("#wrapper-log-list");
    },
    get logList() {
      return $("#log-list");
    },
    get btnRestart() {
      return $("#restart-game");
    }
  },
  get generateComputerLogMessage() {
    return SectionGameMain.generateLogMessage("computer");
  },
  get generateUserLogMessage() {
    return SectionGameMain.generateLogMessage("user");
  },
  generateLogMessage: (author) => {
    return (message) => {
      return `[${author === "user" ? "\uC720\uC800" : "\uCEF4\uD4E8\uD130"}]: ${message}`;
    };
  },
  printGameRule: (minNumberRange, maxNumberRange) => {
    const message = SectionGameMain.generateComputerLogMessage(
      `${minNumberRange}~${maxNumberRange} \uC0AC\uC774\uC758 \uC22B\uC790\uB97C \uC785\uB825\uD558\uC138\uC694.`
    );
    SectionGameMain.addLogItem(message);
  },
  printUserNumber: (userNumber) => {
    const message = SectionGameMain.generateUserLogMessage(`${userNumber}`);
    SectionGameMain.addLogItem(message);
  },
  printDiff: (userNumber, answer) => {
    const diff = userNumber - answer;
    const message = SectionGameMain.generateComputerLogMessage(
      `${diff > 0 ? "\uB2E4\uC6B4" : "\uC5C5"}`
    );
    SectionGameMain.addLogItem(message);
  },
  printAvailableRetries: (maxRetries, currentRetries) => {
    const availabeRetries = maxRetries - currentRetries;
    const message = SectionGameMain.generateComputerLogMessage(
      `${availabeRetries}\uD68C \uB0A8\uC558\uC2B5\uB2C8\uB2E4.`
    );
    SectionGameMain.addLogItem(message);
  },
  printCorrectAnswer: (currentRetries) => {
    const message = SectionGameMain.generateComputerLogMessage(
      `\uCD95\uD558\uD569\uB2C8\uB2E4. ${currentRetries}\uD68C \uB9CC\uC5D0 \uB9DE\uCD94\uC168\uB124\uC694.`
    );
    SectionGameMain.addLogItem(message);
  },
  printExceedMaxRetries: (maxRetries) => {
    const message = SectionGameMain.generateComputerLogMessage(
      `\uC7AC\uC2DC\uB3C4 \uD69F\uC218 ${maxRetries}\uD68C\uB97C \uCD08\uACFC\uD558\uC600\uC2B5\uB2C8\uB2E4.`
    );
    SectionGameMain.addLogItem(message);
  },
  printFinishGame: () => {
    const message = SectionGameMain.generateComputerLogMessage(`\uAC8C\uC784\uC744 \uC885\uB8CC\uD569\uB2C8\uB2E4.`);
    SectionGameMain.addLogItem(message);
  },
  addLogItem: (text) => {
    const WrapperLogList = SectionGameMain.elements.wrapperLogList;
    const LogList = SectionGameMain.elements.logList;
    const logItem = createElement("li");
    logItem.setAttribute("class", "py-2 text-sm text-left font-light");
    logItem.textContent = text;
    if (WrapperLogList && LogList) {
      LogList.appendChild(logItem);
      WrapperLogList.scrollTop = WrapperLogList.scrollHeight;
    }
  },
  getTemplate: () => {
    const wrapper = createElement("div");
    wrapper.innerHTML = `
        <div class="px-2">
            <div class="mt-6 flex items-center gap-4">
                <label for="user-number" class="flex-shrink-0 block text-md/6 font-medium text-gray-900 text-center">\uC22B\uC790 \uC785\uB825</label>
                <input type="number" id="user-number" class="disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:outline-gray-200 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="\uC22B\uC790\uB97C \uC785\uB825\uD558\uC138\uC694">    
                <button id="confirm-user-number" type="button" class="disabled:text-gray-500 disabled:opacity-30 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:pointer-events-none flex-shrink-0 rounded-md bg-indigo-50 px-6 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100">\uD655\uC778</button>
            </div>
            
            
            <span class="block text-lg/6 font-bold text-gray-900 text-center mt-8">\uC9C4\uD589 \uD654\uBA74</label>

            <div id="wrapper-log-list" class="max-h-44 overflow-y-scroll mt-4">
                <ul id="log-list" role="list" class="divide-y divide-gray-200">
                </ul>
            </div>
          
        </div>
        <button id="restart-game" type="button" class="w-full mt-20 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">\uBA54\uC778\uC73C\uB85C \uB3CC\uC544\uAC00\uAE30</button>
    `;
    return wrapper;
  },
  render: (minNumberRange, maxNumberRange, maxRetries) => {
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
  setRestartGameCallback: (callback) => {
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
  onChangeUserNumber: (e) => {
    const userNumber = e.target.value;
    try {
      Input.validateUserNumber(
        userNumber,
        SectionGameMain.minNumberRange,
        SectionGameMain.maxNumberRange
      );
    } catch (e2) {
      SectionGameMain.handleError(e2);
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
      alert(error_default.general.ENTER_NUMBER_FIRST);
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
  handleError: (e) => {
    if (e instanceof Error) {
      alert(e.message);
    } else {
      alert(error_default.general.UNKNOWN_ERROR);
    }
  }
};

// src/view/SectionGameSettings.ts
var SectionGameSettings = {
  startGameCallback: null,
  elements: {
    get inputMinNumberRange() {
      return $("#min-number-range");
    },
    get inputMaxNumberRange() {
      return $("#max-number-range");
    },
    get inputMaxRetries() {
      return $("#max-retries");
    },
    get btnStartGame() {
      return $("#start-game");
    }
  },
  getTemplate: () => {
    const wrapper = createElement("div");
    wrapper.innerHTML = `
        <div class="px-2">
            <h2 class="text-xl font-bold text-center">
                \uAC8C\uC784 \uC124\uC815
            </h2>
            <div class="mt-6">
                <label for="min-number-range" class="block text-md/6 font-medium text-gray-900 text-center">\uC22B\uC790 \uBC94\uC704</label>
                <div class="flex items-center gap-x-2 mt-2">
                    <input min="0" type="number" id="min-number-range" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="\uCD5C\uC18C">
                    <input min="0" type="number" id="max-number-range" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="\uCD5C\uB300">
                </div>
            </div>

            <div class="mt-6">
                <label for="max-retries" class="block text-md/6 font-medium text-gray-900 text-center">\uC9C4\uD589 \uAC00\uB2A5 \uD69F\uC218</label>
                <input min="1" type="number" id="max-retries" class="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="\uC9C4\uD589 \uAC00\uB2A5 \uD69F\uC218">
            </div>
        </div>
        <button id="start-game" type="button" class="w-full mt-20 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">\uC2DC\uC791\uD558\uAE30</button>
    `;
    return wrapper;
  },
  render: () => {
    const app = $("#app");
    if (!app) {
      throw new Error();
    }
    app.innerHTML = "";
    const template = SectionGameSettings.getTemplate();
    app.appendChild(template);
    SectionGameSettings.attachEventListeners();
  },
  setStartGameCallback: (callback) => {
    SectionGameSettings.startGameCallback = callback;
  },
  attachEventListeners: () => {
    SectionGameSettings.elements.inputMinNumberRange?.addEventListener(
      "change",
      SectionGameSettings.onChangeMinNumberRange
    );
    SectionGameSettings.elements.inputMaxNumberRange?.addEventListener(
      "change",
      SectionGameSettings.onChangeMaxNumberRange
    );
    SectionGameSettings.elements.inputMaxRetries?.addEventListener(
      "change",
      SectionGameSettings.onChangeRetryCount
    );
    SectionGameSettings.elements.btnStartGame?.addEventListener(
      "click",
      SectionGameSettings.onClickStartGame
    );
  },
  detachEventListeners: () => {
    SectionGameSettings.elements.inputMinNumberRange?.removeEventListener(
      "change",
      SectionGameSettings.onChangeMinNumberRange
    );
    SectionGameSettings.elements.inputMaxNumberRange?.removeEventListener(
      "change",
      SectionGameSettings.onChangeMaxNumberRange
    );
    SectionGameSettings.elements.inputMaxRetries?.removeEventListener(
      "change",
      SectionGameSettings.onChangeRetryCount
    );
    SectionGameSettings.elements.btnStartGame?.removeEventListener(
      "click",
      SectionGameSettings.onClickStartGame
    );
  },
  onChangeMinNumberRange: (e) => {
    const minNumberRange = e.target.value;
    const maxNumberRange = SectionGameSettings.elements.inputMaxNumberRange?.value ?? null;
    try {
      Input.validateUserAnswerRange(minNumberRange, maxNumberRange);
    } catch (e2) {
      SectionGameSettings.handleError(e2);
      if (SectionGameSettings.elements.inputMinNumberRange) {
        SectionGameSettings.elements.inputMinNumberRange.value = "";
      }
    }
  },
  onChangeMaxNumberRange: (e) => {
    const minNumberRange = SectionGameSettings.elements.inputMinNumberRange?.value ?? null;
    const maxNumberRange = e.target.value;
    try {
      Input.validateUserAnswerRange(minNumberRange, maxNumberRange);
    } catch (e2) {
      SectionGameSettings.handleError(e2);
      if (SectionGameSettings.elements.inputMaxNumberRange) {
        SectionGameSettings.elements.inputMaxNumberRange.value = "";
      }
    }
  },
  onChangeRetryCount: (e) => {
    const maxRetries = e.target.value;
    try {
      Input.validateUserRetryCount(maxRetries);
    } catch (e2) {
      SectionGameSettings.handleError(e2);
      if (SectionGameSettings.elements.inputMaxRetries) {
        SectionGameSettings.elements.inputMaxRetries.value = "";
      }
    }
  },
  onClickStartGame: () => {
    const minNumberRange = SectionGameSettings.elements.inputMinNumberRange?.value;
    const maxNumberRange = SectionGameSettings.elements.inputMaxNumberRange?.value;
    const maxRetries = SectionGameSettings.elements.inputMaxRetries?.value;
    if (!minNumberRange || !maxNumberRange || !maxRetries) {
      alert(error_default.general.FILL_ALL_FIELDS);
      return;
    }
    SectionGameSettings.detachEventListeners();
    if (SectionGameSettings.startGameCallback) {
      SectionGameSettings.startGameCallback(
        Number(minNumberRange),
        Number(maxNumberRange),
        Number(maxRetries)
      );
    }
  },
  handleError: (e) => {
    if (e instanceof Error) {
      alert(e.message);
    } else {
      alert(error_default.general.UNKNOWN_ERROR);
    }
  }
};

// src/index.ts
var main = async () => {
  renderSettings();
};
var renderSettings = () => {
  SectionGameSettings.render();
  SectionGameSettings.setStartGameCallback(renderMain);
};
var renderMain = (minNumberRange, maxNumberRange, maxRetries) => {
  SectionGameMain.render(minNumberRange, maxNumberRange, maxRetries);
  SectionGameMain.printGameRule(minNumberRange, maxNumberRange);
  SectionGameMain.setRestartGameCallback(renderSettings);
};
main();
