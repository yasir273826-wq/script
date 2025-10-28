
import React, { useState, useCallback } from 'react';
import ScriptInput from './components/ScriptInput';
import JsonOutput from './components/JsonOutput';
import { generateScenePrompts } from './services/geminiService';
import { ScriptBreakdown } from './types';

const Header = () => (
    <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
            AI Script Breakdown Generator
        </h1>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Paste your video script below and our AI will generate a detailed, scene-by-scene breakdown with prompts for visuals, motion, and voiceovers.
        </p>
    </header>
);

const WelcomeMessage = () => (
    <div className="mt-8 text-center p-8 bg-gray-800/50 border border-dashed border-gray-700 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-300">Ready to bring your script to life?</h2>
        <p className="mt-2 text-gray-400">Your generated JSON breakdown will appear here once you submit a script.</p>
    </div>
);

const App: React.FC = () => {
    const [script, setScript] = useState<string>('');
    const [breakdown, setBreakdown] = useState<ScriptBreakdown | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = useCallback(async () => {
        if (!script.trim()) {
            setError('Script cannot be empty.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setBreakdown(null);

        try {
            const result = await generateScenePrompts(script);
            setBreakdown(result);
        } catch (err: unknown) {
            if (err instanceof Error) {
                 setError(`An error occurred: ${err.message}. Please check your connection and API key, then try again.`);
            } else {
                 setError('An unknown error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    }, [script]);

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans">
            <main className="container mx-auto px-4 py-8 sm:py-12 md:py-16 flex flex-col items-center">
                <Header />
                <div className="w-full max-w-4xl p-6 md:p-8 bg-gray-800/20 border border-gray-700/50 rounded-2xl shadow-2xl backdrop-blur-sm">
                    <ScriptInput
                        script={script}
                        setScript={setScript}
                        onGenerate={handleGenerate}
                        isLoading={isLoading}
                    />
                </div>

                <div className="w-full max-w-4xl mt-6">
                    {error && (
                        <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
                            <strong className="font-bold">Error: </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    
                    {!isLoading && !error && breakdown && <JsonOutput data={breakdown} />}
                    
                    {!isLoading && !error && !breakdown && <WelcomeMessage />}
                </div>
            </main>
            <footer className="text-center py-6 text-gray-500 text-sm">
                <p>Powered by Gemini API</p>
            </footer>
        </div>
    );
};

export default App;
