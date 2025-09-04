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
  HALT: 43
} as const;

export const EXAMPLE_PROGRAMS = {
  addition: [
    "+1007  // 读取A",
    "+1008  // 读取B", 
    "+2007  // 加载A",
    "+3008  // 加B",
    "+2109  // 存储C",
    "+1109  // 写入C",
    "+4300  // 停止",
    "+0000  // 变量A",
    "+0000  // 变量B",
    "+0000  // 结果C",
    "-99999"
  ],
  comparison: [
    "+1009  // 读取A",
    "+1010  // 读取B",
    "+2009  // 加载A", 
    "+3110  // 减B",
    "+4107  // 如果为负则跳转到07",
    "+1109  // 写入A",
    "+4300  // 停止",
    "+1110  // 写入B",
    "+4300  // 停止", 
    "+0000  // 变量A",
    "+0000  // 变量B",
    "-99999"
  ],
  findMax: [
    "+1020  // 读取数字个数到地址20",
    "+2020  // 加载数字个数到累加器",
    "+4218  // 如果为0，跳转到18（结束程序）",
    "+2119  // 存储计数器到地址19",
    "+1021  // 读取第一个数字到地址21",
    "+2021  // 加载该数字到累加器",
    "+2118  // 存储为当前最大值到地址18",
    "+2019  // 加载计数器",
    "+3122  // 减去1（地址22存储常量1）",
    "+2119  // 存储新的计数器值",
    "+4217  // 如果为0（所有数字已处理完毕），跳转到17",
    "+1021  // 读取下一个数字到地址21",
    "+2018  // 加载当前最大值",
    "+3121  // 减去新数字",
    "+4106  // 如果结果为负（新数字更大），跳转到06更新最大值",
    "+4011  // 跳转到11继续循环",
    "+1118  // 显示最大值",
    "+4300  // 停止",
    "+0000  // 地址18：存储最大值",
    "+0000  // 地址19：存储计数器",
    "+0000  // 地址20：存储数字个数",
    "+0000  // 地址21：临时存储输入数字",
    "+0001  // 地址22：常量1",
    "-99999"
  ]
};