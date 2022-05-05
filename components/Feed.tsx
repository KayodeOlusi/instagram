import { useSession } from 'next-auth/react'
import MiniProfile from './MiniProfile'
import Posts from './Posts'
import Stories from './Stories'
import Suggestions from './Suggestions'

const Feed: React.FC = () => {
  const { data: session } = useSession()

  return (
    <main
      className={`mx-auto grid grid-cols-1
     md:max-w-3xl md:grid-cols-2 xl:max-w-6xl xl:grid-cols-3
      ${!session && '!max-w-3xl !grid-cols-1'}
     `}
    >
      {/**Posts */}
      <section className="col-span-2">
        <Stories />
        <Posts />
      </section>

      {/**Mini Profile */}
      {session && (
        <section className="col-span-1 hidden xl:inline-grid">
          <div className="fixed">
            <MiniProfile />
            <Suggestions />
          </div>
        </section>
      )}
    </main>
  )
}

export default Feed
