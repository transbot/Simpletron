export const translations = {
  zh: {
    // 标题和描述
    title: 'Simpletron虚拟机',
    subtitle: '功能完整的SML (Simpletron Machine Language) 模拟器',
    welcome: '欢迎来到Simpletron！',
    
    // 指令说明
    instructions: {
      enterOneInstruction: '*** 请一次输入一条程序指令（或数据字） ***',
      showMemoryAddress: '*** 我将显示内存地址和一个问号（?） ***',
      enterWordForAddress: '*** 然后，您输入该地址的字 ***',
      endWithNegative: '*** 输入-99999结束程序输入 ***'
    },
    
    // 程序加载器
    programLoader: {
      title: '程序加载器',
      examplePrograms: '示例程序:',
      additionProgram: '加法程序',
      comparisonProgram: '比较程序',
      findMaxProgram: '查找最大值',
      clear: '清除',
      smlProgram: 'SML程序 (以-99999结束):',
      loadProgram: '加载程序',
      instructionHelp: 'SML指令说明:',
      opcodes: {
        nop: '无操作（NOP）',
        read: '读取到地址xx',
        write: '写入地址xx的值',
        load: '加载地址xx到累加器',
        store: '存储累加器到地址xx',
        add: '累加器 += 地址xx',
        subtract: '累加器 -= 地址xx',
        divide: '累加器 /= 地址xx',
        multiply: '累加器 *= 地址xx',
        branch: '跳转到地址xx',
        branchNeg: '如果累加器<0跳转到地址xx',
        branchZero: '如果累加器=0跳转到地址xx',
        halt: '停止执行'
      }
    },
    
    // 执行控制
    executionControl: {
      title: '执行控制',
      run: '运行',
      step: '单步',
      reset: '重置',
      status: '状态:',
      program: '程序:',
      statusValues: {
        halted: '已停止',
        waitingInput: '等待输入',
        running: '运行中',
        paused: '已暂停',
        ready: '准备就绪'
      },
      programValues: {
        loaded: '已加载',
        notLoaded: '未加载'
      },
      inputRequest: '输入请求',
      enterInteger: '输入整数 (-9999 到 9999)',
      submit: '提交'
    },
    
    // 输出显示
    output: {
      title: '程序输出',
      waitingOutput: '等待程序输出...',
      outputLines: '输出行数',
      errorCount: '错误数'
    },
    
    // 内存转储
    memoryDump: {
      title: '系统转储',
      registers: '寄存器:',
      memory: '内存:',
      registerNames: {
        accumulator: 'accumulator',
        instructionCounter: 'instructionCounter',
        instructionRegister: 'instructionRegister',
        operationCode: 'operationCode',
        operand: 'operand'
      }
    },
    
    // 错误信息
    errors: {
      systemError: '系统错误',
      moreErrors: '还有 {count} 个错误',
      completeDump: '完整转储:',
      executionTerminated: '*** Simpletron执行异常终止 ***',
      executionHalted: '*** Simpletron终止执行 ***'
    },
    
    // 示例程序注释
    examples: {
      addition: {
        readA: '读取A',
        readB: '读取B',
        loadA: '加载A',
        addB: '加B',
        storeC: '存储C',
        writeC: '写入C',
        halt: '停止',
        varA: '变量A',
        varB: '变量B',
        resultC: '结果C'
      },
      comparison: {
        readA: '读取A',
        readB: '读取B',
        loadA: '加载A',
        subB: '减B',
        branchNeg: '如果为负则跳转到07',
        writeA: '写入A',
        halt: '停止',
        writeB: '写入B',
        varA: '变量A',
        varB: '变量B'
      },
      findMax: {
        readCount: '读取需要处理的数字总数N，存入地址99',
        loadCount: '加载计数器N',
        branchIfZero: '如果N为0，跳转到地址22结束',
        readFirst: '读取第一个数，作为初始最大数存入地址98',
        loadCountAgain: '再次加载计数器N',
        subtract1: '计数器减1（因为已处理一个数）',
        storeNewCount: '存储新的计数器值（N-1）',
        loopStart: '循环开始：加载当前计数器',
        branchIfDone: '如果计数器为0，跳转到地址20结束',
        readNext: '读取下一个数到地址97',
        loadCurrentMax: '加载当前的最大数',
        subNewNumber: '计算（最大数-新输入的数）',
        branchIfNewLarger: '如果结果为负（新数更大），跳转到地址14',
        jumpToDecrement: '否则跳转到地址16（递减计数器）',
        loadNewNumber: '更新最大值：加载新输入的数',
        updateMax: '将其存为新的最大数',
        decrementCounter: '递减计数器：加载计数器',
        subtract1Again: '计数器减1',
        storeCounter: '存储新的计数器值',
        jumpToLoop: '无条件跳转回循环开始（地址07）',
        writeMax: '显示存储在地址98的最终最大数',
        writeAddress: '显示存储结果的内存地址（98）',
        halt: '停止程序',
        unused1: '未使用',
        unused2: '未使用',
        constant98: '常量98',
        constant1: '常量1',
        inputVar: '变量，代表输入',
        maxValue: '变量，代表当前最大值',
        counter: '变量，代表计数器'
      }
    }
  },
  
  en: {
    // Title and description
    title: 'Simpletron Virtual Machine',
    subtitle: 'A complete SML (Simpletron Machine Language) simulator',
    welcome: 'Welcome to Simpletron!',
    
    // Instructions
    instructions: {
      enterOneInstruction: '*** Please enter one instruction (or data word) at a time ***',
      showMemoryAddress: '*** I will display the memory location and a question mark (?) ***',
      enterWordForAddress: '*** Then you type the word for that location ***',
      endWithNegative: '*** Type -99999 to stop entering your program ***'
    },
    
    // Program loader
    programLoader: {
      title: 'Program Loader',
      examplePrograms: 'Example Programs:',
      additionProgram: 'Addition',
      comparisonProgram: 'Comparison',
      findMaxProgram: 'Find Maximum',
      clear: 'Clear',
      smlProgram: 'SML Program (end with -99999):',
      loadProgram: 'Load Program',
      instructionHelp: 'SML Instruction Reference:',
      opcodes: {
        nop: 'No operation (NOP)',
        read: 'Read to address xx',
        write: 'Write value at address xx',
        load: 'Load address xx to accumulator',
        store: 'Store accumulator to address xx',
        add: 'Accumulator += address xx',
        subtract: 'Accumulator -= address xx',
        divide: 'Accumulator /= address xx',
        multiply: 'Accumulator *= address xx',
        branch: 'Branch to address xx',
        branchNeg: 'Branch to address xx if accumulator < 0',
        branchZero: 'Branch to address xx if accumulator = 0',
        halt: 'Halt execution'
      }
    },
    
    // Execution control
    executionControl: {
      title: 'Execution Control',
      run: 'Run',
      step: 'Step',
      reset: 'Reset',
      status: 'Status:',
      program: 'Program:',
      statusValues: {
        halted: 'Halted',
        waitingInput: 'Waiting Input',
        running: 'Running',
        paused: 'Paused',
        ready: 'Ready'
      },
      programValues: {
        loaded: 'Loaded',
        notLoaded: 'Not Loaded'
      },
      inputRequest: 'Input Request',
      enterInteger: 'Enter integer (-9999 to 9999)',
      submit: 'Submit'
    },
    
    // Output display
    output: {
      title: 'Program Output',
      waitingOutput: 'Waiting for program output...',
      outputLines: 'Output lines',
      errorCount: 'Errors'
    },
    
    // Memory dump
    memoryDump: {
      title: 'System Dump',
      registers: 'Registers:',
      memory: 'Memory:',
      registerNames: {
        accumulator: 'accumulator',
        instructionCounter: 'instructionCounter',
        instructionRegister: 'instructionRegister',
        operationCode: 'operationCode',
        operand: 'operand'
      }
    },
    
    // Error messages
    errors: {
      systemError: 'System Error',
      moreErrors: '... and {count} more errors',
      completeDump: 'Complete dump:',
      executionTerminated: '*** Simpletron execution abnormally terminated ***',
      executionHalted: '*** Simpletron execution terminated ***'
    },
    
    // Example program comments
    examples: {
      addition: {
        readA: 'Read A',
        readB: 'Read B',
        loadA: 'Load A',
        addB: 'Add B',
        storeC: 'Store C',
        writeC: 'Write C',
        halt: 'Halt',
        varA: 'Variable A',
        varB: 'Variable B',
        resultC: 'Result C'
      },
      comparison: {
        readA: 'Read A',
        readB: 'Read B',
        loadA: 'Load A',
        subB: 'Subtract B',
        branchNeg: 'Branch to 07 if negative',
        writeA: 'Write A',
        halt: 'Halt',
        writeB: 'Write B',
        varA: 'Variable A',
        varB: 'Variable B'
      },
      findMax: {
        readCount: 'Read total count N, store in address 99',
        loadCount: 'Load counter N',
        branchIfZero: 'If N is 0, jump to address 22 to end',
        readFirst: 'Read first number as initial largest, store in address 98',
        loadCountAgain: 'Load counter N again',
        subtract1: 'Counter minus 1 (one number already processed)',
        storeNewCount: 'Store new counter value (N-1)',
        loopStart: 'Loop start: Load current counter',
        branchIfDone: 'If counter is 0, jump to address 20 to end',
        readNext: 'Read next number to address 97',
        loadCurrentMax: 'Load current largest number',
        subNewNumber: 'Calculate (largest - new input)',
        branchIfNewLarger: 'If result is negative (new number is larger), jump to address 14',
        jumpToDecrement: 'Otherwise jump to address 16 (decrement counter)',
        loadNewNumber: 'Update largest: Load new input number',
        updateMax: 'Store it as new largest',
        decrementCounter: 'Decrement counter: Load counter',
        subtract1Again: 'Counter minus 1',
        storeCounter: 'Store new counter value',
        jumpToLoop: 'Unconditional jump back to loop start (address 07)',
        writeMax: 'Display final largest number stored in address 98',
        writeAddress: 'Display memory address of result (98)',
        halt: 'Halt program',
        unused1: 'Unused',
        unused2: 'Unused',
        constant98: 'Constant 98',
        constant1: 'Constant 1',
        inputVar: 'Variable for input',
        maxValue: 'Variable for current maximum',
        counter: 'Variable for counter'
      }
    }
  }
};

export type TranslationKey = keyof typeof translations.zh;