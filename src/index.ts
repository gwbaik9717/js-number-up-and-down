import { SectionGameMain } from "./view/SectionGameMain";
import { SectionGameSettings } from "./view/SectionGameSettings";

const main = async () => {
  renderSettings();
};

const renderSettings = () => {
  SectionGameSettings.render();
  SectionGameSettings.setStartGameCallback(renderMain);
};

const renderMain = (
  minNumberRange: number,
  maxNumberRange: number,
  maxRetries: number
) => {
  SectionGameMain.render(minNumberRange, maxNumberRange, maxRetries);
  SectionGameMain.printGameRule(minNumberRange, maxNumberRange);
  SectionGameMain.setRestartGameCallback(renderSettings);
};

main();
