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
              onClick={clearProgram}
              disabled={isRunning}
              className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {t.programLoader.clear}
            </button>
          </div>
        </div>

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
                "输入SML程序，支持注释和文档：\n\n// 程序说明\n// 这是一个加法程序\n\n00 ? +1007  // 读取A\n01 ? +1008  // 读取B\n02 ? +2007  // 加载A\n03 ? +3008  // 加B\n04 ? +2109  // 存储C\n05 ? +1109  // 写入C\n06 ? +4300  // 停止\n07 ? +0000  // 变量A\n08 ? +0000  // 变量B\n09 ? +0000  // 结果C\n100 ? -99999" :
                "Enter SML program with comments and documentation:\n\n// Program description\n// This is an addition program\n\n00 ? +1007  // Read A\n01 ? +1008  // Read B\n02 ? +2007  // Load A\n03 ? +3008  // Add B\n04 ? +2109  // Store C\n05 ? +1109  // Write C\n06 ? +4300  // Halt\n07 ? +0000  // Variable A\n08 ? +0000  // Variable B\n09 ? +0000  // Result C\n100 ? -99999"
              }
            />
          </div>
          
          <button
            type="submit"
            disabled={isRunning || !program.trim()}
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