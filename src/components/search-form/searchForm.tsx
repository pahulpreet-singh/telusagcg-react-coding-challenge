import { RefObject } from "react"
import "./searchForm.css"

const SearchBar = (props: SearchBarProps) => {

    const { searchRef, onInputChangeHandler, onClearSearchInputHandler } = props;

    function debounce<Params extends any[]>(
        func: (...args: Params) => any,
        timeout: number,
    ): (...args: Params) => void {
        let timer: NodeJS.Timeout
        return (...args: Params) => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                func(...args)
            }, timeout)
        }
    }
    return (
        <span className="clearable">
            <input
                type={"text"}
                onChange={debounce(onInputChangeHandler, 1000)}
                name="search"
                placeholder="Enter Search Query"
                className="search-bar"
                ref={searchRef}
            />
            <i className="clearable__clear" onClick={() => onClearSearchInputHandler(searchRef)}>&times;</i>
        </span>
    )
}

interface SearchBarProps {
    searchRef: RefObject<HTMLInputElement>,
    onClearSearchInputHandler: (searchRef: RefObject<HTMLInputElement>) => void,
    onInputChangeHandler: (event: any) => void,
}

export default SearchBar;
