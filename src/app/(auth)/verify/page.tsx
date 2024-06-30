import EmailVerify from '@/components/EmailVerify' 
import React, { Suspense } from 'react'

export default function page() {
  return (
   <Suspense fallback={<div>Loading...</div>}>
   <EmailVerify />
</Suspense>
  )
}
