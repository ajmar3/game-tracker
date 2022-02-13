import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faChevronDown } from '@fortawesome/free-solid-svg-icons'


const DashDesktopAllGamesTable: React.FC = () => {

  const [ drawerOpen, setDrawerOpen ] = useState(false);

  return (
    <div className="w-full h-full text-white bg-med-blue relative">
      <table className="table-auto w-full">
        <thead className="text-lg font-semibold uppercase bg-light-blue">
          <tr className="table-row">
            <th className="p-2 whitespace-nowrap">Date</th>
            <th className="p-2">Winner</th>
            <th className="p-2">Loser</th>
          </tr>
        </thead>
        <tbody className="text-xl divide-y divide-x divide-super-light-blue">
          <tr className="divide-x divide-y divide-super-light-blue">
            <td className="p-2">5/12/2000</td>
            <td className="p-2">Aaron Martin</td>
            <td className="p-2">Paul Smyth</td>
          </tr>
          <tr className="divide-x divide-y divide-super-light-blue">
            <td className="p-2">5/12/2000</td>
            <td className="p-2">Aaron Martin</td>
            <td className="p-2">Paul Smyth</td>
          </tr>
          <tr className="divide-x divide-y divide-super-light-blue">
            <td className="p-2">5/12/2000</td>
            <td className="p-2">Aaron Martin</td>
            <td className="p-2">Paul Smyth</td>
          </tr>
        </tbody>
      </table>
      <div className="absolute w-1/6 text-white bg-dark-blue rounded-full bottom-10 left-5/12 flex justify-center cursor-pointer shadow-md  shadow-slate-700 hover:shadow-2xl hover:shadow-slate-700 shadow"
        onClick={() => setDrawerOpen(!drawerOpen)}
      > 
        {drawerOpen ? 
          <div>
            <FontAwesomeIcon icon={faChevronDown} className="text-5xl text-center p-5 py-7 flex justify-center items-center"/>
            <div className="absolute w-full bg-white bottom-0 right-0">hello</div>
          </div>
          :
          <FontAwesomeIcon icon={faPlus} className="text-5xl text-center p-5 py-7 flex justify-center items-center"/>
        }
      </div>
    </div>
  )
}

export default DashDesktopAllGamesTable