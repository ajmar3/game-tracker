import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faChessBishop, faCircleDot, faClipboardCheck } from '@fortawesome/free-solid-svg-icons'
import DashDesktopNav from "./dashDesktopNav"
import DashDesktopGame from "./dashDesktopGame"

type DashDesktopBodyProps = {
  userId: string,
  firstName: string
  lastName: string
}

const DashDesktopBody: React.FC<DashDesktopBodyProps> = (props) => {
  return (
    <div className="h-full w-full bg-dark-blue text-white">
        <div className="h-10p">
            <DashDesktopNav {...props}/>
        </div>
        <div className="h-90p w-full">
            <DashDesktopGame />
        </div>
    </div>
  )
}

export default DashDesktopBody