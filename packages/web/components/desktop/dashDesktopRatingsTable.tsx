import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { sendRequest } from "../../utils/requests"

const DashDesktopRatingsTable: React.FC = () => {

  const rankingsQuery = useQuery('getRankings', () => {
    return sendRequest("/game/rankings", "GET")
  })

  const [tableRows, setTableRows] = useState([]);

  useEffect(() => {
    console.log(rankingsQuery.data?.data)
    if (rankingsQuery.data) {
      setTableRows(rankingsQuery.data.data.map((row: any, index: number) => {
        return (
          <tr className="divide-x divide-y divide-super-light-blue" key={index}>
            <td className="p-2">{row.playerName}</td>
            <td className="p-2">{row.rating}</td>
            <td className="p-2">{row.lastChange}</td>
            <td className="p-2">{row.ranking}</td>
        </tr>
        )
      })
      )
    }
  }, [rankingsQuery.data])

  if (rankingsQuery.data) {
    console.log(rankingsQuery.data?.data)
  }
  return (
    <div className="w-full h-full text-white bg-med-blue relative rounded-md">
      <table className="table-auto w-full">
        <thead className="text-lg font-semibold uppercase bg-light-blue">
          <tr className="table-row">
            <th className="p-2">Player</th>
            <th className="p-2">Rating</th>
            <th className="p-2">Last Change</th>
            <th className="p-2">Ranking</th>
          </tr>
        </thead>
        <tbody className="text-xl divide-y divide-x divide-super-light-blue">
          {tableRows}
        </tbody>
      </table>
    </div>
  )
}

export default DashDesktopRatingsTable