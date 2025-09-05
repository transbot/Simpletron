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
      `+1007  // ${t.examples.addition.readA}`,
      `+1008  // ${t.examples.addition.readB}`, 
      `+2007  // ${t.examples.addition.loadA}`,
      `+3008  // ${t.examples.addition.addB}`,
      `+2109  // ${t.examples.addition.storeC}`,
      `+1109  // ${t.examples.addition.writeC}`,
      `+4300  // ${t.examples.addition.halt}`,
      `+0000  // ${t.examples.addition.varA}`,
      `+0000  // ${t.examples.addition.varB}`,
      `+0000  // ${t.examples.addition.resultC}`,
      "-99999"
    ],
    comparison: [
      `+1009  // ${t.examples.comparison.readA}`,
      `+1010  // ${t.examples.comparison.readB}`,
      `+2009  // ${t.examples.comparison.loadA}`, 
      `+3110  // ${t.examples.comparison.subB}`,
      `+4107  // ${t.examples.comparison.branchNeg}`,
      `+1109  // ${t.examples.comparison.writeA}`,
      `+4300  // ${t.examples.comparison.halt}`,
      `+1110  // ${t.examples.comparison.writeB}`,
      `+4300  // ${t.examples.comparison.halt}`, 
      `+0000  // ${t.examples.comparison.varA}`,
      `+0000  // ${t.examples.comparison.varB}`,
      "-99999"
    ],
    findMax: [
      `+1050  // ${t.examples.findMax.readCount}`,
      `+2050  // ${t.examples.findMax.loadCount}`,
      `+4220  // ${t.examples.findMax.branchIfZero}`,
      `+3053  // ${t.examples.findMax.subtract1}`,
      `+2151  // ${t.examples.findMax.storeRemainingCount}`,
      `+1052  // ${t.examples.findMax.readFirst}`,
      `+2052  // ${t.examples.findMax.loadFirst}`,
      `+2154  // ${t.examples.findMax.storeMax}`,
      `+2051  // ${t.examples.findMax.loadRemainingCount}`,
      `+4220  // ${t.examples.findMax.branchIfDone}`,
      `+3053  // ${t.examples.findMax.subtract1Again}`,
      `+2151  // ${t.examples.findMax.storeNewCount}`,
      `+1052  // ${t.examples.findMax.readNext}`,
      `+2054  // ${t.examples.findMax.loadCurrentMax}`,
      `+3152  // ${t.examples.findMax.subNewNumber}`,
      `+4118  // ${t.examples.findMax.branchIfNewLarger}`,
      `+4008  // ${t.examples.findMax.jumpToLoop}`,
      `+2052  // ${t.examples.findMax.loadNewNumber}`,
      `+2154  // ${t.examples.findMax.updateMax}`,
      `+4008  // ${t.examples.findMax.jumpBackToLoop}`,
      `+1154  // ${t.examples.findMax.writeMax}`,
      `+4300  // ${t.examples.findMax.halt}`,
      `+0000  // ${t.examples.findMax.inputCount}`,
      `+0000  // ${t.examples.findMax.remainingCount}`,
      `+0000  // ${t.examples.findMax.currentNumber}`,
      `+0001  // ${t.examples.findMax.constant1}`,
      `+0000  // ${t.examples.findMax.maxValue}`,
      `+0000  // ${t.examples.findMax.maxValue}`,
      `+0001  // ${t.examples.findMax.constant1}`,
      "-99999"
    ]
  };
};