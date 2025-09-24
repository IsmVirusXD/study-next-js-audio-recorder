import { useEffect, useRef, useState } from "react";
import { Mic, Play, Square, Send, Trash } from "lucide-react";
import dynamic from "next/dynamic";

export function RecordRTC() {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);

  const mediaRecorderRef = useRef<any | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  let RecordRTC: any;

  if (typeof window !== "undefined") {
    RecordRTC = require("recordrtc");
  }

  const stopRecording = async () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stopRecording(() => {
        const blob: Blob = mediaRecorderRef.current.getBlob();
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
      });

      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach((track) => track.stop());
      }

      setIsRecording(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;

      const recorder = new RecordRTC(stream, {
        type: "audio",
        mimeType: "audio/mp3",
      });

      recorder.startRecording();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
    } catch (error) {
      console.error("Erro Microfone", error);
    }
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
      {<audio controls src={audioURL!} />}
      {/* Adudio Player */}
    </>
  );
}
