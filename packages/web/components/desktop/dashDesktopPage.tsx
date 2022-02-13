import { useState } from "react"
import Head from "next/head"
import DashDesktopSideBar from "./dashDesktopSideBar"
import DashDesktopBody from "./dashDesktopBody"

const DashDesktopPage: React.FC = () => {

  return (
    <div className="w-full h-full grid grid-cols-6">
      <div className="col-span-1 w-full h-full">
        <DashDesktopSideBar />
      </div>
      <div className="col-span-5">
        <DashDesktopBody />
      </div>
    </div>
  )
}

export default DashDesktopPage