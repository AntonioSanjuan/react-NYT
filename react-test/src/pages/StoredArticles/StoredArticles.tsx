import { useEffect } from "react";
import { Loading } from "../../components/common/loading/loading";
import { Newscard } from "../../components/newscard/Newcard";
import { useFetchStoredArticles } from '../../hooks/fetchStoredArticles/fetchStoredArticlesHook';
import "./StoredArticles.scss";

function StoredArticlesPage() {
  const { storedArticles, loading, error } = useFetchStoredArticles()

  useEffect(() => {
  }, [storedArticles])

  return (
    <>
    { loading &&
      <>
      <Loading/>
      </>
    }
    <div className="StoredArticles_MainContainer">
      <div className="StoredArticles_SubContainer">
        <div className="StoredArticles_News">
          {
          error ?
          <p>Error</p>
          :
          storedArticles?.map(article => 
            <div className="StoredArticles_New" key={article.firebaseDocId}>
              <Newscard article={article.storedArticle}
              isStored={true}/>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

  export default StoredArticlesPage
  