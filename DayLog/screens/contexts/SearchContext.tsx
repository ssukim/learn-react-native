import React, {createContext, useState} from 'react';

type ContextProps = {
  keyword: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
};

const SearchContext = createContext<ContextProps>({
  keyword: '',
  onChangeText: () => {},
});

type Props = {
  children: React.ReactNode;
};
export function SearchContextProvider({children}: Props) {
  const [keyword, onChangeText] = useState('');

  return (
    <SearchContext.Provider value={{keyword, onChangeText}}>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchContext;
