import { useState } from "react"
import { loginInput } from "../../models/loginModels" 
import { useMutation } from "react-query"
import axios from "axios"
import { useRouter } from "next/router"
import { saveAuthCookie } from "../../utils/auth"

const LoginDesktopPage: React.FC = () => {

  const [inputData, setInputData] = useState<loginInput>({ email: "", password: "" })
  const router = useRouter()

  const sendPassword = useMutation((input: loginInput) => {
    return axios.post('http://localhost:5000/auth/login', input, { withCredentials: true })
  })

  if (sendPassword.isSuccess) {
    saveAuthCookie(sendPassword.data.data)
    console.log(sendPassword.data.data)
    // router.push("/dash")
  }

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="h-1/2 w-1/3 flex-col bg-dark-blue text-white rounded-xl">
        <div className="text-2xl text-center pb-8 pt-12">
          Sign In
        </div>
        <div className="w-full pt-8 pb-2 flex justify-center">
          <div className="flex-col items-center py-2 w-2/3">
            <input className="appearance-none bg-transparent w-full mr-3 py-1 mb-5 px-2 border-b border-super-light-blue leading-tight focus:outline-none text-xl"
              type="text" placeholder="Email" onChange={(e) => setInputData({ email: e.target.value, password: inputData.password })}
            />
            <input className="appearance-none bg-transparent w-full mr-3 py-1 my-7 px-2 border-b border-super-light-blue leading-tight focus:outline-none text-xl"
              type="password" placeholder="Password" onChange={(e) => setInputData({ email: inputData.email, password: e.target.value })}
            />
            <div className="flex justify-center">
              <button className="flex-shrink-0 bg-med-blue hover:bg-light-blue border-med-blue hover:border-light-blue border-4 py-1 px-2 rounded text-xl"
                type="button"
                onClick={() => sendPassword.mutate(inputData)}
              >
                Sign In
              </button>
            </div>
            {sendPassword.error &&
              <div className="p-4 my-2 mt-6 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800">
                <div className="flex justify-center text-lg">
                  Username or password is incorrect
                </div>
              </div>
            }
          </div>
        </div>
        <div className="text-lg text-center pt-2">
          <a href="#">Forgot Password?</a>
        </div>
      </div>
    </div>
  )
}

export default LoginDesktopPage