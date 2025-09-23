import { MediaRecorderApi } from "@/components/MediaRecorderAPI";

export function renderGravacao(biblioteca : string)
{
    switch (biblioteca) {
        case "MediaRecorderAPI":
            return <MediaRecorderApi />
    
        default:
            <p>Nenhum Gravador Encontrado</p>;
    }

}