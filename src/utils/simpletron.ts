import { SimpletronState, ExecutionResult, OPCODES } from '../types/simpletron';
import { translations, Language } from '../i18n/translations';

export class Simpletron {
  private state: SimpletronState;
  private output: string[];
  private pendingInput: boolean;
  private inputCallback?: (value: number) => void;

  constructor() {
    this.state = this.createInitialState();
    this.output = [];
    this.pendingInput = false;
  }

  private createInitialState(): SimpletronState {
    return {
      memory: new Array(100).fill(0),
      accumulator: 0,
      instructionCounter: 0,
      instructionRegister: 0,
      operationCode: 0,
      operand: 0,
      isRunning: false,
      isHalted: false
    };
  }

  public getState(): SimpletronState {
    return { ...this.state };
  }

  public getOutput(): string[] {
    return [...this.output];
  }

  public reset(): void {
    this.state = this.createInitialState();
    this.output = [];
    this.pendingInput = false;
    this.inputCallback = undefined;
  }

  public loadProgram(instructions: number[]): { success: boolean; error?: string } {
    this.reset();
    
    for (let i = 0; i < instructions.length; i++) {
      if (!this.isValidWord(instructions[i])) {
        return {
          success: false,
          error: `无效指令 ${instructions[i]} 在地址 ${i.toString().padStart(2, '0')}: 必须在 -9999 到 +9999 范围内`
        };
      }
      this.state.memory[i] = instructions[i];
    }

    return { success: true };
  }

  public loadProgramFromInput(program: string): { success: boolean; error?: string } {
    const instructions: number[] = [];
    const lines = program.trim().split('\n').filter(line => line.trim());
    
    for (const line of lines) {
      // 移除注释（以//开始的部分）
      const commentIndex = line.indexOf('//');
      const trimmed = (commentIndex !== -1 ? line.substring(0, commentIndex) : line).trim();
      
      // 跳过空行
      if (!trimmed) continue;
      
      if (trimmed === '-99999') break;
      
      const num = parseInt(trimmed);
      if (isNaN(num)) {
        return {
          success: false,
          error: `无效输入: "${trimmed}" (原行: "${line.trim()}")`
        };
      }
      
      if (!this.isValidWord(num)) {
        return {
          success: false,
          error: `数字 ${num} 超出有效范围 (-9999 到 +9999) (原行: "${line.trim()}")`
        };
      }
      
      instructions.push(num);
    }

    return this.loadProgram(instructions);
  }

  private isValidWord(word: number): boolean {
    return Number.isInteger(word) && word >= -9999 && word <= 9999;
  }

  private isValidAddress(address: number): boolean {
    return Number.isInteger(address) && address >= 0 && address <= 99;
  }

  public executeInstruction(): ExecutionResult {
    if (this.state.isHalted || this.pendingInput) {
      return { success: true };
    }

    if (!this.isValidAddress(this.state.instructionCounter)) {
      return {
        success: false,
        error: `无效的指令计数器: ${this.state.instructionCounter}`
      };
    }

    // 获取指令
    this.state.instructionRegister = this.state.memory[this.state.instructionCounter];
    this.state.operationCode = Math.floor(Math.abs(this.state.instructionRegister) / 100);
    this.state.operand = Math.abs(this.state.instructionRegister) % 100;

    let shouldIncrementCounter = true;
    let result: ExecutionResult = { success: true };

    switch (this.state.operationCode) {
      case OPCODES.READ:
        result = this.executeRead();
        break;
      case OPCODES.WRITE:
        result = this.executeWrite();
        break;
      case OPCODES.LOAD:
        result = this.executeLoad();
        break;
      case OPCODES.STORE:
        result = this.executeStore();
        break;
      case OPCODES.ADD:
        result = this.executeAdd();
        break;
      case OPCODES.SUBTRACT:
        result = this.executeSubtract();
        break;
      case OPCODES.DIVIDE:
        result = this.executeDivide();
        break;
      case OPCODES.MULTIPLY:
        result = this.executeMultiply();
        break;
      case OPCODES.BRANCH:
        result = this.executeBranch();
        shouldIncrementCounter = false;
        break;
      case OPCODES.BRANCHNEG:
        shouldIncrementCounter = !this.executeBranchNeg();
        break;
      case OPCODES.BRANCHZERO:
        shouldIncrementCounter = !this.executeBranchZero();
        break;
      case 43: // HALT
        result = this.executeHalt();
        return result;
      default:
        return {
          success: false,
          error: `无效的操作码: ${this.state.operationCode}`
        };
    }

    if (result.success && shouldIncrementCounter && !this.pendingInput) {
      this.state.instructionCounter++;
    }

    return result;
  }

  private executeRead(): ExecutionResult {
    if (!this.isValidAddress(this.state.operand)) {
      return {
        success: false,
        error: `READ操作中的无效地址: ${this.state.operand}`
      };
    }

    this.pendingInput = true;
    return {
      success: true,
      needsInput: true,
      inputPrompt: "请输入一个整数:"
    };
  }

  public provideInput(value: number): ExecutionResult {
    if (!this.pendingInput) {
      return { success: false, error: "未等待输入" };
    }

    if (!this.isValidWord(value)) {
      return {
        success: false,
        error: `输入值 ${value} 超出有效范围 (-9999 到 +9999)`
      };
    }

    this.state.memory[this.state.operand] = value;
    this.pendingInput = false;
    this.state.instructionCounter++;
    
    return { success: true };
  }

  private executeWrite(): ExecutionResult {
    if (!this.isValidAddress(this.state.operand)) {
      return {
        success: false,
        error: `WRITE操作中的无效地址: ${this.state.operand}`
      };
    }

    const value = this.state.memory[this.state.operand];
    const formatted = this.formatWord(value);
    this.output.push(formatted);
    
    return {
      success: true,
      output: formatted
    };
  }

