import type { NextPage } from 'next'
import { useEffect, useState } from "react"
import { useInkathon, useRegisteredContract, contractQuery, shibuya, unwrapResultOrError, contractTx } from "@scio-labs/use-inkathon";
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from "react-toastify";

type GreetForm = {
  greet: string
}

const GreeterApp: NextPage = () => {
  const { api, activeAccount, } = useInkathon();
  const { contract, } = useRegisteredContract('greeter', shibuya.network)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { handleSubmit, register, reset } = useForm<GreetForm>({
    defaultValues: {
      greet: ""
    }
  })

  useEffect(() => {
    queryGreeting();
  }, [contract])

  const [greeting, setGreeting] = useState<string | null>(null)
  const queryGreeting = async () => {
    if (!contract || !api) return
    try {
      const query = await contractQuery(api, "", contract, "get_message")
      const message = unwrapResultOrError<string>(query)
      setGreeting(message)
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit: SubmitHandler<GreetForm> = async (data) => {
    if (!data.greet) return
    if (!contract || !api || !activeAccount) return
    setIsLoading(true)
    const id = toast.loading("Processing the tx")
    try {
      const tx = await contractTx(api, activeAccount.address, contract, "set_message", {}, [data.greet])
      console.log(tx)
      toast.update(id, {
        autoClose: 7000,
        closeOnClick: true,
        render: "All is good in substrate land",
        type: "success",
        isLoading: false
      })
    } catch (error) {
      console.log(error)
      toast.update(id, {
        autoClose: 7000,
        closeOnClick: true,
        render: "All is not so good in substrate land",
        type: "error",
        isLoading: false
      })
    } finally {
      reset()
      setIsLoading(false)
      await queryGreeting()
    }
  }


  return <>
    <div className="text-pink-200 flex flex-col items-center justify-center border border-gray-300 rounded-lg p-4 gap-6">
      <h3 className="text-lg font-semibold">Fetch Greeter</h3>
      <h3 className="text-md font-semibold">{greeting}</h3>
    </div>
    <div className="flex flex-col items-center justify-center gap-6 p-4 border border-gray-300 rounded-lg text-pink-200">
      <h3 className="text-lg font-semibold">
        Set Greeter
      </h3>
      <div className="flex flex-row items-center justify-center gap-2">
        <input {...register("greet")} className="p-2 border border-pink-300 rounded bg-gray-500" />
        <button onClick={handleSubmit(onSubmit)} className={`px-4 py-2 flex items-center justify-center bodder border-pink-300 rounded-lg bg-blue-600 hover:bg-blue-400 ${isLoading && "bg-blue-400"}`}>Submit</button>
      </div>
    </div>
  </>
}

export default GreeterApp
