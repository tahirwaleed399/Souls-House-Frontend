import Loader from '@/Components/Loader/Loader';
import { store } from '@/store';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import Navigation from '../Components/Navigation/Navigation';
import  { Toaster } from 'react-hot-toast';
import { useRefreshTokensQuery } from '@/apis/authApi';
import { useLoader } from '@/Hooks/useLoader';
export default function App({ Component, pageProps }: AppProps) {

     
  return <Provider store={store}>
       <div className='container mx-auto'>
     <Navigation></Navigation>
    
     <Loader></Loader>
<Toaster/>     

    <Component {...pageProps} />
     </div>
     </Provider>
}
