
import React, { useState } from 'react';
import { ScriptBreakdown } from '../types';

interface JsonOutputProps {
  data: ScriptBreakdown;
}

const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);


const JsonOutput: React.FC<JsonOutputProps> = ({ data }) => {
    const [copyText, setCopyText] = useState('Copy');
    const [downloadText, setDownloadText] = useState('Download JSON');

    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(data, null, 2));
        setCopyText('Copied!');
        setTimeout(() => setCopyText('Copy'), 2000);
    };

    const handleDownload = () => {
        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "scene_breakdown.json";
        link.click();
        setDownloadText('Downloaded!');
        setTimeout(() => setDownloadText('Download JSON'), 2000);
    };

    return (
        <div className="w-full mt-8 bg-gray-800/50 border border-gray-700 rounded-lg shadow-xl relative animate-fade-in">
            <div className="flex justify-between items-center p-4 bg-gray-800 rounded-t-lg border-b border-gray-700">
                <h3 className="font-semibold text-lg text-gray-200">Generated Breakdown</h3>
                <div className="flex gap-2">
                    <button onClick={handleCopy} className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-700 hover:bg-gray-600 rounded-md transition-all duration-200">
                        <CopyIcon /> {copyText}
                    </button>
                    <button onClick={handleDownload} className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-700 hover:bg-gray-600 rounded-md transition-all duration-200">
                        <DownloadIcon /> {downloadText}
                    </button>
                </div>
            </div>
            <pre className="p-4 text-sm text-left overflow-x-auto max-h-[60vh]">
                <code className="text-white whitespace-pre-wrap break-words">{JSON.stringify(data, null, 2)}</code>
            </pre>
        </div>
    );
};

export default JsonOutput;
