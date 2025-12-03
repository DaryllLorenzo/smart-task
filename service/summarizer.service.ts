'use client' 

import axios from "axios";
import { Numerals } from "react-day-picker";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_SUMMARIZER,
  headers: {
    "Content-Type": "application/json",
  },
});

export const SummarizerService = {
    getResumen: async(info:string) => {
        return "Information"
    } , 

    summarize: async (info:string) => {
      
      const data = {
        text:info , 
        n_sentences: 1,
        language: "auto",
        include_metrics: true , 
      }

      const response = await api.post("summarize", data) ;  
      
      return response
    } , 

    summarizeN: async (info:string[] , n_sentences:number) => {
      
      const data = {
        texts:info , 
        n_sentences: n_sentences,
        //language: "auto",
        //include_metrics: true , 
      }

      const response = await api.post("summarize/batch", data) ;  
      
      return response
    }
}