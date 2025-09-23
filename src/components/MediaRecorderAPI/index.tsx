import { useEffect, useRef, useState } from "react";
import { Mic, Play, Square, Send, Trash } from "lucide-react";

export function MediaRecorderApi() {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [audioURL, setAudioURL] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([])

  useEffect(() => {
    async function setupMicrophone() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        audioStreamRef.current = stream;
      } catch (err) {
        console.error("Erro de Acesso ao Microfone: ", err);
      }
    }

    setupMicrophone();

    return () => {
      audioStreamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

   const startRecording = () => {
     const stream = audioStreamRef.current;
     if (!stream) return;

     const mediaRecorder = new MediaRecorder(stream);
     mediaRecorderRef.current = mediaRecorder;
     chunksRef.current = []

     mediaRecorder.ondataavailable = (event) => {
       if (event.data.size > 0) {
         chunksRef.current.push(event.data)
       }
     };

     mediaRecorder.onstop = () => {
       const blob = new Blob(chunksRef.current, { type: "audio/webm" });
       const url = URL.createObjectURL(blob);
       setAudioURL(url);
     };

     mediaRecorder.start();
     setIsRecording(true);
   };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };


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
      {/* Adudio Player */}
      {/* {audioURL ? (
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
          <audio className="flex flex-grow rounded-full bg-[#fffffb]" controls src={audioURL} />
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
      )} */}
    </>
  );
}
