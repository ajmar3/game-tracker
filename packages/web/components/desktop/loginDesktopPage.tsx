import { useState } from "react"
import Head from "next/head"

const LoginDesktopPage: React.FC = () => {

  fetch("/api/hello/")

  return (
    <div className="flex justify-center items-center w-full h-full">
      <Head>
        <title>MpsBelfast</title>
      </Head>
      <div className="h-1/2 w-1/3 flex-col bg-dark-blue text-white rounded-xl">
        <div className="text-2xl text-center pb-8 pt-12">
          Sign In
        </div>
        <div className="w-full py-8 flex justify-center">
          <div className="flex-col items-center py-2 w-2/3">
            <input className="appearance-none bg-transparent w-full mr-3 py-1 mb-5 px-2 border-b border-super-light-blue leading-tight focus:outline-none text-xl" type="text" placeholder="Email" />
            <input className="appearance-none bg-transparent w-full mr-3 py-1 my-7 px-2 border-b border-super-light-blue leading-tight focus:outline-none text-xl" type="password" placeholder="Password" />
            <div className="flex justify-center">
              <button className="flex-shrink-0 bg-med-blue hover:bg-light-blue border-med-blue hover:border-light-blue border-4 py-1 px-2 rounded text-xl" type="button">
                Sign In
              </button>
            </div>
          </div>
        </div>
        <div className="text-lg text-center py-8">
          <a href="#">Forgot Password?</a>
        </div>
      </div>
    </div>
  )
}

export default LoginDesktopPage