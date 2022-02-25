import { useQuery } from "react-query"
import { sendRequest } from "../../utils/requests"

const DashDesktopRatingsTable: React.FC = () => {

  const rankingsQuery = useQuery('getRankings', () => {
    return sendRequest("/game/rankings", "GET")
  })

  const tableRows: any[] = []

  if (rankingsQuery.data) {
    rankingsQuery.data.data.foreach((row: any, index: number) => {
      tableRows.push(
        <tr className="divide-x divide-y divide-super-light-blue" key={index}>
          <td className="p-2">{row.playerName}</td>
          <td className="p-2">{row.rating}</td>
          <td className="p-2">{row.lastChange}</td>
          <td className="p-2">{row.ranking}</td>
      </tr>
      )
    })
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
          <tr className="divide-x divide-y divide-super-light-blue">
            <td className="p-2">Aaron Martin</td>
            <td className="p-2 text-right">1200</td>
            <td className="p-2 text-right">+20</td>
            <td className="p-2 text-right">1</td>
          </tr>
          <tr className="divide-x divide-y divide-super-light-blue">
            <td className="p-2">Aaron Martin</td>
            <td className="p-2 text-right">1200</td>
            <td className="p-2 text-right">+20</td>
            <td className="p-2 text-right">1</td>
          </tr>
          <tr className="divide-x divide-y divide-super-light-blue">
            <td className="p-2">Aaron Martin</td>
            <td className="p-2 text-right">1200</td>
            <td className="p-2 text-right">+20</td>
            <td className="p-2 text-right">1</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default DashDesktopRatingsTable