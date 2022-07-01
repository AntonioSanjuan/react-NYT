import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loading } from '../../components/common/loading/loading';
import { useSearchedArticles } from '../../hooks/searchedArticles/searchedArticlesHook';

function SearchPage() {
  const [searchParams, setSearchPArams] = useSearchParams();

  const [selectedSearch, setSelectedSearch] = useState<string>(
    searchParams.get('filterText') || '',
  );

  const { searchedArticles, loading, error } = useSearchedArticles({ search: selectedSearch });

  return (
    <>
      { loading
        && <Loading />}
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        onChange={(e) => setSelectedSearch(e.target.value)}
        value={selectedSearch || ''}
      />
      {
            error
              ? <p className="app_font_m">No Data</p>
              : <p className="app_font_m">Exists Data</p>
}
    </>

  );
}

export default SearchPage;
