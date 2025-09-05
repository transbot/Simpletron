import React, { useEffect, useRef } from 'react';
import { Language } from '../hooks/useLanguage';
import { translations } from '../i18n/translations';

interface OutputDisplayProps {
  output: string[];
  errors: string[];
  language: Language;
}

export const OutputDisplay: React.FC<OutputDisplayProps> = ({ output, errors, language }) => {
  const t = translations[language];
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
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-blue-400">{t.output.title}</h3>
      
      <div 
        ref={outputRef}
        className="h-64 p-4 bg-gray-900 rounded border border-gray-600 overflow-y-auto font-mono text-sm"
      >
        {allMessages.length === 0 ? (
          <div className="text-gray-500 italic">{t.output.waitingOutput}</div>
        ) : (
          <div className="space-y-1">
            {allMessages.map((item, index) => (
              <div
                key={index}
                className={`${
                  item.type === 'error' 
                    ? 'text-red-400 font-semibold' 
                    : 'text-green-400'
                }`}
              >
                {item.message}
              </div>
            ))}
          </div>
        )}
      </div>

      {(output.length > 0 || errors.length > 0) && (
        <div className="mt-2 text-xs text-gray-400">
          {t.output.outputLines}: {output.length} | {t.output.errorCount}: {errors.length}
        </div>
      )}
    </div>
  );
};