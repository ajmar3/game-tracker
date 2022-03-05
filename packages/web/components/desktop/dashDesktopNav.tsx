import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

type DashDesktopNavProps = {
  firstName: string,
  lastName: string
} 

const DashDesktopNav: React.FC<DashDesktopNavProps> = (props) => {

  const [ dropDownActive, setDropDownActive ] = useState(false)

  const defaultImageSrc = "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png"

  return (
    <div className="h-full w-full bg-med-dark-blue text-white flex items-center text-4xl">
      <div className="pl-10">
        Welcome back, {props.firstName}
      </div>
      <div className=" w-3/4 h-full flex justify-end items-center text-5xl">
        <a href="https://github.com/ajmar3/game-tracker"><FontAwesomeIcon icon={faGithub} className="pr-10"/></a>
        <div className="h-2/3 pr-10">
          <img src={defaultImageSrc} className="max-h-full rounded-full self-center cursor-pointer" onClick={() => setDropDownActive(!dropDownActive)}></img>
        </div>
        {dropDownActive &&
          <div className="absolute right-16 top-32 w-1/12 origin-top-right bg-white text-2xl text-dark-blue rounded-lg p-3">
            <ul>
              <li className="py-1 my-1 hover:bg-slate-400 px-2"><a href="#">Logout</a></li>
              {/* <li className="py-1 my-1 hover:bg-slate-400 px-2"><a href="#">My Profile</a></li> */}
            </ul>
          </div>
        }
        </div>
    </div>
  )
}

export default DashDesktopNav