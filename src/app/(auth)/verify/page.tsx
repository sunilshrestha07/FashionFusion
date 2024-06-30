import EmailVerify from '@/components/emailVerify'
import React, { Suspense } from 'react'

export default function page() {
  return (
   <Suspense fallback={<div>Loading...</div>}>
   <EmailVerify />
</Suspense>
  )
}
