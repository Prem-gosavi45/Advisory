import { useState, useRef } from 'react';
import { Camera, Upload, Loader2, CheckCircle2, AlertCircle, FileText, Lightbulb, Brain, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";

export default function HomeworkAnalyzer() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    digitizedText: string;
    explanation: string;
    steps: string[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setAnalysisResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeHomework = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const base64Data = selectedImage.split(',')[1];
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            parts: [
              {
                inlineData: {
                  data: base64Data,
                  mimeType: "image/jpeg",
                },
              },
              {
                text: "Analyze this homework image. 1. Extract the text/problem exactly. 2. Provide a clear, step-by-step explanation of how to solve it. 3. Explain the underlying concepts. Return the response in a structured format with 'Digitized Text', 'Steps', and 'Conceptual Explanation'.",
              },
            ],
          },
        ],
      });

      const text = response.text;
      if (!text) throw new Error("No response from AI");

      // Simple parsing of the AI response
      const digitizedMatch = text.match(/Digitized Text:?\s*([\s\S]*?)(?=Steps:?|Conceptual Explanation:?|$)/i);
      const stepsMatch = text.match(/Steps:?\s*([\s\S]*?)(?=Conceptual Explanation:?|$)/i);
      const explanationMatch = text.match(/Conceptual Explanation:?\s*([\s\S]*?)$/i);

      setAnalysisResult({
        digitizedText: digitizedMatch?.[1]?.trim() || "Could not extract text clearly.",
        steps: stepsMatch?.[1]?.trim().split('\n').filter(s => s.trim()) || ["No specific steps provided."],
        explanation: explanationMatch?.[1]?.trim() || "No conceptual explanation provided.",
      });
    } catch (err) {
      console.error("Analysis error:", err);
      setError("Failed to analyze the image. Please try again with a clearer photo.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight flex items-center justify-center gap-3">
          <Brain className="text-indigo-600" size={40} />
          Image-to-Homework Analyzer
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Upload a photo of your assignment. Our AI will digitize the text, solve the problem, and explain the concepts step-by-step.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-6">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-3xl p-8 transition-all cursor-pointer flex flex-col items-center justify-center min-h-[400px] ${
              selectedImage ? 'border-indigo-200 bg-indigo-50/30' : 'border-gray-200 bg-white hover:border-indigo-400 hover:bg-gray-50'
            }`}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept="image/*" 
              className="hidden" 
            />
            
            {selectedImage ? (
              <div className="relative w-full h-full flex flex-col items-center">
                <img 
                  src={selectedImage} 
                  alt="Homework Preview" 
                  className="max-h-[300px] rounded-2xl shadow-lg object-contain mb-4"
                />
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedImage(null); setAnalysisResult(null); }}
                  className="px-4 py-2 bg-white text-red-600 rounded-xl text-sm font-bold shadow-sm border border-red-100 hover:bg-red-50 transition-colors"
                >
                  Remove Image
                </button>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-indigo-100 rounded-3xl flex items-center justify-center mx-auto text-indigo-600">
                  <Camera size={40} />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">Take a photo or upload</p>
                  <p className="text-gray-500">Supports JPG, PNG, and HEIC</p>
                </div>
                <div className="flex items-center gap-2 text-indigo-600 font-bold">
                  <Upload size={18} />
                  <span>Browse Files</span>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={analyzeHomework}
            disabled={!selectedImage || isAnalyzing}
            className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
              !selectedImage || isAnalyzing 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 hover:bg-indigo-700 active:scale-[0.98]'
            }`}
          >
            {isAnalyzing ? (
              <>
                <Loader2 size={24} className="animate-spin" />
                Analyzing with AI...
              </>
            ) : (
              <>
                <Brain size={24} />
                Analyze Homework
              </>
            )}
          </button>

          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600">
              <AlertCircle size={20} />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {analysisResult ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Digitized Text */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase tracking-widest">
                    <FileText size={16} />
                    Digitized Problem
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl text-gray-800 font-medium leading-relaxed">
                    {analysisResult.digitizedText}
                  </div>
                </div>

                {/* Steps */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 text-green-600 font-bold text-sm uppercase tracking-widest">
                    <CheckCircle2 size={16} />
                    Step-by-Step Solution
                  </div>
                  <div className="space-y-4">
                    {analysisResult.steps.map((step, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-sm shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 leading-relaxed pt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Explanation */}
                <div className="bg-indigo-600 p-6 rounded-3xl text-white shadow-xl space-y-3">
                  <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-widest opacity-80">
                    <Lightbulb size={16} />
                    Conceptual Hint
                  </div>
                  <p className="text-indigo-50 leading-relaxed text-lg italic">
                    "{analysisResult.explanation}"
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-white rounded-3xl border border-dashed border-gray-200">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <ImageIcon size={40} className="text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Waiting for Analysis</h3>
                <p className="text-gray-500 mt-2 max-w-xs">
                  Upload an image and click "Analyze Homework" to see the magic happen.
                </p>
                
                <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                  <div className="p-4 bg-gray-50 rounded-2xl text-left space-y-2">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-indigo-600 shadow-sm">
                      <FileText size={16} />
                    </div>
                    <p className="text-xs font-bold text-gray-900">OCR Tech</p>
                    <p className="text-[10px] text-gray-500">Extracts text even from messy handwriting.</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl text-left space-y-2">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-green-600 shadow-sm">
                      <ArrowRight size={16} />
                    </div>
                    <p className="text-xs font-bold text-gray-900">Step-by-Step</p>
                    <p className="text-[10px] text-gray-500">Breaks down complex problems logically.</p>
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
