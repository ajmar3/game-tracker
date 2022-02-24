import { useState } from "react"
import Head from "next/head"
import DashDesktopSideBar from "./dashDesktopSideBar"
import DashDesktopBody from "./dashDesktopBody"

type DashDesktopPageProps = {
  userId: string,
  firstName: string,
  lastName: string,
  email: string
}

const DashDesktopPage: React.FC<DashDesktopPageProps> = (props) => {

  return (
    <div className="w-full h-full grid grid-cols-6">
      <div className="col-span-1 w-full h-full">
        <DashDesktopSideBar />
      </div>
      <div className="col-span-5">
        <DashDesktopBody {...props}/>
      </div>
    </div>
  )
}

export default DashDesktopPage