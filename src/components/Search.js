import { MdSearch } from "react-icons/md"

const Search = ({ searchTextChange }) => {
    return (
        <div className='search'>
            <MdSearch size='2em' />
            <input
                type='text'
                onChange={(event) => searchTextChange(event.target.value)}
                placeholder='Search'
            />
        </div>
    )
}

export default Search;