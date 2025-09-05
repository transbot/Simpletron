import React, { useState } from 'react';
import { getExamplePrograms } from '../types/simpletron';
import { Language } from '../hooks/useLanguage';
import { translations } from '../i18n/translations';

interface ProgramLoaderProps {
  onLoad: (program: string) => void;
  isRunning: boolean;
  language: Language;
}

export const ProgramLoader: React.FC<ProgramLoaderProps> = ({ onLoad, isRunning, language }) => {
  const t = translations[language];
  const EXAMPLE_PROGRAMS = getExamplePrograms(language);
  const [program, setProgram] = useState('');
  const [interactiveMode, setInteractiveMode] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(0);
  const [instructions, setInstructions] = useState<{ [key: number]: string }>({});
  const [currentInput, setCurrentInput] = useState('');

  const loadExampleProgram = (programName: keyof typeof EXAMPLE_PROGRAMS) => {
    const exampleProgram = EXAMPLE_PROGRAMS[programName];
    const programText = exampleProgram.join('\n');
    
    setProgram(programText);
    setInteractiveMode(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (interactiveMode) {
      // Convert interactive instructions to program text
      const programLines = [];
      for (let addr = 0; addr <= Math.max(...Object.keys(instructions).map(Number)); addr++) {
        if (instructions[addr]) {
          programLines.push(`${addr.toString().padStart(2, '0')} ? ${instructions[addr]}`);
        }
      }
      const programText = programLines.join('\n');
      onLoad(programText);
    } else {
      onLoad(program);
    }
  };

  const clearProgram = () => {
    setProgram('');
    setInteractiveMode(false);
    setCurrentAddress(0);
    setInstructions({});
    setCurrentInput('');
  };

  const startInteractiveMode = () => {
    setInteractiveMode(true);
    setCurrentAddress(0);
    setInstructions({});
    setCurrentInput('');
    setProgram('');
  };

  const handleInteractiveInput = (e: React.FormEvent) => {
    e.preventDefault();
    const input = currentInput.trim();
    
    if (!input) return;
    
    // Check for termination
    if (input === '-99999') {
      // Finish interactive input
      const programLines = [];
      for (let addr = 0; addr <= currentAddress; addr++) {
        if (instructions[addr]) {
          programLines.push(`${addr.toString().padStart(2, '0')} ? ${instructions[addr]}`);
        }
      }
      programLines.push(`${currentAddress.toString().padStart(2, '0')} ? -99999`);
      const programText = programLines.join('\n');
      setProgram(programText);
      setInteractiveMode(false);
      return;
    }
    
    // Validate instruction format
    if (!/^[+-]?\d+$/.test(input)) {
      alert(language === 'zh' ? '请输入有效的指令（如 +1007 或 -99999）' : 'Please enter a valid instruction (e.g., +1007 or -99999)');
      return;
    }
    
    const instructionNum = parseInt(input);
    if (instructionNum < -9999 || instructionNum > 9999) {
      alert(language === 'zh' ? '指令必须在 -9999 到 +9999 范围内' : 'Instruction must be between -9999 and +9999');
      return;
    }
    
    // Store instruction and move to next address
    setInstructions(prev => ({ ...prev, [currentAddress]: input }));
    setCurrentAddress(prev => prev + 1);
    setCurrentInput('');
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-4 text-blue-400">{t.programLoader.title}</h3>
        
        <div className="mb-4">
          <div className="mb-3">
            <span className="text-gray-300 text-sm">{t.programLoader.examplePrograms}</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              type="button"
              onClick={() => loadExampleProgram('addition')}
              disabled={isRunning}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {t.programLoader.additionProgram}
            </button>
            <button
              type="button"
              onClick={() => loadExampleProgram('comparison')}
              disabled={isRunning}
              className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {t.programLoader.comparisonProgram}
            </button>
            <button
              type="button"
              onClick={startInteractiveMode}
              disabled={isRunning}
              className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {language === 'zh' ? '交互输入' : 'Interactive'}
            </button>
            <button
              type="button"
              onClick={clearProgram}
              disabled={isRunning}
              className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {t.programLoader.clear}
            </button>
          </div>
        </div>

        {interactiveMode ? (
          <div className="mb-4">
            <div className="mb-4 p-4 bg-gray-900 rounded border border-blue-500">
              <h4 className="text-lg font-medium mb-3 text-blue-300">
                {language === 'zh' ? '交互式程序输入' : 'Interactive Program Input'}
              </h4>
              <div className="mb-3 text-gray-300 text-sm">
                {language === 'zh' ? '已输入的指令:' : 'Entered instructions:'}
              </div>
              <div className="mb-4 p-3 bg-gray-800 rounded font-mono text-sm max-h-32 overflow-y-auto">
                {Object.keys(instructions).length === 0 ? (
                  <div className="text-gray-500 italic">
                    {language === 'zh' ? '暂无指令...' : 'No instructions yet...'}
                  </div>
                ) : (
                  Object.entries(instructions)
                    .sort(([a], [b]) => parseInt(a) - parseInt(b))
                    .map(([addr, instruction]) => (
                      <div key={addr} className="text-cyan-300">
                        {addr.padStart(2, '0')} ? {instruction}
                      </div>
                    ))
                )}
              </div>
              
              <form onSubmit={handleInteractiveInput} className="flex items-center gap-2">
                <span className="text-yellow-400 font-mono text-lg">
                  {currentAddress.toString().padStart(2, '0')} ?
                </span>
                <input
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  disabled={isRunning}
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded font-mono text-white focus:border-blue-500 focus:outline-none disabled:opacity-50"
                  placeholder={language === 'zh' ? '输入指令 (如 +1007) 或 -99999 结束' : 'Enter instruction (e.g., +1007) or -99999 to end'}
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={isRunning || !currentInput.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {language === 'zh' ? '确认' : 'Enter'}
                </button>
              </form>
              
              <div className="mt-3 text-xs text-gray-400">
                {language === 'zh' 
                  ? '提示: 输入 -99999 结束程序输入，然后点击"加载程序"'
                  : 'Tip: Enter -99999 to end program input, then click "Load Program"'
                }
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm mb-2">
              {t.programLoader.smlProgram}
            </label>
            <textarea
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              disabled={isRunning}
              className="w-full h-64 p-3 bg-gray-900 border border-gray-600 rounded font-mono text-sm text-gray-100 focus:border-blue-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder={language === 'zh' ? 
                "输入SML程序，支持两种格式：\n\n格式1 - 地址 ? 指令：\n00 ? +1007  // 读取A\n01 ? +1008  // 读取B\n02 ? +2007  // 加载A\n03 ? +3008  // 加B\n04 ? +2109  // 存储C\n05 ? +1109  // 写入C\n06 ? +4300  // 停止\n07 ? +0000  // 变量A\n08 ? +0000  // 变量B\n09 ? +0000  // 结果C\n10 ? -99999\n\n格式2 - 顺序输入：\n+1007\n+1008\n+2007\n+3008\n+2109\n+1109\n+4300\n+0000\n+0000\n+0000\n-99999" :
                "Enter SML program, supports two formats:\n\nFormat 1 - Address ? Instruction:\n00 ? +1007  // Read A\n01 ? +1008  // Read B\n02 ? +2007  // Load A\n03 ? +3008  // Add B\n04 ? +2109  // Store C\n05 ? +1109  // Write C\n06 ? +4300  // Halt\n07 ? +0000  // Variable A\n08 ? +0000  // Variable B\n09 ? +0000  // Result C\n10 ? -99999\n\nFormat 2 - Sequential input:\n+1007\n+1008\n+2007\n+3008\n+2109\n+1109\n+4300\n+0000\n+0000\n+0000\n-99999"
              }
            />
          </div>
          
          <button
            type="submit"
            disabled={isRunning || (!program.trim() && !interactiveMode)}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {t.programLoader.loadProgram}
          </button>
        </form>
        )}
        
        {!interactiveMode && (
          <form onSubmit={handleSubmit}>
            <button
              type="submit"
              disabled={isRunning || !program.trim()}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {t.programLoader.loadProgram}
            </button>
          </form>
        )}

        <div className="mt-4 text-xs text-gray-400">
          <div className="mb-2 font-semibold">{t.programLoader.instructionHelp}</div>
          <div className="space-y-1">
            <div><span className="text-yellow-400">00xx</span> - {t.programLoader.opcodes.nop}</div>
            <div><span className="text-yellow-400">10xx</span> - {t.programLoader.opcodes.read}</div>
            <div><span className="text-yellow-400">11xx</span> - {t.programLoader.opcodes.write}</div>
            <div><span className="text-yellow-400">20xx</span> - {t.programLoader.opcodes.load}</div>
            <div><span className="text-yellow-400">21xx</span> - {t.programLoader.opcodes.store}</div>
            <div><span className="text-yellow-400">30xx</span> - {t.programLoader.opcodes.add}</div>
            <div><span className="text-yellow-400">31xx</span> - {t.programLoader.opcodes.subtract}</div>
            <div><span className="text-yellow-400">32xx</span> - {t.programLoader.opcodes.divide}</div>
            <div><span className="text-yellow-400">33xx</span> - {t.programLoader.opcodes.multiply}</div>
            <div><span className="text-yellow-400">40xx</span> - {t.programLoader.opcodes.branch}</div>
            <div><span className="text-yellow-400">41xx</span> - {t.programLoader.opcodes.branchNeg}</div>
            <div><span className="text-yellow-400">42xx</span> - {t.programLoader.opcodes.branchZero}</div>
            <div><span className="text-yellow-400">4300</span> - {t.programLoader.opcodes.halt}</div>
          </div>
        </div>
      </div>
    </div>
  )
};