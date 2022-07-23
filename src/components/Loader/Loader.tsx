import React from 'react';
import style from './loader.scss';

const Loader: React.FC = () => {
    return (
        <div className={style.loader}>
            <div className={style.loader__big} />
        </div>
    );
};

export default Loader;