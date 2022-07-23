import React from 'react';
import { Button, Form } from 'react-bootstrap';
import style from './search.scss';
import { IProps } from './types/searchTypes';

const Search: React.FC<IProps> = ({setValueSearch, setSort}) => {
    const [value, setValue] = React.useState<string>('');

    const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const changeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSort(e.target.value);
    };

    const filter = () => {
        setValueSearch(value)
    }

    return (
        <Form>
            <div className={style.search}>
                <Form.Control
                    value={value}
                    onChange={changeInput}
                />
                <Button onClick={filter}>Поиск</Button>
                <Form.Select onChange={changeSelect}>
                    <option value={0}>По умолчанию</option>
                    <option value={1}>По имени алфавиту</option>
                </Form.Select>
            </div>
            <div>
            </div>
        </Form>
    );
};

export default Search;