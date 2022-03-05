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
        <div className="flex justify-center h-full w-full items-center">
          <div className="p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800 w-fit" role="alert">
            <span className="font-medium">Please use desktop site!</span>
          </div>
        </div>
        {/* <LoginMobilePage /> */}
      </div>
    )
  }
  }

export default LoginPage