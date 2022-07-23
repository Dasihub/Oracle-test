import { IContacts } from '../../../data';

export interface IProps {
    contacts: IContacts[]
    visibleModal: (id: number) => void
    deleteContacts: (id: number) => void
}