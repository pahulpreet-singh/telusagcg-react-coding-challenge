import "./searchForm.css"

const SearchBar = ({ onInputChangeHandler }: SearchBarProps) => {
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
        <input
            type={"text"}
            onChange={debounce(onInputChangeHandler, 1000)}
            name="search"
            placeholder="Enter Search Query"
            className="search-bar"
        />
    )
}

interface SearchBarProps {
    onInputChangeHandler: (event: any) => void,
}

export default SearchBar;
