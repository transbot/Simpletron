import React, { useState } from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';

interface ExecutionControlProps {
  onStart: () => void;
  onStep: () => void;
  onReset: () => void;
  onInput: (value: number) => void;
  isRunning: boolean;
  isHalted: boolean;
  needsInput: boolean;
  inputPrompt?: string;
  programLoaded: boolean;
}

export const ExecutionControl: React.FC<ExecutionControlProps> = ({
  onStart,
  onStep,
  onReset,
  onInput,
  isRunning,
  isHalted,
  needsInput,
  inputPrompt,
  programLoaded
}) => {
  const [inputValue, setInputValue] = useState('');
  const [autoRun, setAutoRun] = useState(false);

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseInt(inputValue);
    if (!isNaN(value)) {
      onInput(value);
      setInputValue('');
    }
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
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-blue-400">执行控制</h3>
      
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={handleStart}
          disabled={!programLoaded || isHalted || needsInput}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Play size={16} />
          运行
        </button>
        
        <button
          onClick={handleStep}
          disabled={!programLoaded || isHalted || needsInput}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <SkipForward size={16} />
          单步
        </button>
        
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          <RotateCcw size={16} />
          重置
        </button>
      </div>

      {needsInput && (
        <div className="mb-4 p-4 bg-blue-900 rounded border border-blue-600">
          <h4 className="text-lg font-medium mb-2 text-blue-300">输入请求</h4>
          <p className="text-blue-200 mb-3">{inputPrompt}</p>
          
          <form onSubmit={handleInputSubmit} className="flex gap-2">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              min="-9999"
              max="9999"
              className="flex-1 px-3 py-2 bg-gray-900 border border-gray-600 rounded text-white focus:border-blue-500 focus:outline-none"
              placeholder="输入整数 (-9999 到 9999)"
              autoFocus
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              提交
            </button>
          </form>
        </div>
      )}

      <div className="text-sm text-gray-400">
        <div className="mb-2">
          <span className="font-semibold">状态:</span>{' '}
          <span className={`font-bold ${
            isHalted ? 'text-red-400' : 
            needsInput ? 'text-blue-400' : 
            isRunning ? 'text-green-400' : 
            'text-gray-400'
          }`}>
            {isHalted ? '已停止' : 
             needsInput ? '等待输入' : 
             isRunning ? (autoRun ? '运行中' : '已暂停') : 
             '准备就绪'}
          </span>
        </div>
        <div className="mb-2">
          <span className="font-semibold">程序:</span>{' '}
          <span className={`font-bold ${programLoaded ? 'text-green-400' : 'text-red-400'}`}>
            {programLoaded ? '已加载' : '未加载'}
          </span>
        </div>
      </div>
    </div>
  );
};