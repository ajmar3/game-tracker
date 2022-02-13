import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faChessBishop, faCircleDot, faClipboardCheck } from '@fortawesome/free-solid-svg-icons'
import DashDesktopNav from "./dashDesktopNav"
import DashDesktopGame from "./dashDesktopGame"


const DashDesktopBody: React.FC = () => {

  const [ tabSelected, setTabSelected ] = useState("pool")

  const tabSelectStyle = "py-5 bg-med-dark-blue border-l-8 border-light-blue pl-14";
  const tabNotSelectedStyle = "py-5 pl-14 hover:bg-med-dark-blue"

  return (
    <div className="h-full w-full bg-dark-blue text-white">
        <div className="h-10p">
            <DashDesktopNav />
        </div>
        <div className="h-90p w-full">
            <DashDesktopGame />
        </div>
    </div>
  )
}

export default DashDesktopBody