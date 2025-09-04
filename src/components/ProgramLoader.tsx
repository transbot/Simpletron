import React, { useState } from 'react';
import { EXAMPLE_PROGRAMS } from '../types/simpletron';

interface ProgramLoaderProps {
  onLoad: (program: string) => void;
  isRunning: boolean;
}

export const ProgramLoader: React.FC<ProgramLoaderProps> = ({ onLoad, isRunning }) => {
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
        <h3 className="text-xl font-semibold mb-4 text-blue-400">程序加载器</h3>
        
        <div className="mb-4">
          <div className="mb-3">
            <span className="text-gray-300 text-sm">示例程序:</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              type="button"
              onClick={() => loadExampleProgram('addition')}
              disabled={isRunning}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              加法程序
            </button>
            <button
              type="button"
              onClick={() => loadExampleProgram('comparison')}
              disabled={isRunning}
              className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              比较程序
            </button>
            <button
              type="button"
              onClick={() => loadExampleProgram('findMax')}
              disabled={isRunning}
              className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              查找最大值
            </button>
            <button
              type="button"
              onClick={clearProgram}
              disabled={isRunning}
              className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              清除
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm mb-2">
              SML程序 (以-99999结束):
            </label>
            <textarea
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              disabled={isRunning}
              className="w-full h-64 p-3 bg-gray-900 border border-gray-600 rounded font-mono text-sm text-gray-100 focus:border-blue-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="输入SML指令，例如：&#10;+1007  // 读取A&#10;+1008  // 读取B&#10;+2007  // 加载A&#10;+3008  // 加B&#10;+2109  // 存储C&#10;+1109  // 写入C&#10;+4300  // 停止&#10;+0000  // 变量A&#10;+0000  // 变量B&#10;+0000  // 结果C&#10;-99999"
            />
          </div>
          
          <button
            type="submit"
            disabled={isRunning || !program.trim()}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            加载程序
          </button>
        </form>

        <div className="mt-4 text-xs text-gray-400">
          <div className="mb-2 font-semibold">SML指令说明:</div>
          <div className="space-y-1">
            <div><span className="text-yellow-400">10xx</span> - 读取到地址xx</div>
            <div><span className="text-yellow-400">11xx</span> - 写入地址xx的值</div>
            <div><span className="text-yellow-400">20xx</span> - 加载地址xx到累加器</div>
            <div><span className="text-yellow-400">21xx</span> - 存储累加器到地址xx</div>
            <div><span className="text-yellow-400">30xx</span> - 累加器 += 地址xx</div>
            <div><span className="text-yellow-400">31xx</span> - 累加器 -= 地址xx</div>
            <div><span className="text-yellow-400">32xx</span> - 累加器 /= 地址xx</div>
            <div><span className="text-yellow-400">33xx</span> - 累加器 *= 地址xx</div>
            <div><span className="text-yellow-400">40xx</span> - 跳转到地址xx</div>
            <div><span className="text-yellow-400">41xx</span> - 如果累加器&lt;0跳转到地址xx</div>
            <div><span className="text-yellow-400">42xx</span> - 如果累加器=0跳转到地址xx</div>
            <div><span className="text-yellow-400">4300</span> - 停止执行</div>
          </div>
        </div>
      </div>
    </div>
  )
};