import { useMostPopularArticles } from "../../hooks/mostPopularArticles/mostPopularArticlesHook";

function HomePage() {
  const mostPopularArticles = useMostPopularArticles({periodOfTime: 1})
  console.log(mostPopularArticles)
    return (
      <>
        <main>
          <h2>Welcome to the homepage!</h2>
          <p>You can do this, I believe in you.</p>
        </main>
      </>
    );
}

  export default HomePage
  