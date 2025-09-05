import React, { useState } from 'react';
import { Play, SkipForward, RotateCcw } from 'lucide-react';
import { Language } from '../hooks/useLanguage';

interface AdvancedExecutionControlProps {
  onStart: () => void;
  onStep: () => void;
  onReset: () => void;
  onInput: (value: number | string) => void;
  isRunning: boolean;
  isHalted: boolean;
  needsInput: boolean;
  inputPrompt?: string;
  programLoaded: boolean;
  language: Language;
}

export const AdvancedExecutionControl: React.FC<AdvancedExecutionControlProps> = ({
  onStart,
  onStep,
  onReset,
  onInput,
  isRunning,
  isHalted,
  needsInput,
  inputPrompt,
  programLoaded,
  language
}) => {
  const [inputValue, setInputValue] = useState('');
  const [autoRun, setAutoRun] = useState(false);

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Determine if input should be treated as string or number
    if (inputPrompt?.toLowerCase().includes('string')) {
      onInput(inputValue);
    } else {
      const numValue = parseFloat(inputValue);
      if (!isNaN(numValue)) {
        onInput(numValue);
      }
    }
    setInputValue('');
  };

  const handleStart = () => {
    setAutoRun(true);
    onStart();
  };

  const handleStep = () => {
    setAutoRun(false);
    onStep();
  };

  const handleReset = () => {
    setAutoRun(false);
    onReset();
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-purple-500/30">
      <h3 className="text-xl font-semibold mb-4 text-purple-400">
        {language === 'zh' ? '高级执行控制' : 'Advanced Execution Control'}
      </h3>
      
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={handleStart}
          disabled={!programLoaded || isHalted || needsInput}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Play size={16} />
          {language === 'zh' ? '运行' : 'Run'}
        </button>
        
        <button
          onClick={handleStep}
          disabled={!programLoaded || isHalted || needsInput}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <SkipForward size={16} />
          {language === 'zh' ? '单步' : 'Step'}
        </button>
        
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          <RotateCcw size={16} />
          {language === 'zh' ? '重置' : 'Reset'}
        </button>
      </div>

      {needsInput && (
        <div className="mb-4 p-4 bg-purple-900 rounded border border-purple-600">
          <h4 className="text-lg font-medium mb-2 text-purple-300">
            {language === 'zh' ? '输入请求' : 'Input Request'}
          </h4>
          <p className="text-purple-200 mb-3">{inputPrompt}</p>
          
          <form onSubmit={handleInputSubmit} className="flex gap-2">
            <input
              type={inputPrompt?.toLowerCase().includes('string') ? 'text' : 'text'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 px-3 py-2 bg-gray-900 border border-gray-600 rounded text-white focus:border-purple-500 focus:outline-none"
              placeholder={
                inputPrompt?.toLowerCase().includes('string') 
                  ? (language === 'zh' ? '输入字符串' : 'Enter string')
                  : (language === 'zh' ? '输入数字' : 'Enter number')
              }
              autoFocus
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {language === 'zh' ? '提交' : 'Submit'}
            </button>
          </form>
        </div>
      )}

      <div className="text-sm text-gray-400">
        <div className="mb-2">
          <span className="font-semibold">{language === 'zh' ? '状态:' : 'Status:'}</span>{' '}
          <span className={`font-bold ${
            isHalted ? 'text-red-400' : 
            needsInput ? 'text-purple-400' : 
            isRunning ? 'text-green-400' : 
            'text-gray-400'
          }`}>
            {isHalted ? (language === 'zh' ? '已停止' : 'Halted') : 
             needsInput ? (language === 'zh' ? '等待输入' : 'Waiting Input') : 
             isRunning ? (autoRun ? (language === 'zh' ? '运行中' : 'Running') : (language === 'zh' ? '已暂停' : 'Paused')) : 
             (language === 'zh' ? '准备就绪' : 'Ready')}
          </span>
        </div>
        <div className="mb-2">
          <span className="font-semibold">{language === 'zh' ? '程序:' : 'Program:'}</span>{' '}
          <span className={`font-bold ${programLoaded ? 'text-green-400' : 'text-red-400'}`}>
            {programLoaded ? (language === 'zh' ? '已加载' : 'Loaded') : (language === 'zh' ? '未加载' : 'Not Loaded')}
          </span>
        </div>
        <div className="text-purple-400 text-xs">
          {language === 'zh' 
            ? '高级功能: 1000字内存 • 浮点运算 • 字符串处理'
            : 'Advanced Features: 1000-word Memory • Float Operations • String Processing'
          }
        </div>
      </div>
    </div>
  );
};