import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import '../app/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false)

  useEffect(() => {
    import('../app/lib/firebase').then(() => {
      setFirebaseInitialized(true)
    })
  }, [])

  if (!firebaseInitialized) {
    return <div>Loading...</div>
  }

  return <Component {...pageProps} />
}

export default MyApp