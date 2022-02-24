import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faChessBishop, faCircleDot, faClipboardCheck } from '@fortawesome/free-solid-svg-icons'


const DashDesktopSideBar: React.FC = () => {

  const [ tabSelected, setTabSelected ] = useState("pool")

  const tabSelectStyle = "py-5 bg-med-dark-blue border-l-8 border-light-blue pl-14";
  const tabNotSelectedStyle = "py-5 pl-14 hover:bg-med-dark-blue"

  return (
    <div className="h-full bg-med-blue text-white">
      <div className="font-bold text-4xl py-20 text-center">
        <FontAwesomeIcon icon={faChartLine} className="pr-3"/>
          trackrr
      </div>
      <div>
        <ul className="text-3xl py-20">
          <li className={ tabSelected == "pool" ? tabSelectStyle : tabNotSelectedStyle } onClick={() => setTabSelected("pool")}>
            <FontAwesomeIcon icon={faCircleDot} className="pr-4"/>
            Pool
          </li>
          {/* <li className={ tabSelected == "chess" ? tabSelectStyle : tabNotSelectedStyle } onClick={() => setTabSelected("chess")}>
            <FontAwesomeIcon icon={faChessBishop} className="pr-4"/>
            Chess
          </li>
          <li className={ tabSelected == "rotas" ? tabSelectStyle : tabNotSelectedStyle } onClick={() => setTabSelected("rotas")}>
            <FontAwesomeIcon icon={faClipboardCheck} className="pr-4"/>
            Rotas
          </li> */}
        </ul>
      </div>
    </div>
  )
}

export default DashDesktopSideBar