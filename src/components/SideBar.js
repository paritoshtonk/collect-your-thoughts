import { useState } from 'react';
import { MdMenu } from 'react-icons/md';

const SideBar = ({ categories, selected, onSelectCategory }) => {
    const [close, setClose] = useState(false);
    return (
        <div className={'sidebar ' + (close ? 'close' : '')}>
            <MdMenu className='icon menu-icon' size='3em' onClick={() => setClose(!close)} />
            <div className='categories'>
                {categories.map((category, index) =>
                    <div key={category.name}
                        onClick={() => {
                            if (selected !== index)
                                onSelectCategory(index);
                        }}>
                        <Category
                            title={category.name}
                            isSelected={index === selected}
                        /></div>
                )}
            </div>
        </div>
    );
}

const Category = ({ title, isSelected }) => {
    return (
        <h1 className={'category-item ' + (isSelected ? 'selected' : '')}>{title}</h1>
    )
}

export default SideBar;