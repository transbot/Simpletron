import { AdvancedSimpleTronState, AdvancedExecutionResult, ADVANCED_OPCODES } from '../types/advancedSimpletron';

export class AdvancedSimpletronVM {
  private state: AdvancedSimpleTronState;
  private output: string[];
  private pendingInput: boolean;
  private inputType: 'number' | 'string' | 'float' = 'number';

  constructor() {
    this.state = this.createInitialState();
    this.output = [];
    this.pendingInput = false;
  }

  private createInitialState(): AdvancedSimpleTronState {
    return {
      memory: new Array(1000).fill(0), // Extended to 1000 words
      accumulator: 0,
      instructionCounter: 0,
      instructionRegister: 0,
      operationCode: 0,
      operand: 0,
      isRunning: false,
      isHalted: false,
      floatMode: false
    };
  }

  public getState(): AdvancedSimpleTronState {
    return { ...this.state };
  }

  public getOutput(): string[] {
    return [...this.output];
  }

  public reset(): void {
    this.state = this.createInitialState();
    this.output = [];
    this.pendingInput = false;
    this.inputType = 'number';
  }

  public loadProgramFromInput(program: string): { success: boolean; error?: string } {
    const instructions: (number | string)[] = [];
    const lines = program.trim().split('\n');
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      if (!trimmedLine || trimmedLine.startsWith('//')) continue;
      
      let address: number;
      let instruction: number | string;
      
      // Support both hex and decimal formats
      const hexFormatMatch = trimmedLine.match(/^(\d{1,3})\s*\?\s*(0x[0-9A-Fa-f]+)/);
      const decFormatMatch = trimmedLine.match(/^(\d{1,3})\s*\?\s*([+-]?\d+)/);
      
      if (hexFormatMatch) {
        address = parseInt(hexFormatMatch[1]);
        instruction = hexFormatMatch[2];
      } else if (decFormatMatch) {
        address = parseInt(decFormatMatch[1]);
        let instructionStr = decFormatMatch[2];
        
        const commentIndex = instructionStr.indexOf('//');
        if (commentIndex !== -1) {
          instructionStr = instructionStr.substring(0, commentIndex);
        }
        const cleanInstructionStr = instructionStr.trim();
        
        if (!cleanInstructionStr) continue;
        
        const instructionNum = parseInt(cleanInstructionStr);
        if (isNaN(instructionNum)) continue;
        
        if (instructionNum === -99999) break;
        instruction = instructionNum;
      } else {
        continue;
      }
      
      if (typeof instruction === 'string' && instruction === '0x-99999') break;
      if (typeof instruction === 'number' && instruction === -99999) break;
      
      if (address < 0 || address >= 1000) {
        return {
          success: false,
          error: `Address ${address} out of range (0-999)`
        };
      }
      
      while (instructions.length <= address) {
        instructions.push(0);
      }
      
      instructions[address] = instruction;
    }

    // Load into memory
    this.reset();
    for (let i = 0; i < instructions.length; i++) {
      this.state.memory[i] = instructions[i];
    }

