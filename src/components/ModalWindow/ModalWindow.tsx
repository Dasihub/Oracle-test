import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { formType, IProps } from './types/ModalWindowTypes';

const ModalWindow: React.FC<IProps> = ({ show, contacts, onHide, idContact, updateContacts }) => {
    const [form, setForm] = React.useState<formType>({
        name: '',
        username: '',
        phone: '',
        city: '',
        email: '',
    });

    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    React.useEffect(() => {
        for (let contact of contacts) {
            if (contact.id === idContact) {
                setForm({
                    name: contact.name,
                    phone: contact.phone,
                    city: contact.address.city,
                    email: contact.email,
                    username: contact.username,
                });
            }
        }
    }, []);

    return (
        <Modal
            show={show}
            onHide={onHide}
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id='contained-modal-title-vcenter'>
                    Изменить контакт
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Фамилия</Form.Label>
                    <Form.Control
                        name='username'
                        value={form.username}
                        onChange={change}
                    />

                    <Form.Label className='mt-3'>Имя*</Form.Label>
                    <Form.Control
                        name='name'
                        value={form.name}
                        onChange={change}
                    />

                    <Form.Label className='mt-3'>Эл. почта</Form.Label>
                    <Form.Control
                        name='email'
                        value={form.email}
                        onChange={change}
                    />

                    <Form.Label className='mt-3'>Телефон</Form.Label>
                    <Form.Control
                        name='phone'
                        value={form.phone}
                        onChange={change}
                    />

                    <Form.Label className='mt-3'>Город</Form.Label>
                    <Form.Control
                        name='city'
                        value={form.city}
                        onChange={change}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={updateContacts.bind(null, form)}>Сохранить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalWindow;