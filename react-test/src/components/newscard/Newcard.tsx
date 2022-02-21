import { MostPopularViewedArticlesResponseContentDto } from '../../models/dtos/mostPopularViewedArticles/mostPopularViewedArticlesResponseDto.model';
import './Newcard.scss';

function Newscard({article}: {article: MostPopularViewedArticlesResponseContentDto}) {

    const hasImage = () => {
        return !!article?.media[0];
    }

    const getImage = () => {
        const mediaMetadataIndex =
          article?.media[0]['media-metadata'].length - 1;
    
        return article?.media[0]['media-metadata'][mediaMetadataIndex].url;
    }

    return (
        <> 
        {
            <div className="NewsCard_MainContainer">
                <div className="NewsCard_ImageContainer">
                    {article && hasImage()? 
                    <>
                        <img
                        alt='article resource'
                        className="NewsCard_Image"
                        src={getImage()}
                        />
                    </>
                    : 
                    <>
                        <img
                        alt='default resource'
                        className="NewsCard_Image"
                        src="../../../assets/images/NoImage.png"
                        />
                    </>
                    }
                </div>
                <div className="NewsCard_CategoryContainer">
                    <div className="NewsCard_CategoryByLine">
                    <p className="app_font_xs">
                        {article?.byline}
                    </p>
                    </div>
                    <div className="NewsCard_CategorySection">
                    <p className="app_font_xs">
                        {article?.section}
                    </p>
                    </div>
                </div>
                <div className="NewsCard_TitleContainer">
                    <p className="app_font_l">
                        {article?.title}
                    </p>
                </div>
                <div className="NewsCard_TextContainer">
                    <p className="app_font_s">
                        {article?.abstract}
                    </p>
                </div>
            </div>
        }
        </>
    )
}

export {Newscard}