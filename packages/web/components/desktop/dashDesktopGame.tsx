import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy, faMedal, faHashtag } from '@fortawesome/free-solid-svg-icons'
import DashDesktopNav from "./dashDesktopNav"
import DashDesktopAllGamesTable from "./dashDesktopAllGamesTable"
import DashDesktopRatingsTable from "./dashDesktopRatingsTable"


const DashDesktopGame: React.FC = () => {

  const [ tabSelected, setTabSelected ] = useState("pool")

  const tabSelectStyle = "py-5 bg-med-dark-blue border-l-8 border-light-blue pl-14";
  const tabNotSelectedStyle = "py-5 pl-14 hover:bg-med-dark-blue"

  return (
    <div className="h-full w-full text-white">
      <div className="h-full w-full grid grid-rows-4">
        <div className="row-span-1 w-full flex items-center justify-between">
          <div className="w-1/3 h-2/3 mx-20 rounded-2xl bg-med-blue flex items-center">
            <FontAwesomeIcon icon={faHashtag} className="text-5xl bg-dark-blue rounded-full ml-10 text-center p-5 flex justify-center items-center"/>
            <div className="flex-col pl-4">
              <div className="text-2xl">Total games played</div>
              <div className="text-4xl font-bold">16</div>
            </div>
          </div>
          <div className="w-1/3 h-2/3 mx-20 rounded-2xl bg-med-blue flex items-center">
            <FontAwesomeIcon icon={faTrophy} className="text-5xl bg-dark-blue rounded-full ml-10 text-center p-5 flex justify-center items-center"/>
            <div className="flex-col pl-4">
              <div className="text-2xl">Win percentage</div>
              <div className="text-4xl font-bold">60%</div>
            </div>
          </div>
          <div className="w-1/3 h-2/3 mx-20 rounded-2xl bg-med-blue flex items-center">
            <FontAwesomeIcon icon={faMedal} className="text-5xl bg-dark-blue rounded-full ml-10 text-center p-5 flex justify-center items-center"/>
            <div className="flex-col pl-4">
              <div className="text-2xl">Current Rank</div>
              <div className="text-4xl font-bold">3rd</div>
            </div>
          </div>
        </div>
          <div className="row-span-3 flex w-full">
            <div className="w-1/2 flex justify-center items-center">
              <div className="w-11/12 h-90p rounded-2xl bg-med-dark-blue">
                <DashDesktopAllGamesTable />
              </div>
            </div>
            <div className="w-1/2 flex justify-center items-center">
              <div className="w-11/12 h-90p rounded-2xl bg-med-dark-blue">
                <DashDesktopRatingsTable />
              </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default DashDesktopGame