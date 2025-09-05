import React, { useState, useEffect, useCallback } from 'react';
import { Monitor, Cpu, Code, ArrowLeft, Zap } from 'lucide-react';
import { AdvancedSimpletronVM } from '../utils/advancedSimpletron';
import { Language } from '../hooks/useLanguage';
import { LanguageToggle } from './LanguageToggle';
import { AdvancedProgramLoader } from './AdvancedProgramLoader';
import { AdvancedExecutionControl } from './AdvancedExecutionControl';
import { AdvancedOutputDisplay } from './AdvancedOutputDisplay';
import { AdvancedMemoryDump } from './AdvancedMemoryDump';
import { AdvancedSimpleTronState } from '../types/advancedSimpletron';

interface AdvancedSimpletronProps {
  onBack: () => void;
  language: Language;
  toggleLanguage: () => void;
}

const AdvancedSimpletron: React.FC<AdvancedSimpletronProps> = ({ onBack, language, toggleLanguage }) => {
  const [simpletron] = useState(() => new AdvancedSimpletronVM());
  const [state, setState] = useState<AdvancedSimpleTronState>(simpletron.getState());
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
      addError('*** Advanced Simpletron execution abnormally terminated ***');
      setAutoRun(false);
    } else if (result.needsInput) {
      setInputPrompt(result.inputPrompt || '');
    }
    
    updateState();

    if (result.success && !result.needsInput && !simpletron.getState().isHalted && autoRun) {
      setTimeout(executeStep, 300);
    }
  }, [programLoaded, state.isHalted, needsInput, simpletron, addError, updateState, autoRun]);

  useEffect(() => {
    if (autoRun && !state.isHalted && !needsInput && programLoaded) {
      const timer = setTimeout(executeStep, 300);
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
      addError(result.error || 'Program loading failed');
    }
  };

  const handleStartExecution = () => {
    if (!programLoaded) return;
    
    simpletron.startExecution();
    setAutoRun(true);
    updateState();
    
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

  const handleInput = (value: number | string) => {
    const result = simpletron.provideInput(value);
    if (result.success) {
      setNeedsInput(false);
      setInputPrompt('');
      updateState();
      
      if (autoRun) {
        setTimeout(executeStep, 100);
      }
    } else {
      addError(result.error || 'Input failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-800 to-blue-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              <ArrowLeft size={16} />
              <span>{language === 'zh' ? '返回基础版' : 'Back to Basic'}</span>
            </button>
            <LanguageToggle language={language} onToggle={toggleLanguage} />
          </div>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="text-purple-400" size={48} />
            <h1 className="text-4xl font-bold text-white">
              {language === 'zh' ? 'Advanced Simpletron 虚拟机' : 'Advanced Simpletron Virtual Machine'}
            </h1>
          </div>
          
          <p className="text-gray-300 text-lg mb-6">
            {language === 'zh' 
              ? '扩展功能：1000字内存 • 浮点运算 • 字符串处理 • 十六进制指令 • 求余/求幂运算'
              : 'Extended Features: 1000-word Memory • Float Operations • String Processing • Hex Instructions • Modulo/Power Operations'
            }
          </p>

          <div className="bg-gray-800 rounded-lg p-4 text-left max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-purple-400 mb-3 flex items-center gap-2">
              <Code size={20} />
              {language === 'zh' ? '高级功能说明' : 'Advanced Features'}
            </h2>
            <div className="text-gray-300 text-sm space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-blue-400 mb-1">
                    {language === 'zh' ? '扩展内存与运算' : 'Extended Memory & Operations'}
                  </p>
                  <ul className="space-y-1 text-xs">
                    <li>• {language === 'zh' ? '1000字内存空间 (00-999)' : '1000-word memory (00-999)'}</li>
                    <li>• {language === 'zh' ? '浮点数运算支持' : 'Floating-point operations'}</li>
                    <li>• {language === 'zh' ? '求余运算 (34xx)' : 'Modulo operation (34xx)'}</li>
                    <li>• {language === 'zh' ? '求幂运算 (35xx)' : 'Power operation (35xx)'}</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-green-400 mb-1">
                    {language === 'zh' ? '字符串与格式' : 'Strings & Formatting'}
                  </p>
                  <ul className="space-y-1 text-xs">
                    <li>• {language === 'zh' ? '字符串输入/输出 (12xx/13xx)' : 'String I/O (12xx/13xx)'}</li>
                    <li>• {language === 'zh' ? '换行符输出 (14xx)' : 'Newline output (14xx)'}</li>
                    <li>• {language === 'zh' ? '十六进制指令格式' : 'Hexadecimal instruction format'}</li>
                    <li>• {language === 'zh' ? 'ASCII字符编码' : 'ASCII character encoding'}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left: Program Loader and Execution Control */}
          <div className="space-y-6">
            <AdvancedProgramLoader 
              onLoad={handleLoadProgram}
              isRunning={state.isRunning}
              language={language}
            />
            
            <AdvancedExecutionControl
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

          {/* Right: Output Display */}
          <div>
            <AdvancedOutputDisplay 
              output={output}
              errors={errors}
              language={language}
            />
          </div>
        </div>

        {/* Bottom: Memory Dump */}
        <div className="mt-8">
          <AdvancedMemoryDump state={state} language={language} />
        </div>

        {/* Error Display */}
        {errors.length > 0 && (
          <div className="mt-6 bg-red-900 border border-red-600 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-red-300 mb-2 flex items-center gap-2">
              <Cpu size={20} />
              {language === 'zh' ? '系统错误' : 'System Error'}
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
                {language === 'zh' 
                  ? `还有 ${errors.length - 3} 个错误`
                  : `... and ${errors.length - 3} more errors`
                }
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedSimpletron;