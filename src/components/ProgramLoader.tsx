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
  const [isInteractiveMode, setIsInteractiveMode] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(0);
  const [interactiveInstructions, setInteractiveInstructions] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');

  const loadExampleProgram = (programName: keyof typeof EXAMPLE_PROGRAMS) => {
    const exampleProgram = EXAMPLE_PROGRAMS[programName];
    const programText = exampleProgram.join('\n');
    
    setProgram(programText);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoad(program);
  };

  const clearProgram = () => {
    setProgram('');
    setIsInteractiveMode(false);
    setCurrentAddress(0);
    setInteractiveInstructions([]);
    setCurrentInput('');
  };

  const startInteractiveInput = () => {
    setIsInteractiveMode(true);
    setCurrentAddress(0);
    setInteractiveInstructions([]);
    setCurrentInput('');
    setProgram('');
  };

  const handleInteractiveInput = (e: React.FormEvent) => {
    e.preventDefault();
    
    const instruction = currentInput.trim();
    if (!instruction) return;
    
    // 验证指令格式
    const instructionNum = parseInt(instruction);
    if (isNaN(instructionNum)) {
      alert(language === 'zh' ? '请输入有效的数字指令' : 'Please enter a valid numeric instruction');
      return;
    }
    
    // 验证指令范围
    if (instructionNum < -99999 || instructionNum > 99999) {
      alert(language === 'zh' ? '指令必须在-99999到99999范围内' : 'Instruction must be between -99999 and 99999');
      return;
    }
    
    // 添加指令到列表
    const formattedInstruction = `${currentAddress.toString().padStart(2, '0')} ? ${instruction}`;
    const newInstructions = [...interactiveInstructions, formattedInstruction];
    setInteractiveInstructions(newInstructions);
    
    // 检查是否是结束指令
    if (instructionNum === -99999) {
      // 结束交互输入，生成完整程序
      const fullProgram = newInstructions.join('\n');
      setProgram(fullProgram);
      setIsInteractiveMode(false);
      setCurrentAddress(0);
      setInteractiveInstructions([]);
      setCurrentInput('');
      return;
    }
    
    // 移动到下一个地址
    setCurrentAddress(prev => prev + 1);
    setCurrentInput('');
  };

  const exitInteractiveMode = () => {
    if (interactiveInstructions.length > 0) {
      const fullProgram = interactiveInstructions.join('\n');
      setProgram(fullProgram);
    }
    setIsInteractiveMode(false);
    setCurrentAddress(0);
    setInteractiveInstructions([]);
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
              onClick={startInteractiveInput}
              disabled={isRunning}
              className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {language === 'zh' ? '交互输入' : 'Interactive Input'}
            </button>
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
              onClick={clearProgram}
              disabled={isRunning}
              className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {t.programLoader.clear}
            </button>
          </div>
        </div>

        {isInteractiveMode && (
          <div className="mb-4 p-4 bg-blue-900 rounded border border-blue-600">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-lg font-medium text-blue-300">
                {language === 'zh' ? '交互输入模式' : 'Interactive Input Mode'}
              </h4>
              <button
                onClick={exitInteractiveMode}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
              >
                {language === 'zh' ? '退出' : 'Exit'}
              </button>
            </div>
            
            <div className="mb-3">
              <div className="text-blue-200 text-sm mb-2">
                {language === 'zh' ? '当前地址:' : 'Current Address:'}
              </div>
              <div className="font-mono text-lg text-yellow-300 mb-2">
                {currentAddress.toString().padStart(2, '0')} ?
              </div>
              
              <form onSubmit={handleInteractiveInput} className="flex gap-2">
                <input
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-900 border border-gray-600 rounded font-mono text-white focus:border-blue-500 focus:outline-none"
                  placeholder={language === 'zh' ? '输入指令 (如: +1007)' : 'Enter instruction (e.g., +1007)'}
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!currentInput.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {language === 'zh' ? '确认' : 'Enter'}
                </button>
              </form>
            </div>
            
            {interactiveInstructions.length > 0 && (
              <div className="mt-3">
                <div className="text-blue-200 text-sm mb-2">
                  {language === 'zh' ? '已输入的指令:' : 'Entered Instructions:'}
                </div>
                <div className="bg-gray-900 rounded p-2 max-h-32 overflow-y-auto">
                  {interactiveInstructions.map((instruction, index) => (
                    <div key={index} className="font-mono text-xs text-gray-300">
                      {instruction}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-3 text-xs text-blue-300">
              {language === 'zh' 
                ? '提示: 输入-99999结束程序输入' 
                : 'Tip: Enter -99999 to end program input'
              }
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm mb-2">
              {t.programLoader.smlProgram}
            </label>
            <textarea
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              disabled={isRunning || isInteractiveMode}
              className="w-full h-64 p-3 bg-gray-900 border border-gray-600 rounded font-mono text-sm text-gray-100 focus:border-blue-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder={language === 'zh' ? 
                "输入SML程序，支持注释和文档：\n\n// 程序说明\n// 这是一个加法程序\n\n00 ? +1007  // 读取A\n01 ? +1008  // 读取B\n02 ? +2007  // 加载A\n03 ? +3008  // 加B\n04 ? +2109  // 存储C\n05 ? +1109  // 写入C\n06 ? +4300  // 停止\n07 ? +0000  // 变量A\n08 ? +0000  // 变量B\n09 ? +0000  // 结果C\n100 ? -99999" :
                "Enter SML program with comments and documentation:\n\n// Program description\n// This is an addition program\n\n00 ? +1007  // Read A\n01 ? +1008  // Read B\n02 ? +2007  // Load A\n03 ? +3008  // Add B\n04 ? +2109  // Store C\n05 ? +1109  // Write C\n06 ? +4300  // Halt\n07 ? +0000  // Variable A\n08 ? +0000  // Variable B\n09 ? +0000  // Result C\n100 ? -99999"
              }
            />
          </div>
          
          <button
            type="submit"
            disabled={isRunning || !program.trim() || isInteractiveMode}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {t.programLoader.loadProgram}
          </button>
        </form>

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