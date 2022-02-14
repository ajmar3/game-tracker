import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faChevronDown } from '@fortawesome/free-solid-svg-icons'


const DashDesktopAllGamesTable: React.FC = () => {

  const [ drawerOpen, setDrawerOpen ] = useState(false);

  return (
    <div className="w-full h-full text-white bg-med-blue relative rounded-md">
      <table className="table-auto w-full">
        <thead className="text-lg font-semibold uppercase bg-light-blue">
          <tr className="table-row">
            <th className="p-2">Date</th>
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
      {drawerOpen ?
        <div className="w-full">
          <div className="absolute w-1/6 text-white bg-dark-blue rounded-full bottom-60 left-5/12 flex justify-center cursor-pointer shadow-md  shadow-slate-700 hover:shadow-2xl hover:shadow-slate-700"
            onClick={() => setDrawerOpen(!drawerOpen)}>
            <FontAwesomeIcon icon={faChevronDown} className="text-5xl text-center p-5 py-7 flex justify-center items-center"/>
          </div>
          <div className="absolute w-full bg-med-dark-blue bottom-0 right-0 top-96">
            <div className="text-2xl text-center pt-5">Log new game</div>
            <div className="flex justify-center">
            <div className="text-3xl w-4/5 flex justify-between pt-3">
              <div className="ml-5">
                <label className="text-lg block pb-2">Winner</label>
                <select className="border-2 border-super-light-blue rounded-xl outline-none bg-med-blue focus:outline-none">
                  <option className="text-lg">Option</option>
                  <option className="text-lg">Option</option>
                  <option className="text-lg">Option</option>
                </select>
              </div>
              <div className="mr-5">
              <label className="text-lg block pb-2">Loser</label>
                <select className="border-2 border-super-light-blue rounded-xl outline-none bg-med-blue focus:outline-none">
                  <option className="text-lg">Option</option>
                  <option className="text-lg">Option</option>
                  <option className="text-lg">Option</option>
                </select>
              </div>
            </div>
            </div>
          </div>
        </div>
        :
        <div className="absolute w-1/6 text-white bg-dark-blue rounded-full bottom-10 left-5/12 flex justify-center cursor-pointer shadow-md  shadow-slate-700 hover:shadow-2xl hover:shadow-slate-700"
          onClick={() => setDrawerOpen(!drawerOpen)}>
          <FontAwesomeIcon icon={faPlus} className="text-5xl text-center p-5 py-7 flex justify-center items-center"/>
        </div>
      }
    </div>
  )
}

export default DashDesktopAllGamesTable