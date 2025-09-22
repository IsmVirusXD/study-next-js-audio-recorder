"use client";
import { useState } from "react";
import { Mic, Play, Square, Send, Trash } from "lucide-react";

export default function Home() {
  const [text, setText] = useState("Aguardando Gravação de Audio");
  const [isGravando, setIsGravando] = useState<boolean>(false);
  const [isTocando, setIsTocando] = useState<boolean>(true);
  const [haveConteudo, setHaveConteudo] = useState<boolean>(false);
  const [haveText, setHaveText] = useState<boolean>(false);
  const [languegeSeleccted, setLanguageSelected] =
    useState<string>("Português");
  const [audioRecorderSeleccted, setAudioRecorderSelected] =
    useState<string>("Nativo");
  const [transcriptionSeleccted, setTranscriptionSelected] =
    useState<string>("Biblioteca06");

  const language = ["Português"];
  // , "Inglês", "Espanhol"]
  const audioRecord = ["Nativo", "Biblioteca02", "Biblioteca03"];
  const trancription = ["Biblioteca04", "Biblioteca05", "Biblioteca06"];

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
        {/* Gravador */}
        {isGravando ? (
          <div className="text-lg shadow-md text-[#5b5f97] rounded-full items-center flex flex-row gap-4 flex-1 max-h-20 p-5 bg-[#fffffb]">
            <button
              onClick={() => {
                setIsGravando(!isGravando);
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
                setIsGravando(!isGravando);
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
        {/* Adudio Player */}
        {haveConteudo ? (
          <>
            <div className="text-lg shadow-md text-[#5b5f97] rounded-full items-center justify-center flex flex-row gap-4 flex-1 max-h-20 p-5 bg-[#fffffb]">
              <button className=" bg-[#5b5f97] text-[#fffffb] hover:bg-[#ffc145] hover:text-[#5b5f97] content-center rounded-full">
                <Play className="w-[40px] h-[40px] rounded-full text-center m-2" />
              </button>
              <hr className="text-2xl text-[#ffc145] flex-grow" />
              <p className="text-2xl">00:00</p>
              <button className=" bg-[#ff6b6c] hover:bg-[#ffc145] text-[#fffffb] hover:text-[#5b5f97] content-center rounded-full">
                <Trash className="w-[40px] h-[40px] rounded-full text-center m-2" />
              </button>
            </div>
            <div className="flex items-center justify-center">
              <button className="bg-[#ff6b6c] rounded-full text-[#fffffb] font-bold max-w-3xl p-2 py-2 px-4 shadow-md hover:bg-[#ffc145] hover:text-[#5b5f97]">
                Enviar para Transcrição
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-lg shadow-md text-[#5b5f97] rounded-full items-center justify-center flex flex-row gap-4 flex-1 max-h-20 p-5 bg-[#fffffb] opacity-35">
              <div className=" bg-[#b8b8d1] text-[#fffffb] content-center rounded-full">
                <Play className="w-[40px] h-[40px] rounded-full text-center m-2" />
              </div>
              <p className="text-2xl text-[#b8b8d1] flex-grow">
                Nenhum Arquivos Gravado
              </p>
              <div className=" bg-[#b8b8d1] text-[#fffffb] content-center rounded-full">
                <Trash className="w-[40px] h-[40px] rounded-full text-center m-2" />
              </div>
            </div>
            <div className="flex items-center justify-center opacity-35">
              <button className="bg-[#b8b8d1] rounded-full border text-[#fffffb] font-bold max-w-3xl p-2 py-2 px-4">
                Enviar para Transcrição
              </button>
            </div>
          </>
        )}

        {/* Text Transcribe */}
        {haveText ? (
          <div className="text-lg shadow-md text-[#5b5f97] flex flex-5 rounded-4xl p-10 bg-[#fffffb]">
            {text}
          </div>
        ) : (
          <div className="text-lg shadow-md text-[#5b5f97] flex flex-5 rounded-4xl p-10 bg-[#fffffb] opacity-45">
            Envie uma gravação para começarmos a transcrição
          </div>
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
            {audioRecord.map((audio) =>
              audio == audioRecorderSeleccted ? (
                <button
                  key={audio}
                  className="bg-[#ffc145] rounded-full text-[#5b5f97] font-bold max-w-3xl py-2 px-4 m-2"
                  onClick={() => setAudioRecorderSelected(audio)}
                >
                  {audio}
                </button>
              ) : (
                <button
                  key={audio}
                  className="bg-[#6b6f97] rounded-full text-[#fffffb] font-bold max-w-3xl py-2 px-4 m-2 hover:bg-[#ffc145] hover:text-[#5b5f97]"
                  onClick={() => setAudioRecorderSelected(audio)}
                >
                  {audio}
                </button>
              )
            )}
          </div>
          {/* Biblioteca de Transcição */}
          <h3 className="text-3xl text-start text-[#ff6b6c] font-bold">
            Bibliotecas de Transcrição
          </h3>
          <div className="gap-3">
            {trancription.map((trans) =>
              trans == transcriptionSeleccted ? (
                <button
                  key={trans}
                  className="bg-[#ffc145] rounded-full text-[#5b5f97] font-bold max-w-3xl py-2 px-4 m-2"
                  onClick={() => setTranscriptionSelected(trans)}
                >
                  {trans}
                </button>
              ) : (
                <button
                  key={trans}
                  className="bg-[#6b6f97] rounded-full text-[#fffffb] font-bold max-w-3xl py-2 px-4 m-2 hover:bg-[#ffc145] hover:text-[#5b5f97]"
                  onClick={() => setTranscriptionSelected(trans)}
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
