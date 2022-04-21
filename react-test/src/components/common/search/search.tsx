import { useState } from 'react';
import { closeSearchAnimation, openSearchAnimation } from '../../../animations/search/searchAnimation';
import { useAnimationByStateTransition } from '../../../hooks/animation/animationHook';
import './search.scss';

function Search({ searchOutput } : {searchOutput: any}) {
  const [searchOpened, setSearchOpenedNewStatus] = useState<boolean>(false);
  const [searchInputValue, setSearchInputValue] = useState<string|undefined>(undefined);

  const useAnimation = useAnimationByStateTransition(searchOpened);

  const searchInput = (e: any) => {
    e.preventDefault();
    searchOutput(searchInputValue);
    setSearchInputValue(undefined);
  };

  return (
    <>
      <div className="searchInput_MainContainer">
        <button onClick={() => { setSearchOpenedNewStatus(!searchOpened); }} type="button" className="btn btn-dark">
          <i className="bi bi-search" />
        </button>
        <div className="form-group" style={useAnimation.stateTransition ? (searchOpened ? openSearchAnimation : closeSearchAnimation) : undefined}>
          <form onSubmit={searchInput}>
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              onChange={(e) => setSearchInputValue(e.target.value)}
              value={searchInputValue || ''}
            />
          </form>
        </div>
      </div>
      <button type="button" onClick={searchInput} style={{ visibility: searchInputValue ? 'visible' : 'hidden' }} className="btn btn-dark searchInput_MobileButton">search</button>
    </>
  );
}

export { Search };
