import { cms } from "./cms";

export const packages = cms.packages;

export const additionalHourDkk = cms.packagesPage.additionalHourPrice;

export const includedInEveryPackage = cms.packagesPage.included;

export const bookingSteps = cms.packagesPage.steps;

export const questions = cms.packagesPage.questions;

export function formatDkk(amount: number) {
  return `${new Intl.NumberFormat("da-DK").format(amount)} kr.`;
}
