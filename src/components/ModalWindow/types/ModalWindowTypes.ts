import { IContacts } from '../../../data';

export type formType = {
    name: string
    username: string
    phone: string
    email: string
    city: string
}

export interface IProps {
    onHide: () => void
    show: boolean
    idContact: number | null
    updateContacts: (form: formType) => void
    contacts: IContacts[]
}
