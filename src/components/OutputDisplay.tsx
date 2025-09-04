import React, { useEffect, useRef } from 'react';

interface OutputDisplayProps {
  output: string[];
  errors: string[];
}

export const OutputDisplay: React.FC<OutputDisplayProps> = ({ output, errors }) => {
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
      <h3 className="text-xl font-semibold mb-4 text-blue-400">程序输出</h3>
      
      <div 
        ref={outputRef}
        className="h-64 p-4 bg-gray-900 rounded border border-gray-600 overflow-y-auto font-mono text-sm"
      >
        {allMessages.length === 0 ? (
          <div className="text-gray-500 italic">等待程序输出...</div>
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
          输出行数: {output.length} | 错误数: {errors.length}
        </div>
      )}
    </div>
  );
};