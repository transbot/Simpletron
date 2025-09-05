import React, { useState } from 'react';
import { getAdvancedExamplePrograms } from '../types/advancedSimpletron';
import { Language } from '../hooks/useLanguage';

interface AdvancedProgramLoaderProps {
  onLoad: (program: string) => void;
  isRunning: boolean;
  language: Language;
}

export const AdvancedProgramLoader: React.FC<AdvancedProgramLoaderProps> = ({ onLoad, isRunning, language }) => {
  const EXAMPLE_PROGRAMS = getAdvancedExamplePrograms(language);
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
    <div className="bg-gray-800 rounded-lg p-6 border border-purple-500/30">
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-4 text-purple-400">
          {language === 'zh' ? '高级程序加载器' : 'Advanced Program Loader'}
        </h3>
        
        <div className="mb-4">
          <div className="mb-3">
            <span className="text-gray-300 text-sm">
              {language === 'zh' ? '示例程序:' : 'Example Programs:'}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              type="button"
              onClick={() => loadExampleProgram('stringDemo')}
              disabled={isRunning}
              className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {language === 'zh' ? '字符串演示' : 'String Demo'}
            </button>
            <button
              type="button"
              onClick={() => loadExampleProgram('floatMath')}
              disabled={isRunning}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {language === 'zh' ? '浮点运算' : 'Float Math'}
            </button>
            <button
              type="button"
              onClick={() => loadExampleProgram('powerMod')}
              disabled={isRunning}
              className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {language === 'zh' ? '求幂运算' : 'Power'}
            </button>
            <button
              type="button"
              onClick={() => loadExampleProgram('modulo')}
              disabled={isRunning}
              className="px-3 py-1 bg-orange-600 text-white rounded text-sm hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {language === 'zh' ? '求余运算' : 'Modulo'}
            </button>
            <button
              type="button"
              onClick={clearProgram}
              disabled={isRunning}
              className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {language === 'zh' ? '清除' : 'Clear'}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm mb-2">
              {language === 'zh' ? '高级SML程序 (支持十六进制格式):' : 'Advanced SML Program (Hex format supported):'}
            </label>
            <textarea
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              disabled={isRunning}
              className="w-full h-64 p-3 bg-gray-900 border border-gray-600 rounded font-mono text-sm text-gray-100 focus:border-purple-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder={language === 'zh' ? 
                "输入高级SML程序，支持十六进制格式：\n\n// 字符串处理示例\n00 ? 0x0C63  // 读取字符串到地址99\n01 ? 0x0D63  // 输出字符串\n02 ? 0x0E00  // 输出换行符\n03 ? 0x2B00  // 停止程序\n99 ? 0x0000  // 字符串存储区\n100 ? -99999" :
                "Enter Advanced SML program with hex format support:\n\n// String processing example\n00 ? 0x0C63  // Read string to address 99\n01 ? 0x0D63  // Write string\n02 ? 0x0E00  // Write newline\n03 ? 0x2B00  // Halt program\n99 ? 0x0000  // String storage area\n100 ? -99999"
              }
            />
          </div>
          
          <button
            type="submit"
            disabled={isRunning || !program.trim()}
            className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {language === 'zh' ? '加载程序' : 'Load Program'}
          </button>
        </form>

        <div className="mt-4 text-xs text-gray-400">
          <div className="mb-2 font-semibold">
            {language === 'zh' ? '高级SML指令参考:' : 'Advanced SML Instruction Reference:'}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <div className="text-yellow-400 font-semibold mb-1">
                {language === 'zh' ? '基础指令' : 'Basic Instructions'}
              </div>
              <div className="space-y-1 text-xs">
                <div><span className="text-yellow-400">10xx</span> - {language === 'zh' ? '读取整数' : 'Read integer'}</div>
                <div><span className="text-yellow-400">11xx</span> - {language === 'zh' ? '写入整数' : 'Write integer'}</div>
                <div><span className="text-yellow-400">20xx</span> - {language === 'zh' ? '加载到累加器' : 'Load to accumulator'}</div>
                <div><span className="text-yellow-400">21xx</span> - {language === 'zh' ? '存储累加器' : 'Store accumulator'}</div>
              </div>
            </div>
            <div>
              <div className="text-green-400 font-semibold mb-1">
                {language === 'zh' ? '扩展指令' : 'Extended Instructions'}
              </div>
              <div className="space-y-1 text-xs">
                <div><span className="text-green-400">12xx</span> - {language === 'zh' ? '读取字符串' : 'Read string'}</div>
                <div><span className="text-green-400">13xx</span> - {language === 'zh' ? '写入字符串' : 'Write string'}</div>
                <div><span className="text-green-400">14xx</span> - {language === 'zh' ? '输出换行符' : 'Write newline'}</div>
                <div><span className="text-green-400">34xx</span> - {language === 'zh' ? '求余运算' : 'Modulo operation'}</div>
                <div><span className="text-green-400">35xx</span> - {language === 'zh' ? '求幂运算' : 'Power operation'}</div>
              </div>
            </div>
          </div>
          <div className="mt-2 text-purple-400">
            {language === 'zh' 
              ? '支持十六进制格式: 0x0A63 = 十进制 2659'
              : 'Hex format supported: 0x0A63 = decimal 2659'
            }
          </div>
        </div>
      </div>
    </div>
  );
};