import React from 'react';
import { Languages } from 'lucide-react';
import { Language } from '../hooks/useLanguage';

interface LanguageToggleProps {
  language: Language;
  onToggle: () => void;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ language, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
      title={language === 'zh' ? '切换到英文' : 'Switch to Chinese'}
    >
      <Languages size={16} />
      <span className="text-sm font-medium">
        {language === 'zh' ? '中文' : 'EN'}
      </span>
    </button>
  );
};