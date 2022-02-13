import { NextPage } from "next";
import Head from "next/head";
import { useMediaQuery } from 'react-responsive'

import LoginDesktopPage from "../components/desktop/loginDesktopPage";
import LoginMobilePage from "../components/mobile/loginMobilePage";


const LoginPage: NextPage = () => {
  
  const isDesktop = useMediaQuery({ minWidth: 1440 })

  if (isDesktop) {
    return (
      <div className="w-screen h-screen">
        <Head>
          <title>MpsBelfast</title>
        </Head>
        <LoginDesktopPage />
      </div>
    )
  }
  else {
    return (
      <div className="w-screen h-screen">
        <Head>
          <title>MpsBelfast</title>
        </Head>
        <LoginMobilePage />
      </div>
    )
  }
  }

export default LoginPage