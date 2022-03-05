import { NextPage } from "next";
import Head from "next/head";
import { useMediaQuery } from 'react-responsive'
import AdminInputBody from "../components/desktop/adminDash";
import DashDesktopPage from "../components/desktop/dashDesktopPage";
import { checkLoggedIn } from "../utils/auth";

export async function getServerSideProps(context: any) {
  const userInfo = await checkLoggedIn(context.req)
  if (!userInfo || !userInfo.isAdmin) {
    return {
      redirect: {
        permanent: true,
        destination: "/login"
      }
    }
  }
  return {
    props: {
      userInfo: userInfo
    }, // will be passed to the page component as props
  }
}

type AdminPageProps = {
  userInfo: {
    userId: string,
    firstName: string,
    lastName: string,
    email: string,
    iat: number,
    exp: number
  }
}

const DashPage: NextPage<AdminPageProps> = (props) => {
  
  const isDesktop = useMediaQuery({ minWidth: 1440 })

  if (isDesktop) {
    return (
      <div className="w-screen h-screen">
        <Head>
          <title>Desktop</title>
        </Head>
        <AdminInputBody />
      </div>
    )
  }
  else {
    return (
      <div className="w-screen h-screen">
        <Head>
          <title>Mobile</title>
        </Head>
        <div className="flex justify-center h-screen w-full items-center">
          <div className="p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800 w-fit h-fit " role="alert">
            <span className="font-medium">Please use desktop site!</span>
          </div>
        </div>
        {/* <DashMobilePage /> */}
      </div>
    )
  }
  }

export default DashPage