"use client";
import { useEffect, useRef, useState } from "react";
import { Mic, Play, Square, Send, Trash } from "lucide-react";
import { renderGravacao } from "@/functions/renderGravacao";
import { renderTranscrption } from "@/functions/renderTranscription";
import { SpeechRecognitionAPI } from "@/components/SpeechRecognitionAPI";

export default function Home() {
  const [text, setText] = useState("Aguardando Gravação de Audio");
  const [isGravando, setIsGravando] = useState<boolean>(false);
  const [isTocando, setIsTocando] = useState<boolean>(true);
  const [trancricao, setTranscricao] = useState<boolean>(false);
  const [audio, setAudio] = useState<MediaStream | null>(null);

  const [languegeSeleccted, setLanguageSelected] =
    useState<string>("Português");
  const [audioRecorderSeleccted, setAudioRecorderSelected] =
    useState<string>("MediaRecorderAPI");
  const [transcriptionSeleccted, setTranscriptionSelected] =
    useState<string>("Biblioteca06");

  const language = ["Português"];
  // , "Inglês", "Espanhol"]
  const audioRecord_Options = ["MediaRecorderAPI", "Biblioteca 01","SpeechRecognizer"];
  const trancription_Options = ["Biblioteca02", "Bilioteca03", "SpeechRecognizer"];

  return (
    <main className="bg-[#b8b8d1] h-screen w-screen p-8 flex flex-row">
      {/* Recorder */}
      <div className="flex flex-col flex-2 gap-6 p-3">
        {/* Cabeçalho */}
        <div className="flex flex-col flex-1 gap-4">
          <h1 className="font-semibold text-[#5b5f97] text-7xl">
            Audio <span className="text-[#ff6b6c]">Recorder</span> Transcriber
          </h1>
          <hr className="text-[#ffc145]" />
          <h3 className="font-normal text-lg text-[#fffffb]">
            Teste de Bibliotecas de Gravação de Audio e Trancrição com
            Compatibilidade para React e Java
          </h3>
        </div>
        {audioRecorderSeleccted === "SpeechRecognizer" ? (
          <SpeechRecognitionAPI />
        ) : (
          <>
            {renderGravacao(audioRecorderSeleccted)}
            {renderTranscrption(transcriptionSeleccted)}
          </>
        )}
      </div>
      {/* Configuration */}
      <div className="flex flex-col p-3 ml-9 text-center items-center flex-1 gap-5">
        <h2 className="font-semibold text-[#5b5f97] text-6xl text-center text-shadow-2xs m-8">
          Configuração
        </h2>
        <div className="text-lg shadow-md text-[#5b5f97] flex flex-col w-[100%] rounded-4xl p-10 bg-[#fffffb] gap-6 justify-between flex-grow">
          {/* BIblioteca de Gravação */}
          <h3 className="text-3xl text-start text-[#ff6b6c] font-bold">
            Bibliotecas de Gravação
          </h3>
          <div className="gap-3">
            {audioRecord_Options.map((audioRecorder) =>
              audioRecorder == audioRecorderSeleccted ? (
                <button
                  key={audioRecorder}
                  className="bg-[#ffc145] rounded-full text-[#5b5f97] font-bold max-w-3xl py-2 px-4 m-2"
                  onClick={() => {
                    if (audioRecorder == "SpeechRecognizer") {
                      setTranscriptionSelected(audioRecorder);
                    }
                    setAudioRecorderSelected(audioRecorder);
                  }}
                >
                  {audioRecorder}
                </button>
              ) : (
                <button
                  key={audioRecorder}
                  className="bg-[#6b6f97] rounded-full text-[#fffffb] font-bold max-w-3xl py-2 px-4 m-2 hover:bg-[#ffc145] hover:text-[#5b5f97]"
                  onClick={() => {
                    if (audioRecorder == "SpeechRecognizer") {
                      setTranscriptionSelected(audioRecorder);
                    }
                    setAudioRecorderSelected(audioRecorder);
                  }}
                > 
                  {audioRecorder}
                </button>
              )
            )}
          </div>
          {/* Biblioteca de Transcição */}
          <h3 className="text-3xl text-start text-[#ff6b6c] font-bold">
            Bibliotecas de Transcrição
          </h3>
          <div className="gap-3">
            {trancription_Options.map((trans) =>
              trans == transcriptionSeleccted ? (
                <button
                  key={trans}
                  className="bg-[#ffc145] rounded-full text-[#5b5f97] font-bold max-w-3xl py-2 px-4 m-2"
                  onClick={() => {
                    if (trans == "SpeechRecognizer") {
                      setAudioRecorderSelected(trans);
                    }
                    setTranscriptionSelected(trans);
                  }}
                >
                  {trans}
                </button>
              ) : (
                <button
                  key={trans}
                  className="bg-[#6b6f97] rounded-full text-[#fffffb] font-bold max-w-3xl py-2 px-4 m-2 hover:bg-[#ffc145] hover:text-[#5b5f97]"
                  onClick={() => {
                    if (trans == "SpeechRecognizer") {
                      setAudioRecorderSelected(trans);
                    }
                    setTranscriptionSelected(trans);
                  }}
                >
                  {trans}
                </button>
              )
            )}
          </div>
          {/* Linguagens */}
          <h3 className="text-3xl text-start text-[#ff6b6c] font-bold">
            Linguagens
          </h3>
          <div>
            {language.map((lang) =>
              lang == languegeSeleccted ? (
                <button
                  key={lang}
                  className="bg-[#ffc145] h-12 w-32 rounded-full text-[#5b5f97] font-bold max-w-3xl p-2 m-2"
                  onClick={() => setLanguageSelected(lang)}
                >
                  {lang}
                </button>
              ) : (
                <button
                  key={lang}
                  className="bg-[#6b6f97] h-12 w-32 rounded-full text-[#fffffb] font-bold max-w-3xl p-2 m-2 hover:bg-[#ffc145] hover:text-[#5b5f97]"
                  onClick={() => setLanguageSelected(lang)}
                >
                  {lang}
                </button>
              )
            )}
          </div>
          <hr className="text-[#ffc145]" />
          <div className="flex items-center justify-center">
            <button className="bg-[#ff6b6c] rounded-full text-[#fffffb] font-bold max-w-3xl p-2 py-2 px-4 hover:bg-[#ffc145] hover:text-[#5b5f97]">
              Aplicar Alterações
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
