'use client'

import { Textarea } from "../ui/textarea"
import { useState } from "react"
import { useSummarizerStore } from "@/lib/store/for-service/summarizer.store"
import { Button } from "../ui/button"
import { Label } from "@radix-ui/react-label"
import { useTranslation } from "@/lib/i18n"

export default function SummarizerForm() {
  const { getSummarizeN, responseSummarizer, loading, error, key_phrases = [] } = useSummarizerStore()
  const [request, setRequest] = useState("")
  const t = useTranslation() ; 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!request) return
    await getSummarizeN(request)
  }

  return (
    <div className="space-y-8">

      {/* FORMULARIO */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 border border-gray-200 rounded-2xl shadow-sm "
      >
        <div className="space-y-2">
          <Label htmlFor="request" className="text-3xl font-bold tracking-tight text-balance mb-5">
            {t.summarizer.summarizer}
          </Label>
          <Textarea
            id="request"
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            placeholder={t.summarizer.placeholderSummarizer}
            rows={6}
            className="border-blue-300 focus:border-purple-500 mt-3"
          />
        </div>

        <Button
          type="submit"
          disabled={loading || !request}
          className=""
        >
          {loading ? `${t.summarizer.buttonLoading}` : `${t.summarizer.buttonSubmit}`}
        </Button>

        {error && (
          <p className="text-red-600 text-sm mt-2 font-medium">{error}</p>
        )}
      </form>

      {/* RESULTADOS */}
      {responseSummarizer && (
        <div className="space-y-4">
          <div className="p-6 border border-purple-200 rounded-2xl shadow-sm">
            <h3 className="text-purple-800 font-bold text-lg">{t.summarizer.generatedSummary}</h3>
            <p className="mt-3 text-gray-700 whitespace-pre-wrap">{responseSummarizer}</p>
          </div>

          {key_phrases.length > 0 && (
            <div className="p-6 border border-blue-200 rounded-2xl shadow-sm">
              <h3 className="text-blue-800 font-bold text-lg mb-3">{t.summarizer.keyPhrases}</h3>
         <div className="flex flex-wrap gap-2">
  {key_phrases.map((group, groupIndex) =>
    group.map((phrase, phraseIndex) => (
      <span
        key={`${groupIndex}-${phraseIndex}`}
        className="text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
      >
        {phrase}
      </span>
    ))
  )}
</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

