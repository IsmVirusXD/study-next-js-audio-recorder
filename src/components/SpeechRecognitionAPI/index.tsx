import { useEffect, useRef, useState } from "react";
import { Mic, Play, Square, Send, Trash } from "lucide-react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export function SpeechRecognitionAPI() {
  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [isRecording, setRecording] = useState<boolean>(false);
  

  const startRecording = () => {
    setRecording(true)
    resetTranscript()
    SpeechRecognition.startListening(
      {continuous: true, language: "pt-BR"})
  }

  const stopRecording = () => {
    setRecording(false),
    SpeechRecognition.stopListening()
  }
  
  return (
    <>
      {isRecording ? (
        <div className="text-lg shadow-md text-[#5b5f97] rounded-full items-center flex flex-row gap-4 flex-1 max-h-20 p-5 bg-[#fffffb]">
          <button
            onClick={() => {
              stopRecording();
            }}
            className="bg-[#ff6b6c] text-[#fffffb] content-center rounded-full hover:bg-[#ffc145] hover:text-[#5b5f97]"
          >
            <Square className="w-[45px] h-[45px] text-center m-2" />
          </button>
          <p className="font-bold text-[#ff6b6c] flex-grow m-4">Gravando</p>
          <div className="relative flex">
            <span className="absolute w-[40px] h-[40px] animate-ping rounded-full opacity-100 bg-[#ff6b6c]" />
            <span className="relative w-[40px] h-[40px] rounded-full opacity-100 bg-[#ff6b6c]" />
          </div>
        </div>
      ) : (
        <div className="text-lg shadow-md text-[#5b5f97]  rounded-full items-center flex flex-row gap-4 flex-1 max-h-20 p-5 bg-[#fffffb]">
          <button
            onClick={() => {
              startRecording();
            }}
            className="bg-[#5b5f97] text-[#fffffb] content-center rounded-full hover:bg-[#ffc145] hover:text-[#5b5f97]"
          >
            <Mic className="w-[45px] h-[45px] text-center m-2" />
          </button>
          <p className="font-semi flex-grow m-4">
            Clique para começar a gravação
          </p>
        </div>
      )}
      {transcript ? (
        <div className="text-lg shadow-md text-[#5b5f97] flex flex-5 rounded-4xl p-10 bg-[#fffffb]">
          {transcript}
        </div>
      ) : (
        <div className="text-lg shadow-md text-[#5b5f97] flex flex-5 rounded-4xl p-10 bg-[#fffffb] opacity-45">
          Envie uma gravação para começarmos a transcrição
        </div>
      )}
      {/* Adudio Player */}
    </>
  );
}
