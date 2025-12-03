import { create } from "zustand";
import { SummarizerService } from "@/service/summarizer.service";

interface SummarizerState {
  request: string;
  responseSummarizer: string;
  key_phrases:string[]
  loading: boolean;
  error: string | null;

  getSummarizeN: (request: string) => Promise<void>;
}

export const useSummarizerStore = create<SummarizerState>((set) => ({
  request: "",
  responseSummarizer: "",
  loading: false,
  error: null,
  key_phrases:[] , 


  getSummarizeN: async (request) => {
    set({ loading: true, error: null });

    try {
       // Contar saltos de línea con texto
  const paragraphsNumber = request
  .split(/\n+/)                // separa por uno o más saltos de línea
  .map(line => line.trim())    // quitar espacios en cada línea
  .filter(line => line !== "") // eliminar líneas vacías
  .length;                     // cantidad final (número)

  const paragraphs = request
        .split(/\n+/)                // separa por uno o varios saltos de línea
        .map(line => line.trim())    // limpia espacios
        .filter(line => line !== ""); // descarta líneas vacías

      const response = await SummarizerService.summarizeN(paragraphs , paragraphsNumber ); 

      console.log(response)
      // Extraemos el resumen real
      const summaries = response?.data?.summaries
      const summarizes = summaries.map((s) => s.summary)
      const key_phrases = summaries.map((s) => s.key_phrases) // response?.data?.key_phrases || [] ; 
      set({ request, responseSummarizer: summarizes , key_phrases:key_phrases });
      
    } catch (error: any) {
      console.error(error);
      set({
        error: error?.response?.data?.message || error.message || "Error obtaining the summary",
      });
    } finally {
      set({ loading: false });
    }
  },
}));
