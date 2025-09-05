export interface SimpletronState {
  memory: number[];
  accumulator: number;
  instructionCounter: number;
  instructionRegister: number;
  operationCode: number;
  operand: number;
  isRunning: boolean;
  isHalted: boolean;
}

export interface ExecutionResult {
  success: boolean;
  error?: string;
  output?: string;
  needsInput?: boolean;
  inputPrompt?: string;
}

export const OPCODES = {
  NOP: 0,
  READ: 10,
  WRITE: 11,
  LOAD: 20,
  STORE: 21,
  ADD: 30,
  SUBTRACT: 31,
  DIVIDE: 32,
  MULTIPLY: 33,
  BRANCH: 40,
  BRANCHNEG: 41,
  BRANCHZERO: 42,
  HALT: 43,
}
import { Language } from '../hooks/useLanguage';
import { translations } from '../i18n/translations';

export const getExamplePrograms = (language: Language) => {
  const t = translations[language];
  
  return {
    addition: [
      `00 ? +1007  // ${t.examples.addition.readA}`,
      `01 ? +1008  // ${t.examples.addition.readB}`, 
      `02 ? +2007  // ${t.examples.addition.loadA}`,
      `03 ? +3008  // ${t.examples.addition.addB}`,
      `04 ? +2109  // ${t.examples.addition.storeC}`,
      `05 ? +1109  // ${t.examples.addition.writeC}`,
      `06 ? +4300  // ${t.examples.addition.halt}`,
      `07 ? +0000  // ${t.examples.addition.varA}`,
      `08 ? +0000  // ${t.examples.addition.varB}`,
      `09 ? +0000  // ${t.examples.addition.resultC}`,
      `10 ? -99999`
    ],
    comparison: [
      `00 ? +1009  // ${t.examples.comparison.readA}`,
      `01 ? +1010  // ${t.examples.comparison.readB}`,
      `02 ? +2009  // ${t.examples.comparison.loadA}`, 
      `03 ? +3110  // ${t.examples.comparison.subB}`,
      `04 ? +4107  // ${t.examples.comparison.branchNeg}`,
      `05 ? +1109  // ${t.examples.comparison.writeA}`,
      `06 ? +4300  // ${t.examples.comparison.halt}`,
      `07 ? +1110  // ${t.examples.comparison.writeB}`,
      `08 ? +4300  // ${t.examples.comparison.halt}`, 
      `09 ? +0000  // ${t.examples.comparison.varA}`,
      `10 ? +0000  // ${t.examples.comparison.varB}`,
      `11 ? -99999`
};