export interface AdvancedSimpleTronState {
  memory: (number | string)[];
  accumulator: number;
  instructionCounter: number;
  instructionRegister: number | string;
  operationCode: number;
  operand: number;
  isRunning: boolean;
  isHalted: boolean;
  floatMode: boolean;
}

export interface AdvancedExecutionResult {
  success: boolean;
  error?: string;
  output?: string;
  needsInput?: boolean;
  inputPrompt?: string;
  inputType?: 'number' | 'string' | 'float';
}

export const ADVANCED_OPCODES = {
  NOP: 0,
  READ: 10,
  WRITE: 11,
  READ_STRING: 12,
  WRITE_STRING: 13,
  WRITE_NEWLINE: 14,
  LOAD: 20,
  STORE: 21,
  ADD: 30,
  SUBTRACT: 31,
  DIVIDE: 32,
  MULTIPLY: 33,
  MODULO: 34,
  POWER: 35,
  BRANCH: 40,
  BRANCHNEG: 41,
  BRANCHZERO: 42,
  HALT: 43,
  // Float operations
  LOAD_FLOAT: 50,
  STORE_FLOAT: 51,
  ADD_FLOAT: 52,
  SUBTRACT_FLOAT: 53,
  DIVIDE_FLOAT: 54,
  MULTIPLY_FLOAT: 55,
}

export const getAdvancedExamplePrograms = (language: 'zh' | 'en') => {
  return {
    stringDemo: language === 'zh' ? [
      `// 字符串处理演示程序`,
      `00 ? +1263  // 读取字符串到地址99`,
      `01 ? +1363  // 输出字符串`,
      `02 ? +1400  // 输出换行符`,
      `03 ? +4300  // 停止程序`,
      `99 ? +0000  // 字符串存储区`,
      `100 ? -99999`
    ] : [
      `// String processing demo program`,
      `00 ? +1263  // Read string to address 99`,
      `01 ? +1363  // Write string`,
      `02 ? +1400  // Write newline`,
      `03 ? +4300  // Halt program`,
      `99 ? +0000  // String storage area`,
      `100 ? -99999`
    ],
    
    floatMath: language === 'zh' ? [
      `// 浮点数运算演示`,
      `00 ? +1099  // 读取数A到地址99`,
      `01 ? +1098  // 读取数B到地址98`,
      `02 ? +5099  // 浮点加载A (使用浮点加载指令)`,
      `03 ? +5298  // 浮点加法 A + B`,
      `04 ? +5197  // 浮点存储结果到地址97`,
      `05 ? +1197  // 输出结果`,
      `06 ? +4300  // 停止`,
      `97 ? +0000  // 结果`,
      `98 ? +0000  // 变量B`,
      `99 ? +0000  // 变量A`,
      `100 ? -99999`
    ] : [
      `// Float arithmetic demo`,
      `00 ? +1099  // Read number A to address 99`,
      `01 ? +1098  // Read number B to address 98`,
      `02 ? +5099  // Float load A (use float load instruction)`,
      `03 ? +5298  // Float add A + B`,
      `04 ? +5197  // Float store result to address 97`,
      `05 ? +1197  // Write result`,
      `06 ? +4300  // Halt`,
      `97 ? +0000  // Result`,
      `98 ? +0000  // Variable B`,
      `99 ? +0000  // Variable A`,
      `100 ? -99999`
    ],

    powerMod: language === 'zh' ? [
      `// 求幂运算演示`,
      `00 ? +1099  // 读取底数`,
      `01 ? +1098  // 读取指数`,
      `02 ? +2099  // 加载底数`,
      `03 ? +3598  // 计算幂运算 (底数^指数)`,
      `04 ? +2197  // 存储幂运算结果`,
      `05 ? +1197  // 输出幂运算结果`,
      `06 ? +4300  // 停止程序`,
      `97 ? +0000  // 幂运算结果`,
      `98 ? +0000  // 指数`,
      `99 ? +0000  // 底数`,
      `100 ? -99999`
    ] : [
      `// Power operation demo`,
      `00 ? +1099  // Read base`,
      `01 ? +1098  // Read exponent`,
      `02 ? +2099  // Load base`,
      `03 ? +3598  // Calculate power (base^exponent)`,
      `04 ? +2197  // Store power result`,
      `05 ? +1197  // Write power result`,
      `06 ? +4300  // Halt program`,
      `97 ? +0000  // Power result`,
      `98 ? +0000  // Exponent`,
      `99 ? +0000  // Base`,
      `100 ? -99999`
    ],

    modulo: language === 'zh' ? [
      `// 求余运算演示`,
      `00 ? +1099  // 读取被除数`,
      `01 ? +1098  // 读取除数`,
      `02 ? +2099  // 加载被除数`,
      `03 ? +3498  // 求余运算 (被除数 % 除数)`,
      `04 ? +2197  // 存储余数`,
      `05 ? +1197  // 输出余数`,
      `06 ? +4300  // 停止程序`,
      `97 ? +0000  // 余数结果`,
      `98 ? +0000  // 除数`,
      `99 ? +0000  // 被除数`,
      `100 ? -99999`
    ] : [
      `// Modulo operation demo`,
      `00 ? +1099  // Read dividend`,
      `01 ? +1098  // Read divisor`,
      `02 ? +2099  // Load dividend`,
      `03 ? +3498  // Modulo operation (dividend % divisor)`,
      `04 ? +2197  // Store remainder`,
      `05 ? +1197  // Write remainder`,
      `06 ? +4300  // Halt program`,
      `97 ? +0000  // Remainder result`,
      `98 ? +0000  // Divisor`,
      `99 ? +0000  // Dividend`,
      `100 ? -99999`
    ]
  };
};