import { useState } from "react"
import { useMutation } from "react-query"
import axios from "axios"
import { sendRequest } from "../../utils/requests"


const AdminInputBody: React.FC = () => {

  const [newUserInput, setNewUserInput] = useState<{
    firstName: string | null,
    lastName: string | null,
    email: string | null,
    password: string | null,
    isAdmin: boolean | null
  }>({ firstName: null, lastName: null, email: null, password: null, isAdmin: false })

  const sendnewUser = useMutation((input: any) => {
    return sendRequest("/admin/create/user", "POST", input)
  })

  return (
    <div className="h-full w-full bg-dark-blue text-white flex justify-center items-center">
        <div className="w-fit h-fit mx-20 rounded-2xl bg-med-blue flex items-center p-5">
          <input className="appearance-none bg-transparent w-full mr-3 py-1 my-7 px-2 border-b border-super-light-blue leading-tight focus:outline-none text-xl"
            type="text" placeholder="First name" onChange={(e) => setNewUserInput({ firstName: e.target.value, lastName: newUserInput.lastName, email: newUserInput.email, password: newUserInput.password, isAdmin: false })}
          />
          <input className="appearance-none bg-transparent w-full mr-3 py-1 my-7 px-2 border-b border-super-light-blue leading-tight focus:outline-none text-xl"
            type="text" placeholder="Last name" onChange={(e) => setNewUserInput({ firstName: newUserInput.firstName,  lastName: e.target.value, email: newUserInput.email, password: newUserInput.password, isAdmin: false })}
          />
          <input className="appearance-none bg-transparent w-full mr-3 py-1 my-7 px-2 border-b border-super-light-blue leading-tight focus:outline-none text-xl"
            type="text" placeholder="Email" onChange={(e) => setNewUserInput({ firstName: newUserInput.firstName,  lastName: newUserInput.lastName, email: e.target.value, password: newUserInput.password, isAdmin: false })}
          />
          <input className="appearance-none bg-transparent w-full mr-3 py-1 my-7 px-2 border-b border-super-light-blue leading-tight focus:outline-none text-xl"
            type="text" placeholder="Password" onChange={(e) => setNewUserInput({ firstName: newUserInput.firstName,  lastName: newUserInput.lastName, email: newUserInput.email, password: e.target.value, isAdmin: false })}
          />
        </div>

        <button className="flex-shrink-0 bg-med-blue hover:bg-light-blue border-med-blue hover:border-light-blue border-4 py-1 px-2 rounded text-xl"
                type="button"
                onClick={() => sendnewUser.mutate(newUserInput)}
              >
                Create User
        </button>
    </div>
  )
}

export default AdminInputBody