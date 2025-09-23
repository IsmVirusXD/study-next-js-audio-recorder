import { MediaRecorderApi } from "@/components/MediaRecorderAPI";
import { RecordRTC } from "@/components/RecordRTC";

export function renderGravacao(biblioteca : string)
{
    switch (biblioteca) {
      case "MediaRecorderAPI":
        return <MediaRecorderApi />;
      case "RecordRTC":
        return <RecordRTC />;

      default:
        <p>Nenhum Gravador Encontrado</p>;
    }

}