import React from 'react';
import { AdvancedSimpleTronState } from '../types/advancedSimpletron';
import { Language } from '../hooks/useLanguage';

interface AdvancedMemoryDumpProps {
  state: AdvancedSimpleTronState;
  language: Language;
}

export const AdvancedMemoryDump: React.FC<AdvancedMemoryDumpProps> = ({ state, language }) => {
  const formatWord = (word: number | string): string => {
    if (typeof word === 'string') {
      if (word.startsWith('0x')) {
        return word.toUpperCase();
      }
      return word;
    }
    
    if (state.floatMode && word % 1 !== 0) {
      return word.toFixed(2);
    }
    
    const sign = word >= 0 ? '+' : '-';
    const absValue = Math.abs(Math.floor(word)).toString().padStart(4, '0');
    return sign + absValue;
  };

  // Show first 200 addresses (20 rows x 10 columns)
  const memoryRows = 100; // Show all 1000 addresses (100 rows x 10 columns)

  return (
    <div className="bg-gray-900 rounded-lg p-6 font-mono text-sm border border-purple-500/30">
      <h3 className="text-xl font-semibold mb-4 text-purple-400">
        {language === 'zh' ? '高级系统转储' : 'Advanced System Dump'}
      </h3>
      
      <div className="mb-6">
        <h4 className="text-lg font-medium mb-3 text-green-400">
          {language === 'zh' ? '寄存器:' : 'Registers:'}
        </h4>
        <div className="space-y-1 text-gray-300">
          <div className="flex justify-between">
            <span className="text-yellow-400">accumulator:</span>
            <span className="text-white font-bold">{formatWord(state.accumulator)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-yellow-400">instructionCounter:</span>
            <span className="text-white font-bold">{state.instructionCounter.toString().padStart(3, '0')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-yellow-400">instructionRegister:</span>
            <span className="text-white font-bold">{formatWord(state.instructionRegister)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-yellow-400">operationCode:</span>
            <span className="text-white font-bold">{state.operationCode.toString().padStart(2, '0')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-yellow-400">operand:</span>
            <span className="text-white font-bold">{state.operand.toString().padStart(3, '0')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-yellow-400">floatMode:</span>
            <span className="text-white font-bold">{state.floatMode ? 'ON' : 'OFF'}</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-medium mb-3 text-green-400">
          {language === 'zh' ? '内存 (地址 000-999):' : 'Memory (Addresses 000-999):'}
        </h4>
        <div className="text-gray-300 text-xs overflow-x-auto">
          {/* Header row */}
          <div className="flex mb-2">
            <div className="w-12 text-yellow-400 text-center font-bold">Addr</div>
            {Array.from({length: 10}, (_, i) => (
              <div key={i} className="w-12 text-center text-yellow-400 font-bold">
                {i}
              </div>
            ))}
          </div>
          
          {/* Memory rows */}
          {Array.from({length: memoryRows}, (_, row) => (
            <div key={row} className="flex mb-1">
              <div className="w-12 text-yellow-400 font-bold text-center">
                {(row * 10).toString().padStart(3, '0')}
              </div>
              {Array.from({length: 10}, (_, col) => {
                const address = row * 10 + col;
                const isCurrentInstruction = address === state.instructionCounter && state.isRunning;
                const hasValue = state.memory[address] !== 0;
                const value = state.memory[address];
                
                return (
                  <div 
                    key={col} 
                    className={`w-12 text-center text-xs ${
                      isCurrentInstruction 
                        ? 'bg-purple-600 text-white font-bold' 
                        : hasValue 
                        ? 'text-cyan-300 font-semibold' 
                        : 'text-gray-500'
                    }`}
                  >
                    {typeof value === 'string' && value.startsWith('0x') 
                      ? value.substring(2).toUpperCase().padStart(4, '0')
                      : formatWord(value)
                    }
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-xs text-gray-400">
          {language === 'zh' 
            ? '显示全部1000个内存地址 (000-999)。当前指令地址用紫色高亮显示。'
            : 'Showing all 1000 memory addresses (000-999). Current instruction address highlighted in purple.'
          }
        </div>
      </div>
    </div>
  );
};