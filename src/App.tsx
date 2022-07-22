import React from "react";
import { IContacts } from "./data/data";

const App: React.FC = () => {
    const [contacts, setContacts] = React.useState<IContacts[]>([])
    const [loader, setLoader] = React.useState<boolean>(false)

    const getContactsAPI = async (): Promise<void> => {
        try {
            setLoader(true)
            const res: Response = await fetch('https://jsonplaceholder.typicode.com/users')
            const data: IContacts[] = await res.json()
            setContacts(data)
            setLoader(false)
        } catch (e) {
            console.log(e)
            setLoader(false)
        }
    }

    React.useEffect(() => {
        getContactsAPI()
    }, [])

    return (
        <>
        </>
    )
}

export default App