    return { success: true };
  }

  public executeInstruction(): AdvancedExecutionResult {
    if (this.state.isHalted || this.pendingInput) {
      return { success: true };
    }

    if (this.state.instructionCounter < 0 || this.state.instructionCounter >= 1000) {
      return {
        success: false,
        error: `Invalid instruction counter: ${this.state.instructionCounter}`
      };
    }

    // Fetch instruction
    this.state.instructionRegister = this.state.memory[this.state.instructionCounter];
    
    let instruction: number;
    let opcode: number = 0;
    let operand: number = 0;
    
    if (typeof this.state.instructionRegister === 'string' && this.state.instructionRegister.startsWith('0x')) {
      // Hex format
      instruction = parseInt(this.state.instructionRegister, 16);
    } else {
      // Decimal format
      instruction = typeof this.state.instructionRegister === 'number' 
        ? this.state.instructionRegister 
        : parseInt(this.state.instructionRegister.toString());
    }

    // Parse opcode and operand from instruction
    opcode = Math.floor(Math.abs(instruction) / 100);
    operand = Math.abs(instruction) % 100;

    this.state.operationCode = opcode;
    this.state.operand = operand;

    let shouldIncrementCounter = true;
    let result: AdvancedExecutionResult = { success: true };

    switch (opcode) {
      case ADVANCED_OPCODES.NOP:
        break;
      case ADVANCED_OPCODES.READ:
        result = this.executeRead();
        break;
      case ADVANCED_OPCODES.WRITE:
        result = this.executeWrite();
        break;
      case ADVANCED_OPCODES.READ_STRING:
        result = this.executeReadString();
        break;
      case ADVANCED_OPCODES.WRITE_STRING:
        result = this.executeWriteString();
        break;
      case ADVANCED_OPCODES.WRITE_NEWLINE:
        result = this.executeWriteNewline();
        break;
      case ADVANCED_OPCODES.LOAD:
        result = this.executeLoad();
        break;
      case ADVANCED_OPCODES.STORE:
        result = this.executeStore();
        break;
      case ADVANCED_OPCODES.ADD:
        result = this.executeAdd();
        break;
      case ADVANCED_OPCODES.SUBTRACT:
        result = this.executeSubtract();
        break;
      case ADVANCED_OPCODES.DIVIDE:
        result = this.executeDivide();
        break;
      case ADVANCED_OPCODES.MULTIPLY:
        result = this.executeMultiply();
        break;
      case ADVANCED_OPCODES.MODULO:
        result = this.executeModulo();
        break;
      case ADVANCED_OPCODES.POWER:
        result = this.executePower();
        break;
      case ADVANCED_OPCODES.BRANCH:
        result = this.executeBranch();
        shouldIncrementCounter = false;
        break;
      case ADVANCED_OPCODES.BRANCHNEG:
        shouldIncrementCounter = !this.executeBranchNeg();
        break;
      case ADVANCED_OPCODES.BRANCHZERO:
        shouldIncrementCounter = !this.executeBranchZero();
        break;
      case ADVANCED_OPCODES.LOAD_FLOAT:
        result = this.executeLoadFloat();
        break;
      case ADVANCED_OPCODES.STORE_FLOAT:
        result = this.executeStoreFloat();
        break;
      case ADVANCED_OPCODES.ADD_FLOAT:
        result = this.executeAddFloat();
        break;
      case ADVANCED_OPCODES.SUBTRACT_FLOAT:
        result = this.executeSubtractFloat();
        break;
      case ADVANCED_OPCODES.DIVIDE_FLOAT:
        result = this.executeDivideFloat();
        break;
      case ADVANCED_OPCODES.MULTIPLY_FLOAT:
        result = this.executeMultiplyFloat();
        break;
      case 43: // HALT
        result = this.executeHalt();
        return result;
      default:
        return {
          success: false,
          error: `Invalid operation code: ${opcode}`
        };
    }

    if (result.success && shouldIncrementCounter && !this.pendingInput) {
      this.state.instructionCounter++;
    }

    return result;
  }

  private executeRead(): AdvancedExecutionResult {
    if (this.state.operand < 0 || this.state.operand >= 1000) {
      return {
        success: false,
        error: `Invalid address in READ: ${this.state.operand}`
      };
    }

    this.pendingInput = true;
    this.inputType = 'number';
    return {
      success: true,
      needsInput: true,
      inputPrompt: "Enter an integer:",
      inputType: 'number'
    };
  }

  private executeReadString(): AdvancedExecutionResult {
    if (this.state.operand < 0 || this.state.operand >= 1000) {
      return {
        success: false,
        error: `Invalid address in READ_STRING: ${this.state.operand}`
      };
    }

    this.pendingInput = true;
    this.inputType = 'string';
    return {
      success: true,
      needsInput: true,
      inputPrompt: "Enter a string:",
      inputType: 'string'
    };
  }

  private executeWrite(): AdvancedExecutionResult {
    if (this.state.operand < 0 || this.state.operand >= 1000) {
      return {
        success: false,
        error: `Invalid address in WRITE: ${this.state.operand}`
      };
    }

    const value = this.state.memory[this.state.operand];
    const formatted = typeof value === 'number' ? this.formatWord(value) : value.toString();
    this.output.push(formatted);
    
    return {
      success: true,
      output: formatted
    };
  }

  private executeWriteString(): AdvancedExecutionResult {
    if (this.state.operand < 0 || this.state.operand >= 1000) {
      return {
        success: false,
        error: `Invalid address in WRITE_STRING: ${this.state.operand}`
      };
    }

    // Read string from memory starting at operand address
    const stringData = this.state.memory[this.state.operand];
    if (typeof stringData === 'string') {
      this.output.push(stringData);
      return {
        success: true,
        output: stringData
      };
    } else {
      // Decode from ASCII format
      const length = Math.floor(stringData / 100);
      let result = '';
      
      for (let i = 1; i <= Math.ceil(length / 2); i++) {
        const word = this.state.memory[this.state.operand + i];
        if (typeof word === 'number') {
          const char1 = Math.floor(word / 100);
          const char2 = word % 100;
          if (char1 > 0) result += String.fromCharCode(char1);
          if (char2 > 0 && result.length < length) result += String.fromCharCode(char2);
        }
      }
      
      this.output.push(result);
      return {
        success: true,
        output: result
      };
    }
  }

  private executeWriteNewline(): AdvancedExecutionResult {
    this.output.push('\n');
    return {
      success: true,
      output: '\n'
    };
  }

  private executeLoad(): AdvancedExecutionResult {
    if (this.state.operand < 0 || this.state.operand >= 1000) {
      return {
        success: false,
        error: `Invalid address in LOAD: ${this.state.operand}`
      };
    }

    const value = this.state.memory[this.state.operand];
    this.state.accumulator = typeof value === 'number' ? value : parseFloat(value.toString()) || 0;
    return { success: true };
  }

  private executeStore(): AdvancedExecutionResult {
    if (this.state.operand < 0 || this.state.operand >= 1000) {
      return {
        success: false,
        error: `Invalid address in STORE: ${this.state.operand}`
      };
    }

    this.state.memory[this.state.operand] = this.state.accumulator;
    return { success: true };
  }

  private executeAdd(): AdvancedExecutionResult {
    if (this.state.operand < 0 || this.state.operand >= 1000) {
      return {
        success: false,
        error: `Invalid address in ADD: ${this.state.operand}`
      };
    }

    const value = this.state.memory[this.state.operand];
    const numValue = typeof value === 'number' ? value : parseFloat(value.toString()) || 0;
    this.state.accumulator += numValue;
    
    return { success: true };
  }

  private executeSubtract(): AdvancedExecutionResult {
    if (this.state.operand < 0 || this.state.operand >= 1000) {
      return {
        success: false,
        error: `Invalid address in SUBTRACT: ${this.state.operand}`
      };
    }

    const value = this.state.memory[this.state.operand];
    const numValue = typeof value === 'number' ? value : parseFloat(value.toString()) || 0;
    this.state.accumulator -= numValue;
    
    return { success: true };
  }

  private executeDivide(): AdvancedExecutionResult {
    if (this.state.operand < 0 || this.state.operand >= 1000) {
      return {
        success: false,
        error: `Invalid address in DIVIDE: ${this.state.operand}`
      };
    }

    const value = this.state.memory[this.state.operand];
    const numValue = typeof value === 'number' ? value : parseFloat(value.toString()) || 0;
    
    if (numValue === 0) {
      return {
        success: false,
        error: "*** Attempt to divide by zero ***"
      };
    }

    this.state.accumulator = Math.floor(this.state.accumulator / numValue);
    return { success: true };
  }

  private executeMultiply(): AdvancedExecutionResult {
    if (this.state.operand < 0 || this.state.operand >= 1000) {
      return {
        success: false,
        error: `Invalid address in MULTIPLY: ${this.state.operand}`
      };
    }

    const value = this.state.memory[this.state.operand];
    const numValue = typeof value === 'number' ? value : parseFloat(value.toString()) || 0;
    this.state.accumulator *= numValue;
    
    return { success: true };
  }

  private executeModulo(): AdvancedExecutionResult {
    if (this.state.operand < 0 || this.state.operand >= 1000) {
      return {
        success: false,
        error: `Invalid address in MODULO: ${this.state.operand}`
      };
    }

    const value = this.state.memory[this.state.operand];
    const numValue = typeof value === 'number' ? value : parseFloat(value.toString()) || 0;
    
    if (numValue === 0) {
      return {
        success: false,
        error: "*** Attempt to modulo by zero ***"
      };
    }

    this.state.accumulator = this.state.accumulator % numValue;
    return { success: true };
  }

  private executePower(): AdvancedExecutionResult {
    if (this.state.operand < 0 || this.state.operand >= 1000) {
      return {
        success: false,
        error: `Invalid address in POWER: ${this.state.operand}`
      };
    }

    const value = this.state.memory[this.state.operand];
    const numValue = typeof value === 'number' ? value : parseFloat(value.toString()) || 0;
    this.state.accumulator = Math.pow(this.state.accumulator, numValue);
    
    return { success: true };
  }

  private executeBranch(): AdvancedExecutionResult {
    if (this.state.operand < 0 || this.state.operand >= 1000) {
      return {
        success: false,
        error: `Invalid address in BRANCH: ${this.state.operand}`
      };
    }

    this.state.instructionCounter = this.state.operand;
    return { success: true };
  }

  private executeBranchNeg(): boolean {
    if (this.state.operand < 0 || this.state.operand >= 1000) {
      return false;
    }

    if (this.state.accumulator < 0) {
      this.state.instructionCounter = this.state.operand;
      return true;
    }
    return false;
  }

  private executeBranchZero(): boolean {
    if (this.state.operand < 0 || this.state.operand >= 1000) {
      return false;
    }

    if (this.state.accumulator === 0) {
      this.state.instructionCounter = this.state.operand;
      return true;
    }
    return false;
  }

  // Float operations
  private executeLoadFloat(): AdvancedExecutionResult {
    this.state.floatMode = true;
    return this.executeLoad();
  }

  private executeStoreFloat(): AdvancedExecutionResult {
    return this.executeStore();
  }

  private executeAddFloat(): AdvancedExecutionResult {
    this.state.floatMode = true;
    return this.executeAdd();
  }

  private executeSubtractFloat(): AdvancedExecutionResult {
    this.state.floatMode = true;
    return this.executeSubtract();
  }

  private executeDivideFloat(): AdvancedExecutionResult {
    if (this.state.operand < 0 || this.state.operand >= 1000) {
      return {
        success: false,
        error: `Invalid address in DIVIDE_FLOAT: ${this.state.operand}`
      };
    }

    const value = this.state.memory[this.state.operand];
    const numValue = typeof value === 'number' ? value : parseFloat(value.toString()) || 0;
    
    if (numValue === 0) {
      return {
        success: false,
        error: "*** Attempt to divide by zero ***"
      };
    }

    this.state.accumulator = this.state.accumulator / numValue;
    this.state.floatMode = true;
    return { success: true };
  }

  private executeMultiplyFloat(): AdvancedExecutionResult {
    this.state.floatMode = true;
    return this.executeMultiply();
  }

  private executeHalt(): AdvancedExecutionResult {
    this.state.isHalted = true;
    this.state.isRunning = false;
    this.output.push("*** Advanced Simpletron execution terminated ***");
    
    return {
      success: true,
      output: "*** Advanced Simpletron execution terminated ***"
    };
  }

  public provideInput(value: number | string): AdvancedExecutionResult {
    if (!this.pendingInput) {
      return { success: false, error: "Not waiting for input" };
    }

    if (this.inputType === 'string') {
      // Store string in ASCII format
      const str = value.toString();
      const length = str.length;
      
      // Store length in first half of first word
      this.state.memory[this.state.operand] = length * 100;
      
      // Store characters in subsequent words
      for (let i = 0; i < str.length; i += 2) {
        const char1 = str.charCodeAt(i);
        const char2 = i + 1 < str.length ? str.charCodeAt(i + 1) : 0;
        const wordIndex = this.state.operand + Math.floor(i / 2) + 1;
        this.state.memory[wordIndex] = char1 * 100 + char2;
      }
    } else {
      // Store number
      const numValue = typeof value === 'number' ? value : parseFloat(value.toString());
      if (isNaN(numValue)) {
        return {
          success: false,
          error: `Invalid input value: ${value}`
        };
      }
      this.state.memory[this.state.operand] = numValue;
    }

    this.pendingInput = false;
    this.state.instructionCounter++;
    
    return { success: true };
  }

  public startExecution(): void {
    this.state.isRunning = true;
    this.state.isHalted = false;
    this.state.instructionCounter = 0;
  }

  private formatWord(word: number): string {
    if (this.state.floatMode && word % 1 !== 0) {
      return word.toFixed(2);
    }
    const sign = word >= 0 ? '+' : '-';
    const absValue = Math.abs(Math.floor(word)).toString().padStart(4, '0');
    return sign + absValue;
  }

  public isPendingInput(): boolean {
    return this.pendingInput;
  }
}