import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loading } from '../../components/common/loading/loading';
import { useSearchedArticles } from '../../hooks/searchedArticles/searchedArticlesHook';

function SearchPage() {
  const [searchParams, setSearchPArams] = useSearchParams();

  const [inputSearch, setInputSearch] = useState('');
  const [selectedSearch, setSelectedSearch] = useState<string>(
    searchParams.get('filterText') || '',
  );

  const { searchedArticles, loading, error } = useSearchedArticles({ search: selectedSearch });

  // TO-DO
  // useEffect destroyer with the cleaning of the SearchState of redux,
  // in this way we are allowed to disabled the search inputs to avoid user confusion

  return (
    <>
      { loading
        && <Loading />}
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        onChange={(e) => setInputSearch(e.target.value)}
        value={inputSearch || ''}
      />
      <button
        type="button"
        onClick={() => {
          setSelectedSearch(inputSearch);
        }}
      >
        Search
      </button>
      {
            error
              ? <p className="app_font_m">No Data</p>
              : <p className="app_font_m">Exists Data</p>
}
    </>

  );
}

export default SearchPage;
