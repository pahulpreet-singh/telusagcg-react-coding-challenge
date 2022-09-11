import { createContext, useState } from 'react';

export const searchQueryContext = createContext();

const SearchQueryProvider = (props) => {
    const [searchQuery, setSearchQuery] = useState();
    const [savedPeopleList, setSavedPeopleList] = useState();

    return (
        <searchQueryContext.Provider value={{query : [searchQuery, setSearchQuery], list : [savedPeopleList, setSavedPeopleList]}}>
            {props.children}
        </searchQueryContext.Provider>
    );
};

export default SearchQueryProvider;
