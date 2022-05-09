import { collection, DocumentData } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../firebase'
import Post from './Post'

const Posts: React.FC = () => {
  const [posts] = useCollection<DocumentData>(collection(db, 'posts'))

  return (
    <div>
      {posts?.docs.map((post) => {
        const { caption, image, profileImage, username } = post.data()

        return (
          <Post
            id={post.id}
            key={post.id}
            userName={username}
            userImage={profileImage}
            img={image}
            caption={caption}
          />
        )
      })}
    </div>
  )
}

export default Posts
