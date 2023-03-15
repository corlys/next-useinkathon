import type { NextPage } from "next";
import { useEffect, ChangeEvent } from 'react';
import {
  useInkathon
} from "@scio-labs/use-inkathon"

const ConnectButton: NextPage = () => {

  const { isConnected, accounts, activeAccount, connect, setActiveAccount, } = useInkathon()

  const handleChangeAccount = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!accounts) return
    const selected = accounts.filter(account => account.address === e.target.value)
    if (!selected[0]) return
    setActiveAccount?.(selected[0])
  }

  useEffect(() => {
    if (!activeAccount) return
    console.log(activeAccount)
  }, [activeAccount])

  return <>
    {
      !isConnected ?
        <button
          onClick={connect}
          type="button"
          className="mr-2 mb-2 rounded-lg border border-blue-700 px-5 py-2.5 text-center text-sm font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-blue-800"
        >
          Login
        </button> :
        <>
          <select className="py-2 px-4 border border-pink-300 rounded-lg" onChange={handleChangeAccount} defaultValue="">
            {
              accounts && accounts.map(account => {
                return <option key={account.address} value={account.address}>
                  {account.meta.name}
                </option>
              })
            }
          </select>
        </>
    }

  </>
}

export default ConnectButton
