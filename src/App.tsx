import React, { useState, useEffect, useCallback } from 'react';
import { Monitor, Cpu, Code } from 'lucide-react';
import { Simpletron } from './utils/simpletron';
import { useLanguage } from './hooks/useLanguage';
import { translations } from './i18n/translations';
import { LanguageToggle } from './components/LanguageToggle';
import { ProgramLoader } from './components/ProgramLoader';
import { ExecutionControl } from './components/ExecutionControl';
import { OutputDisplay } from './components/OutputDisplay';
import { MemoryDump } from './components/MemoryDump';
import { SimpletronState } from './types/simpletron';

function App() {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];
  const [simpletron] = useState(() => new Simpletron());
  const [state, setState] = useState<SimpletronState>(simpletron.getState());
  const [output, setOutput] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [programLoaded, setProgramLoaded] = useState(false);
  const [needsInput, setNeedsInput] = useState(false);
  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [autoRun, setAutoRun] = useState(false);

  const updateState = useCallback(() => {
    setState(simpletron.getState());
    setOutput(simpletron.getOutput());
    setNeedsInput(simpletron.isPendingInput());
  }, [simpletron]);

  const addError = useCallback((error: string) => {
    setErrors(prev => [...prev, error]);
  }, []);

  const executeStep = useCallback(() => {
    if (!programLoaded || state.isHalted || needsInput) return;

    const result = simpletron.executeInstruction();
    
    if (!result.success && result.error) {
      addError(result.error);
      addError(t.errors.executionTerminated);
      setAutoRun(false);
    } else if (result.needsInput) {
      setInputPrompt(result.inputPrompt || '');
    }
    
    updateState();

    if (result.success && !result.needsInput && !simpletron.getState().isHalted && autoRun) {
      setTimeout(executeStep, 500); // 500ms延迟用于自动执行
    }
  }, [programLoaded, state.isHalted, needsInput, simpletron, addError, updateState, autoRun]);

  useEffect(() => {
    if (autoRun && !state.isHalted && !needsInput && programLoaded) {
      const timer = setTimeout(executeStep, 500);
      return () => clearTimeout(timer);
    }
  }, [autoRun, state.isHalted, needsInput, programLoaded, executeStep]);

  const handleLoadProgram = (program: string) => {
    const result = simpletron.loadProgramFromInput(program);
    if (result.success) {
      setProgramLoaded(true);
      setErrors([]);
      setOutput([]);
      setAutoRun(false);
      updateState();
    } else {
      addError(result.error || '程序加载失败');
    }
  };

  const handleStartExecution = () => {
    if (!programLoaded) return;
    
    simpletron.startExecution();
    setAutoRun(true);
    updateState();
    
    // 开始自动执行
    setTimeout(executeStep, 100);
  };

  const handleStepExecution = () => {
    setAutoRun(false);
    executeStep();
  };

  const handleReset = () => {
    simpletron.reset();
    setProgramLoaded(false);
    setErrors([]);
    setOutput([]);
    setNeedsInput(false);
    setInputPrompt('');
    setAutoRun(false);
    updateState();
  };

  const handleInput = (value: number) => {
    const result = simpletron.provideInput(value);
    if (result.success) {
      setNeedsInput(false);
      setInputPrompt('');
      updateState();
      
      // 继续自动执行（如果处于自动模式）
      if (autoRun) {
        setTimeout(executeStep, 100);
      }
    } else {
      addError(result.error || '输入失败');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* 标题 */}
        <div className="text-center mb-8">
          <div className="flex justify-end mb-4">
            <LanguageToggle language={language} onToggle={toggleLanguage} />
          </div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Monitor className="text-blue-400" size={48} />
            <h1 className="text-4xl font-bold text-white">{t.title}</h1>
          </div>
          <p className="text-gray-300 text-lg">
            {t.subtitle}
          </p>
          
          <div className="mt-6 bg-gray-800 rounded-lg p-4 text-left max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-blue-400 mb-3 flex items-center gap-2">
              <Code size={20} />
              {t.welcome}
            </h2>
            <div className="text-gray-300 text-sm space-y-1">
              <p>{t.instructions.enterOneInstruction}</p>
              <p>{t.instructions.showMemoryAddress}</p>
              <p>{t.instructions.enterWordForAddress}</p>
              <p>{t.instructions.endWithNegative}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 左侧：程序加载和执行控制 */}
          <div className="space-y-6">
            <ProgramLoader 
              onLoad={handleLoadProgram}
              isRunning={state.isRunning}
              language={language}
            />
            
            <ExecutionControl
              onStart={handleStartExecution}
              onStep={handleStepExecution}
              onReset={handleReset}
              onInput={handleInput}
              isRunning={state.isRunning}
              isHalted={state.isHalted}
              needsInput={needsInput}
              inputPrompt={inputPrompt}
              programLoaded={programLoaded}
              language={language}
            />
          </div>

          {/* 右侧：输出显示 */}
          <div>
            <OutputDisplay 
              output={output}
              errors={errors}
              language={language}
            />
          </div>
        </div>

        {/* 底部：内存转储 */}
        <div className="mt-8">
          <MemoryDump state={state} language={language} />
        </div>

        {/* 寄存器转储 - 当程序停止时显示 */}
        {(state.isHalted || errors.length > 0) && (
          <div className="mt-6 bg-gray-800 border border-gray-600 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-400 mb-3">{t.memoryDump.registers}</h3>
            <div className="font-mono text-sm text-gray-300 space-y-1">
              <div className="flex justify-between">
                <span>{t.memoryDump.registerNames.accumulator}</span>
                <span className="text-white font-bold">
                  {(state.accumulator >= 0 ? '+' : '') + state.accumulator.toString().padStart(4, '0')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{t.memoryDump.registerNames.instructionCounter}</span>
                <span className="text-white font-bold">
                  {state.instructionCounter.toString().padStart(2, '0')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{t.memoryDump.registerNames.instructionRegister}</span>
                <span className="text-white font-bold">
                  {(state.instructionRegister >= 0 ? '+' : '') + state.instructionRegister.toString().padStart(4, '0')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{t.memoryDump.registerNames.operationCode}</span>
                <span className="text-white font-bold">
                  {state.operationCode.toString().padStart(2, '0')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{t.memoryDump.registerNames.operand}</span>
                <span className="text-white font-bold">
                  {state.operand.toString().padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 错误显示 */}
        {errors.length > 0 && (
          <div className="mt-6 bg-red-900 border border-red-600 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-red-300 mb-2 flex items-center gap-2">
              <Cpu size={20} />
              {t.errors.systemError}
            </h3>
            <div className="space-y-1">
              {errors.slice(-3).map((error, index) => (
                <div key={index} className="text-red-200 font-mono text-sm">
                  {error}
                </div>
              ))}
            </div>
            {errors.length > 3 && (
              <div className="text-red-400 text-xs mt-2">
                {t.errors.moreErrors.replace('{count}', (errors.length - 3).toString())}
              </div>
            )}
            
            {(errors.some(e => e.includes('异常终止')) || state.isHalted) && (
              <div className="mt-4 p-3 bg-gray-800 rounded border text-xs">
                <div className="text-gray-300 mb-2 font-semibold">{t.errors.completeDump}</div>
                <pre className="text-gray-400 whitespace-pre-wrap">
                  {simpletron.generateDump(language)}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;