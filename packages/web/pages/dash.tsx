import { NextPage } from "next";
import Head from "next/head";
import { useMediaQuery } from 'react-responsive'
import DashDesktopPage from "../components/desktop/dashDesktopPage";
import DashMobilePage from "../components/mobile/dashDesktopPage";
import { checkLoggedIn } from "../utils/auth";

export async function getServerSideProps(context: any) {
  const userInfo = await checkLoggedIn(context.req)
  if (!userInfo) {
    return {
      redirect: {
        permanent: false,
        destination: "/login"
      }
    }
  }
  return {
    props: {}, // will be passed to the page component as props
  }
}


const DashPage: NextPage = () => {
  
  const isDesktop = useMediaQuery({ minWidth: 1440 })

  if (isDesktop) {
    return (
      <div className="w-screen h-screen">
        <Head>
          <title>Desktop</title>
        </Head>
        <DashDesktopPage />
      </div>
    )
  }
  else {
    return (
      <div className="w-screen h-screen">
        <Head>
          <title>Mobile</title>
        </Head>
        <DashMobilePage />
      </div>
    )
  }
  }

export default DashPage