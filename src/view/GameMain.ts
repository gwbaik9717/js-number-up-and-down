import { $, createElement } from "../utils/dom";

export const GameMain = {
  getTemplate: () => {
    const wrapper = createElement("div");

    wrapper.innerHTML = `
        <div class="px-2">
          
            
            <div class="mt-6 flex items-center gap-4">
                <label for="guess-number" class="flex-shrink-0 block text-md/6 font-medium text-gray-900 text-center">숫자 입력</label>
                <input in="0" type="number" id="guess-number" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="숫자를 입력하세요">    
                <button type="button" class="flex-shrink-0 rounded-md bg-indigo-50 px-6 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100">확인</button>
            </div>
            
            
            <span class="block text-lg/6 font-bold text-gray-900 text-center mt-8">진행 화면</label>

            <div class="max-h-44 overflow-y-scroll mt-4">
                <ul role="list" class="divide-y divide-gray-200">
                   
                       <li class="py-2 text-sm text-left font-light">
                        안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요 안녕하세요안녕하세요안녕하세요안녕하세요 안녕하세요안녕하세요안녕하세요
                        안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요 안녕하세요안녕하세요안녕하세요안녕하세요 안녕하세요안녕하세요안녕하세요
                        안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요 안녕하세요안녕하세요안녕하세요안녕하세요 안녕하세요안녕하세요안녕하세요
                    </li>
                       <li class="py-2 text-sm text-left font-light">
                        안녕하세요
                    </li>
                       <li class="py-2 text-sm text-left font-light">
                        안녕하세요
                    </li>
                       <li class="py-2 text-sm text-left font-light">
                        안녕하세요
                    </li>
                       <li class="py-2 text-sm text-left font-light">
                        안녕하세요
                    </li>
                       <li class="py-2 text-sm text-left font-light">
                        안녕하세요
                    </li>
                </ul>
            </div>
          
        </div>
        <button type="button" class="w-full mt-20 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">메인으로 돌아가기</button>
    `;

    return wrapper;
  },

  render: () => {
    const app = $("#app");

    if (!app) {
      throw new Error();
    }

    app.innerHTML = "";
    const template = GameMain.getTemplate();
    app.appendChild(template);
  },
};
