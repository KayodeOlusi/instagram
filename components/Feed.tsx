import Stories from './Stories'

const Feed: React.FC = () => {
  return (
    <main className="mx-auto grid grid-cols-1 md:max-w-3xl md:grid-cols-2 xl:max-w-6xl xl:grid-cols-3">
      <section className="col-span-2">
        {/**Stories */}
        <Stories />
      </section>

      <section></section>
    </main>
  )
}

export default Feed
