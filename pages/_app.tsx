import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider, useAuth } from '../stores/AuthContext'

function App({ Component, pageProps }: any) {

  
  return (
    <Component {...pageProps}/>
  )
}

function AppWrapper({Component, pageProps}: AppProps) {
  return (
    <AuthProvider>
      <App {...pageProps} Component={Component} />
    </AuthProvider>
  )
}

export default AppWrapper
