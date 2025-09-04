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
    "+0000  // 初始化地址00-01为0",
    "+0000",
    "+1009  // 读取第一个数字（指示要处理的数字数量）到地址09",
    "+2009  // 加载该数字到累加器",
    "+4219  // 如果为0，跳转到19（结束程序）",
    "+2101  // 存储计数器到地址01",
    "+1010  // 读取第一个实际数字到地址10",
    "+2010  // 加载该数字到累加器",
    "+2100  // 存储为当前最大值到地址00",
    "+2001  // 加载计数器",
    "+3118  // 减去1",
    "+2101  // 存储新的计数器值",
    "+2001  // 加载计数器",
    "+4218  // 如果等于0（所有数字已处理完毕），跳转到18",
    "+1010  // 读取下一个数字到地址10",
    "+2000  // 加载当前最大值",
    "+3110  // 减去新数字",
    "+4108  // 如果结果为负（新数字更大），跳转到08更新最大值",
    "+1100  // 显示最大值",
    "+4300  // 停止",
    "+0001  // 常量1",
    "-99999"
  ]
};