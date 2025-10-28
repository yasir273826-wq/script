
import React from 'react';

interface ScriptInputProps {
  script: string;
  setScript: (script: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const ScriptInput: React.FC<ScriptInputProps> = ({ script, setScript, onGenerate, isLoading }) => {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <textarea
        value={script}
        onChange={(e) => setScript(e.target.value)}
        placeholder={`Paste your full video script here...\n\nExample:\n\nSCENE 1\nINT. COFFEE SHOP - DAY\n\nSunlight streams through the large window of a bustling cafe. ANNA (20s), looking anxious, sips her latte. Across from her sits MARK (30s), calm and composed.\n\nMARK\n(softly)\nYou came. I wasn't sure you would.\n\nANNA\n(avoiding eye contact)\nWell, you said it was important.`}
        className="w-full h-64 md:h-80 p-4 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 resize-none placeholder-gray-500"
        disabled={isLoading}
      />
      <button
        onClick={onGenerate}
        disabled={isLoading || !script.trim()}
        className="w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900/50 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          'Generate Scene Prompts'
        )}
      </button>
    </div>
  );
};

export default ScriptInput;
