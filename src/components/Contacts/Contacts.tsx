import React from 'react';
import { IProps } from './types/contactTypes';
import style from './contacts.scss';

const Contacts: React.FC<IProps> = ({ contacts, visibleModal, deleteContacts }) => {

    return (
        <div className={style.contacts}>
            {
                contacts.length ?
                contacts.map(item => (
                    <div className={style.contacts__card} key={item.id}>
                        <div className={style.contacts__item}>{item.id}.</div>
                        <div className={style.contacts__title}>Фамилия</div>
                        <div className={style.contacts__item}>{item.username}</div>
                        <div className={style.contacts__title}>Имя</div>
                        <div className={style.contacts__item}>{item.name}</div>
                        <div className={style.contacts__title}>Эл. почта</div>
                        <div className={style.contacts__item}>{item.email}</div>
                        <div className={style.contacts__title}>Телефон</div>
                        <div className={style.contacts__item}>{item.phone}</div>
                        <div className={style.contacts__title}>Город</div>
                        <div className={style.contacts__item}>{item.address.city}</div>
                        <div className={style.contacts__icons}>
                            <i
                                title='Изменить'
                                className="fa-solid fa-pen-to-square"
                                onClick={visibleModal.bind(null, item.id)}
                                />
                            <i
                                title='Удалить'
                                style={{color: 'red'}}
                                className="fa-solid fa-trash-can"
                                onClick={deleteContacts.bind(null, item.id)}
                            />
                        </div>
                    </div>
                )) :
                    <h2 className='text-light'>Нет данных</h2>
            }
        </div>
    );
};

export default React.memo(Contacts);