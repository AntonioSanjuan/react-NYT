import { useMostPopularArticles } from "../../hooks/mostPopularArticles/mostPopularArticlesHook";
import { Newscard } from "../../components/newscard/Newcard"
import { useEffect, useState } from "react";
import { PeriodOfTimes } from "../../models/internal/types/PeriodOfTimeEnum.model";
import './Home.scss'
import { useAppSelector } from "../../hooks/state/appStateHook";
import { DataState } from "../../state/data/models/appData.state";
import { selectData } from "../../state/data/data.selectors";
import { Loading } from "../../components/common/loading/loading";

function HomePage() {
  const {mostPopularViewedArticlesRequestedPage} = useAppSelector<DataState>(selectData);

  const [selectedPeriodOfTime, setSelectedPeriodOfTime] = useState<PeriodOfTimes>(mostPopularViewedArticlesRequestedPage);
  const periodOfTimes = PeriodOfTimes;

  let {mostPopularArticles, loading} = useMostPopularArticles({periodOfTime: selectedPeriodOfTime})
  const setOption = (selectedOption: any) => {
    setSelectedPeriodOfTime(Number.parseInt(selectedOption.target.value))
  }
  
  useEffect(() => {
  }, [selectedPeriodOfTime])

    return (
      <>
        { loading &&
          <>
          <Loading/>
          </>
        }
        <div className="MostPopularArticles_MainContainer">
          <div className="MostPopularArticles_SubContainer">
            <div className="MostPopularArticles_FilterContainer">
              <div>
                <p className="app_font_l">Most Popular Articles</p>
              </div>
              <select
                className="form-select MostPopularArticles_Filter"
                value={selectedPeriodOfTime}
                onChange={setOption}
              >
                <option value={periodOfTimes.Daily}>Daily</option>
                <option value={periodOfTimes.Weekly}>Weekly</option>
                <option value={periodOfTimes.Monthly}>Monthly</option>
              </select>
            </div>
            <div className="MostPopularArticles_News">
            {mostPopularArticles?.results.map(article => 
              <div className="MostPopularArticles_New" key={article.id}>
                <Newscard article={article}/>
              </div>
            )}
            </div>
          </div>
        </div>
      </>
    );
}

export default HomePage
  