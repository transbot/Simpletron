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
        read: '读取到地址xx',
        write: '写入地址xx的值',
        load: '加载地址xx到累加器',
        store: '存储累加器到地址xx',
        add: '累加器 += 地址xx',
        subtract: '累加器 -= 地址xx',
        divide: '累加器 /= 地址xx',
        multiply: '累加器 *= 地址xx',
        branch: '跳转到地址xx',
        branchNeg: '如果累加器&lt;0跳转到地址xx',
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
        initZero: '初始化地址18-19为0',
        readCount: '读取数字个数到地址20',
        loadCount: '加载数字个数到累加器',
        branchIfZero: '如果为0，跳转到17（结束程序）',
        storeCounter: '存储计数器到地址19',
        readFirst: '读取第一个数字到地址21',
        loadFirst: '加载该数字到累加器',
        storeMax: '存储为当前最大值到地址18',
        loadCounter: '加载计数器',
        subtract1: '减去1（地址22存储常量1）',
        storeNewCounter: '存储新的计数器值',
        branchIfDone: '如果为0（所有数字已处理完毕），跳转到17',
        readNext: '读取下一个数字到地址21',
        loadMax: '加载当前最大值',
        subNew: '减去新数字',
        branchIfNeg: '如果结果为负（新数字更大），跳转到06更新最大值',
        loop: '跳转到11继续循环',
        writeMax: '显示最大值',
        halt: '停止',
        maxValue: '存储最大值',
        counter: '存储计数器',
        numberCount: '存储数字个数',
        tempNumber: '临时存储输入数字',
        constant1: '常量1'
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
        read: 'Read to address xx',
        write: 'Write value at address xx',
        load: 'Load address xx to accumulator',
        store: 'Store accumulator to address xx',
        add: 'Accumulator += address xx',
        subtract: 'Accumulator -= address xx',
        divide: 'Accumulator /= address xx',
        multiply: 'Accumulator *= address xx',
        branch: 'Branch to address xx',
        branchNeg: 'Branch to address xx if accumulator &lt; 0',
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
        initZero: 'Initialize addresses 18-19 to 0',
        readCount: 'Read number count to address 20',
        loadCount: 'Load number count to accumulator',
        branchIfZero: 'If 0, branch to 17 (end program)',
        storeCounter: 'Store counter to address 19',
        readFirst: 'Read first number to address 21',
        loadFirst: 'Load that number to accumulator',
        storeMax: 'Store as current maximum to address 18',
        loadCounter: 'Load counter',
        subtract1: 'Subtract 1 (address 22 stores constant 1)',
        storeNewCounter: 'Store new counter value',
        branchIfDone: 'If 0 (all numbers processed), branch to 17',
        readNext: 'Read next number to address 21',
        loadMax: 'Load current maximum',
        subNew: 'Subtract new number',
        branchIfNeg: 'If negative (new number is larger), branch to 06 to update max',
        loop: 'Branch to 11 to continue loop',
        writeMax: 'Display maximum',
        halt: 'Halt',
        maxValue: 'Store maximum value',
        counter: 'Store counter',
        numberCount: 'Store number count',
        tempNumber: 'Temporary storage for input number',
        constant1: 'Constant 1'
      }
    }
  }
};

export type TranslationKey = keyof typeof translations.zh;