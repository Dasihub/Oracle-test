import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { IContacts } from './data';
import { Contacts, Loader, ModalWindow, Search } from './components';
import { formType } from './components/ModalWindow/types/ModalWindowTypes';
import { Simulate } from 'react-dom/test-utils';
import select = Simulate.select;

const App: React.FC = () => {
    const localContacts: IContacts[] | string | null = localStorage.getItem('contacts')
    const [contacts, setContacts] = React.useState<IContacts[]>([]);
    const [showModal, setShowModal] = React.useState<boolean>(false)
    const [loader, setLoader] = React.useState<boolean>(false);
    const [idContact, setIdContact] = React.useState<number | null>(null)
    const [valueSearch, setValueSearch] = React.useState<string>('')
    const [sort, setSort] = React.useState<string | null>(null)

    const getContactsAPI = React.useCallback(async (): Promise<void> => {
        try {
            setLoader(true);
            const res: Response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data: IContacts[] = await res.json();
            localStorage.setItem('contacts', JSON.stringify(data))
            setContacts(data);
            setLoader(false);
        } catch (e) {
            console.log(e);
            setLoader(false);
        }
    }, [])

    const isGetContact = () => {
        if (!localContacts) {
            return getContactsAPI();
        }
        setContacts(JSON.parse(localContacts))
    }

    React.useEffect(() => {
        isGetContact()
    }, []);

    const visibleModal = (id: number): void => {
        setShowModal(true)
        setIdContact(id)
    }

    const updateContacts = ({name, username, phone, city, email} : formType) => {
        if (name.length) {
            const contactsUpdateData: IContacts[] = contacts.map(item => {
                if (item.id == idContact) {
                    return {
                        ...item, username, phone, email, name, address: { ...item.address, city }
                    }
                }
                return item
            })
            setShowModal(false)
            toast.success('Данные успешно изменены!')
            localStorage.setItem('contacts', JSON.stringify(contactsUpdateData))
            return setContacts(contactsUpdateData)
        }
        toast.warn('Заполните обизательное поля!')
    }

    const deleteContacts = (id: number) => {
        const rmContacts: IContacts[] = contacts.filter(item => item.id != id)
        setContacts(rmContacts)
        localStorage.setItem('contacts', JSON.stringify(rmContacts))

    }

    const contactsSort = React.useMemo(() => {
        if (Number(sort)) {
            return contacts.sort((x, y) => x.name < y.name ? -1 : 0)
        }
        return contacts.sort((x, y) => x.name < y.name ? 0 : -1)
    }, [contacts, valueSearch, sort])

    const contactsFilter = React.useMemo(() => {
        return contactsSort.filter(item => item.name.toLowerCase().includes(valueSearch.toLowerCase()))
    }, [contacts, valueSearch, sort])

    return (
        <>
            <ToastContainer/>
            <h2 className="text-light m-3">Contacts</h2>
            <Search
                setSort={setSort}
                setValueSearch={setValueSearch}
            />
            {
                loader &&
                <Loader/>
            }
            <Contacts
                contacts={contactsFilter}
                visibleModal={visibleModal}
                deleteContacts={deleteContacts}
            />
            {
                showModal &&
                <ModalWindow
                    show={showModal}
                    contacts={contacts}
                    idContact={idContact}
                    updateContacts={updateContacts}
                    onHide={setShowModal.bind(null, false)}
                />
            }
        </>
    );
};

export default App;