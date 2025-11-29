import { create } from "zustand";
import { SummarizerService } from "@/service/summarizer.service";

interface SummarizerState {
  request: string;
  responseSummarizer: string;
  key_phrases:string[]
  loading: boolean;
  error: string | null;

  getSummarize: (request: string) => Promise<void>;
}

export const useSummarizerStore = create<SummarizerState>((set) => ({
  request: "",
  responseSummarizer: "",
  loading: false,
  error: null,
  key_phrases:[] , 


  getSummarize: async (request) => {
    set({ loading: true, error: null });

    try {
      // Llamada al endpoint real de tu API
      const data = {
        text: request,
        n_sentences: 3,
        language: "auto",
        include_metrics: true,
      };

      const response = await SummarizerService.summarize(request); 

      // Extraemos el resumen real
      const summarize = response?.data?.summary || "";
      const key_phrases = response?.data?.key_phrases || [] ; 
      set({ request, responseSummarizer: summarize , key_phrases:key_phrases });
      
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
