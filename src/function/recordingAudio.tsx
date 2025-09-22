import { RecordAudio_MediaStream } from "@/library/MediaStream";

interface RecordAudioProps {
    biblioteca: string;
}


export function RecordAudio({biblioteca} : RecordAudioProps)
{
    let audio;
    switch (biblioteca) {
        case "Nativo":
            audio = RecordAudio_MediaStream();
            break;
    
        default:
            break;
    }

}


