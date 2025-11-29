'use client'

import SummarizerForm from "@/components/summarizer/summarizer-form"
import { ProtectedLayout } from "@/components/layout/protected-layout"


export default function Summarizer() {
  
  return (
    <div>
      <ProtectedLayout> 
        <SummarizerForm/>
      </ProtectedLayout>
    </div>
  )
}
