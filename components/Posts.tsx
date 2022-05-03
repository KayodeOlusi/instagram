import Post from './Post'

interface APost {
  id: any
  username: string
  img: string
  userImg: string
  caption: string
}

const Posts: React.FC = () => {
  const posts: APost[] = [
    {
      id: '123',
      username: 'sssangha',
      img: 'https://links.papareact.com/3ke',
      userImg: 'https://links.papareact.com/3ke',
      caption: 'CLICK THE LIKE BUTTON',
    },
    {
      id: '123',
      username: 'sssangha',
      img: 'https://links.papareact.com/3ke',
      userImg: 'https://links.papareact.com/3ke',
      caption: 'CLICK THE LIKE BUTTON',
    },
    {
      id: '123',
      username: 'sssangha',
      img: 'https://links.papareact.com/3ke',
      userImg: 'https://links.papareact.com/3ke',
      caption: 'CLICK THE LIKE BUTTON',
    },
  ]

  return (
    <div>
      {posts?.map((post) => (
        <Post
          id={post.id}
          key={post.id}
          userName={post.username}
          userImage={post.userImg}
          img={post.img}
          caption={post.caption}
        />
      ))}
    </div>
  )
}

export default Posts
