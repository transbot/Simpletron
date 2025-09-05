import React from 'react';
import { SimpletronState } from '../types/simpletron';
import { Language } from '../hooks/useLanguage';
import { translations } from '../i18n/translations';

interface MemoryDumpProps {
  state: SimpletronState;
  language: Language;
}

export const MemoryDump: React.FC<MemoryDumpProps> = ({ state, language }) => {
  const t = translations[language];
  const formatWord = (word: number): string => {
    const sign = word >= 0 ? '+' : '';
    return sign + word.toString().padStart(4, '0');
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 font-mono text-sm">
      <h3 className="text-xl font-semibold mb-4 text-blue-400">{t.memoryDump.title}</h3>
      
      <div className="mb-6">
        <h4 className="text-lg font-medium mb-3 text-green-400">{t.memoryDump.registers}</h4>
        <div className="space-y-1 text-gray-300">
          <div className="flex justify-between">
            <span className="text-yellow-400">{t.memoryDump.registerNames.accumulator}:</span>
            <span className="text-white font-bold">{formatWord(state.accumulator)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-yellow-400">{t.memoryDump.registerNames.instructionCounter}:</span>
            <span className="text-white font-bold">{state.instructionCounter.toString().padStart(2, '0')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-yellow-400">{t.memoryDump.registerNames.instructionRegister}:</span>
            <span className="text-white font-bold">{formatWord(state.instructionRegister)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-yellow-400">{t.memoryDump.registerNames.operationCode}:</span>
            <span className="text-white font-bold">{state.operationCode.toString().padStart(2, '0')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-yellow-400">{t.memoryDump.registerNames.operand}:</span>
            <span className="text-white font-bold">{state.operand.toString().padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-medium mb-3 text-green-400">内存:</h4>
        <div className="text-gray-300 text-xs overflow-x-auto">
          {/* 标题行 */}
          <div className="flex mb-2">
            <div className="w-8 text-yellow-400"></div>
            {Array.from({length: 10}, (_, i) => (
              <div key={i} className="w-12 text-center text-yellow-400 font-bold">
                {i}
              </div>
            ))}
          </div>
          
          {/* 内存行 */}
          {Array.from({length: 10}, (_, row) => (
            <div key={row} className="flex mb-1">
              <div className="w-8 text-yellow-400 font-bold">
                {(row * 10).toString().padStart(2, '0')}
              </div>
              {Array.from({length: 10}, (_, col) => {
                const address = row * 10 + col;
                const isCurrentInstruction = address === state.instructionCounter && state.isRunning;
                const hasValue = state.memory[address] !== 0;
                
                return (
                  <div 
                    key={col} 
                    className={`w-12 text-center ${
                      isCurrentInstruction 
                        ? 'bg-red-600 text-white font-bold' 
                        : hasValue 
                        ? 'text-cyan-300 font-semibold' 
                        : 'text-gray-500'
                    }`}
                  >
                    {formatWord(state.memory[address])}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};