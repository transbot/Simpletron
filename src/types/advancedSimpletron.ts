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
      `00 ? 0x0C63  // 读取字符串到地址99`,
      `01 ? 0x0D63  // 输出字符串`,
      `02 ? 0x0E00  // 输出换行符`,
      `03 ? 0x2B00  // 停止程序`,
      `99 ? 0x0000  // 字符串存储区`,
      `100 ? -99999`
    ] : [
      `// String processing demo program`,
      `00 ? 0x0C63  // Read string to address 99`,
      `01 ? 0x0D63  // Write string`,
      `02 ? 0x0E00  // Write newline`,
      `03 ? 0x2B00  // Halt program`,
      `99 ? 0x0000  // String storage area`,
      `100 ? -99999`
    ],
    
    floatMath: language === 'zh' ? [
      `// 浮点数运算演示`,
      `00 ? 0x3263  // 读取浮点数A到地址99`,
      `01 ? 0x3264  // 读取浮点数B到地址100`,
      `02 ? 0x3263  // 加载A`,
      `03 ? 0x3464  // A + B`,
      `04 ? 0x3365  // 存储结果到地址101`,
      `05 ? 0x0B65  // 输出结果`,
      `06 ? 0x2B00  // 停止`,
      `99 ? 0x0000  // 变量A`,
      `100 ? 0x0000 // 变量B`,
      `101 ? 0x0000 // 结果`,
      `102 ? -99999`
    ] : [
      `// Float arithmetic demo`,
      `00 ? 0x3263  // Read float A to address 99`,
      `01 ? 0x3264  // Read float B to address 100`,
      `02 ? 0x3263  // Load A`,
      `03 ? 0x3464  // A + B`,
      `04 ? 0x3365  // Store result to address 101`,
      `05 ? 0x0B65  // Write result`,
      `06 ? 0x2B00  // Halt`,
      `99 ? 0x0000  // Variable A`,
      `100 ? 0x0000 // Variable B`,
      `101 ? 0x0000 // Result`,
      `102 ? -99999`
    ],

    powerMod: language === 'zh' ? [
      `// 求幂和求余运算演示`,
      `00 ? 0x0A63  // 读取底数`,
      `01 ? 0x0A64  // 读取指数`,
      `02 ? 0x1463  // 加载底数`,
      `03 ? 0x2364  // 计算幂运算`,
      `04 ? 0x1565  // 存储结果`,
      `05 ? 0x0B65  // 输出幂运算结果`,
      `06 ? 0x0A66  // 读取除数`,
      `07 ? 0x1465  // 加载幂运算结果`,
      `08 ? 0x2266  // 求余运算`,
      `09 ? 0x1567  // 存储余数`,
      `10 ? 0x0B67  // 输出余数`,
      `11 ? 0x2B00  // 停止`,
      `99 ? 0x0000  // 底数`,
      `100 ? 0x0000 // 指数`,
      `101 ? 0x0000 // 幂运算结果`,
      `102 ? 0x0000 // 除数`,
      `103 ? 0x0000 // 余数`,
      `104 ? -99999`
    ] : [
      `// Power and modulo operations demo`,
      `00 ? 0x0A63  // Read base`,
      `01 ? 0x0A64  // Read exponent`,
      `02 ? 0x1463  // Load base`,
      `03 ? 0x2364  // Calculate power`,
      `04 ? 0x1565  // Store result`,
      `05 ? 0x0B65  // Write power result`,
      `06 ? 0x0A66  // Read divisor`,
      `07 ? 0x1465  // Load power result`,
      `08 ? 0x2266  // Modulo operation`,
      `09 ? 0x1567  // Store remainder`,
      `10 ? 0x0B67  // Write remainder`,
      `11 ? 0x2B00  // Halt`,
      `99 ? 0x0000  // Base`,
      `100 ? 0x0000 // Exponent`,
      `101 ? 0x0000 // Power result`,
      `102 ? 0x0000 // Divisor`,
      `103 ? 0x0000 // Remainder`,
      `104 ? -99999`
    ]
  };
};