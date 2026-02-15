import { allure } from 'allure-playwright';

export const AllureHelper = {
  feature: (name: string) => allure.feature(name),
  story: (name: string) => allure.story(name),
  severity: (level: string) => allure.severity(level),
  step: async (name: string, body: () => Promise<void>) =>
    await allure.step(name, body),
};
