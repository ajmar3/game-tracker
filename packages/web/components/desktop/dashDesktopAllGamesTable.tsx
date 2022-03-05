import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useMutation, useQuery } from "react-query";
import { sendRequest } from "../../utils/requests";


const DashDesktopAllGamesTable: React.FC = () => {

  const [ drawerOpen, setDrawerOpen ] = useState(false);
  const [ inputError, setInputError ] = useState(false);
  const [ newGameData, setNewGameData ] = useState<{ winner: string | null, loser: string | null, date: Date }>({ winner: null, loser: null, date: new Date()})
  const [ playerOptions, setPlayerOptions ] = useState([])

  const gamesQuery = useQuery('allGames', () => {
    return sendRequest("/game/all", "GET")
  })

  const playersQuery = useQuery('allPlayers', () => {
    return sendRequest("/game/players", "GET")
  })

  const newGameMutation = useMutation((input: any) => {
    console.log("hello")
    return sendRequest("/game/create", "POST", input)
  })

  useEffect(() => {
    if (playersQuery.data && playersQuery.data.data) {
    setPlayerOptions(
        playersQuery.data.data.map((row: any) => {
          return (
            <option className="text-lg" value={row.id} key={row.id}>{row.name}</option>
          )
        })
    )
      }
  }, [playersQuery.data])

  const handleSubmit = () => {
    if(newGameData.winner == null || newGameData.winner == "default" || newGameData.loser == null || newGameData.loser == "default"){
      setInputError(true)
      console.log("hello there maye")
      return
    }

    setInputError(false)
    console.log(newGameData)
    newGameMutation.mutate(newGameData)
  }

  const tableRows: any[] = []

  if (gamesQuery.data && gamesQuery.data.data.length) {
    console.log("gamesQuery",gamesQuery.data.data)
    gamesQuery.data.data.forEach((row: any, index: number) => {
      tableRows.push(
        <tr className="divide-x divide-y divide-super-light-blue" key={index}>
          <td className="p-2">{row.date}</td>
          <td className="p-2">{row.winner}</td>
          <td className="p-2">{row.loser}</td>
      </tr>
      )
    })
  }


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
          {tableRows}
        </tbody>
      </table>
      {drawerOpen ?
        <div className="w-full">
          <div className="absolute w-full bg-med-dark-blue bottom-0 right-0 top-96">
            <div className="flex justify-between pt-3 pb-3">
              <div className="text-2xl text-center pl-5">Log new game</div>
              <div className="text-white bg-dark-blue rounded-full cursor-pointer shadow-md w-fit shadow-slate-700 hover:shadow-2xl hover:shadow-slate-700 mr-5"
                onClick={() => setDrawerOpen(!drawerOpen)}>
                <FontAwesomeIcon icon={faChevronDown} className="text-2xl text-center py-2 px-5 flex justify-center items-center"/>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="text-3xl w-4/5 flex justify-between pt-3">
                <div className="ml-5">
                  <select className="border-2 border-super-light-blue rounded-xl outline-none bg-med-blue focus:outline-none p-1"
                    onChange={(e) => { setNewGameData( { winner: e.target.value, loser: newGameData.loser, date: newGameData.date } ) }}
                  >
                    <option className="text-lg" value="default">winner</option>
                    {playerOptions}
                  </select>
                </div>
                <div className="mr-5">
                  <select className="border-2 border-super-light-blue rounded-xl outline-none bg-med-blue focus:outline-none p-1"
                    onChange={(e) => { setNewGameData( { winner: newGameData.winner, loser: e.target.value, date: newGameData.date } ) }}
                  >
                    <option className="text-lg" value="default">loser</option>
                    {playerOptions}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="text-2xl text-center mt-3 p-2 bg-dark-blue w-fit rounded-lg cursor-pointer" onClick={() => {handleSubmit()}}>
                Submit
              </div>
            </div>
            {inputError &&
              <div className="flex justify-center pt-2">
                <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                  <span className="font-medium">Bad input! Have you selected valid players?</span>
                </div>
              </div>
            }
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