  private executeLoad(): ExecutionResult {
    if (!this.isValidAddress(this.state.operand)) {
      return {
        success: false,
        error: `LOAD操作中的无效地址: ${this.state.operand}`
      };
    }

    this.state.accumulator = this.state.memory[this.state.operand];
    return { success: true };
  }

  private executeStore(): ExecutionResult {
    if (!this.isValidAddress(this.state.operand)) {
      return {
        success: false,
        error: `STORE操作中的无效地址: ${this.state.operand}`
      };
    }

    this.state.memory[this.state.operand] = this.state.accumulator;
    return { success: true };
  }

  private executeAdd(): ExecutionResult {
    if (!this.isValidAddress(this.state.operand)) {
      return {
        success: false,
        error: `ADD操作中的无效地址: ${this.state.operand}`
      };
    }

    const result = this.state.accumulator + this.state.memory[this.state.operand];
    
    if (!this.isValidWord(result)) {
      return {
        success: false,
        error: "*** 累加器溢出 ***"
      };
    }

    this.state.accumulator = result;
    return { success: true };
  }

  private executeSubtract(): ExecutionResult {
    if (!this.isValidAddress(this.state.operand)) {
      return {
        success: false,
        error: `SUBTRACT操作中的无效地址: ${this.state.operand}`
      };
    }

    const result = this.state.accumulator - this.state.memory[this.state.operand];
    
    if (!this.isValidWord(result)) {
      return {
        success: false,
        error: "*** 累加器溢出 ***"
      };
    }

    this.state.accumulator = result;
    return { success: true };
  }

  private executeDivide(): ExecutionResult {
    if (!this.isValidAddress(this.state.operand)) {
      return {
        success: false,
        error: `DIVIDE操作中的无效地址: ${this.state.operand}`
      };
    }

    const divisor = this.state.memory[this.state.operand];
    
    if (divisor === 0) {
      return {
        success: false,
        error: "*** 尝试除以零 ***"
      };
    }

    const result = Math.floor(this.state.accumulator / divisor);
    
    if (!this.isValidWord(result)) {
      return {
        success: false,
        error: "*** 累加器溢出 ***"
      };
    }

    this.state.accumulator = result;
    return { success: true };
  }

  private executeMultiply(): ExecutionResult {
    if (!this.isValidAddress(this.state.operand)) {
      return {
        success: false,
        error: `MULTIPLY操作中的无效地址: ${this.state.operand}`
      };
    }

    const result = this.state.accumulator * this.state.memory[this.state.operand];
    
    if (!this.isValidWord(result)) {
      return {
        success: false,
        error: "*** 累加器溢出 ***"
      };
    }

    this.state.accumulator = result;
    return { success: true };
  }

  private executeBranch(): ExecutionResult {
    if (!this.isValidAddress(this.state.operand)) {
      return {
        success: false,
        error: `BRANCH操作中的无效地址: ${this.state.operand}`
      };
    }

    this.state.instructionCounter = this.state.operand;
    return { success: true };
  }

  private executeBranchNeg(): boolean {
    if (!this.isValidAddress(this.state.operand)) {
      return false;
    }

    if (this.state.accumulator < 0) {
      this.state.instructionCounter = this.state.operand;
      return true;
    }
    return false;
  }

  private executeBranchZero(): boolean {
    if (!this.isValidAddress(this.state.operand)) {
      return false;
    }

    if (this.state.accumulator === 0) {
      this.state.instructionCounter = this.state.operand;
      return true;
    }
    return false;
  }

  private executeHalt(): ExecutionResult {
    this.state.isHalted = true;
    this.state.isRunning = false;
    this.output.push("*** Simpletron execution terminated ***");
    
    return {
      success: true,
      output: "*** Simpletron execution terminated ***"
    };
  }

  public startExecution(): void {
    this.state.isRunning = true;
    this.state.isHalted = false;
    this.state.instructionCounter = 0;
  }

  private formatWord(word: number): string {
    const sign = word >= 0 ? '+' : '';
    return sign + word.toString().padStart(4, '0');
  }

  public generateDump(language: Language = 'en'): string {
    const t = translations[language];
    const dump = [];
    
    dump.push(t.memoryDump.registers);
    dump.push(`${t.memoryDump.registerNames.accumulator}\t\t${this.formatWord(this.state.accumulator)}`);
    dump.push(`${t.memoryDump.registerNames.instructionCounter}\t${this.state.instructionCounter.toString().padStart(2, '0')}`);
    dump.push(`${t.memoryDump.registerNames.instructionRegister}\t${this.formatWord(this.state.instructionRegister)}`);
    dump.push(`${t.memoryDump.registerNames.operationCode}\t\t${this.state.operationCode.toString().padStart(2, '0')}`);
    dump.push(`${t.memoryDump.registerNames.operand}\t\t\t${this.state.operand.toString().padStart(2, '0')}`);
    dump.push("");
    dump.push(t.memoryDump.memory);
    
    // 内存标题行
    let header = "      ";
    for (let i = 0; i < 10; i++) {
      header += i.toString().padStart(6);
    }
    dump.push(header);
    
    // 内存内容
    for (let row = 0; row < 10; row++) {
      let line = (row * 10).toString().padStart(2, '0') + " ";
      for (let col = 0; col < 10; col++) {
        const address = row * 10 + col;
        const value = this.state.memory[address];
        line += this.formatWord(value).padStart(6);
      }
      dump.push(line);
    }
    
    return dump.join('\n');
  }

  public isPendingInput(): boolean {
    return this.pendingInput;
  }
}