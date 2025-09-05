import React, { useEffect, useRef } from 'react';
import { Language } from '../hooks/useLanguage';

interface AdvancedOutputDisplayProps {
  output: string[];
  errors: string[];
  language: Language;
}

export const AdvancedOutputDisplay: React.FC<AdvancedOutputDisplayProps> = ({ output, errors, language }) => {
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output, errors]);

  const allMessages = [
    ...output.map(msg => ({ type: 'output', message: msg })),
    ...errors.map(msg => ({ type: 'error', message: msg }))
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-purple-500/30">
      <h3 className="text-xl font-semibold mb-4 text-purple-400">
        {language === 'zh' ? '高级程序输出' : 'Advanced Program Output'}
      </h3>
      
      <div 
        ref={outputRef}
        className="h-64 p-4 bg-gray-900 rounded border border-gray-600 overflow-y-auto font-mono text-sm"
      >
        {allMessages.length === 0 ? (
          <div className="text-gray-500 italic">
            {language === 'zh' ? '等待程序输出...' : 'Waiting for program output...'}
          </div>
        ) : (
          <div className="space-y-1">
            {allMessages.map((item, index) => (
              <div
                key={index}
                className={`${
                  item.type === 'error' 
                    ? 'text-red-400 font-semibold' 
                    : item.message === '\n'
                    ? 'text-gray-600'
                    : 'text-green-400'
                }`}
              >
                {item.message === '\n' ? '↵' : item.message}
              </div>
            ))}
          </div>
        )}
      </div>

      {(output.length > 0 || errors.length > 0) && (
        <div className="mt-2 text-xs text-gray-400">
          {language === 'zh' ? '输出行数' : 'Output lines'}: {output.length} | {language === 'zh' ? '错误数' : 'Errors'}: {errors.length}
        </div>
      )}
    </div>
  );
};