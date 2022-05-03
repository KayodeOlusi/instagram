import MiniProfile from './MiniProfile'
import Posts from './Posts'
import Stories from './Stories'
import Suggestions from './Suggestions'

const Feed: React.FC = () => {
  return (
    <main className="mx-auto grid grid-cols-1 md:max-w-3xl md:grid-cols-2 xl:max-w-6xl xl:grid-cols-3">
      {/**Posts */}
      <section className="col-span-2">
        <Stories />
        <Posts />
      </section>

      {/**Mini Profile */}
      <section className="col-span-1 hidden xl:inline-grid">
        <div className="fixed">
          <MiniProfile />
          <Suggestions />
        </div>
      </section>
    </main>
  )
}

export default Feed
