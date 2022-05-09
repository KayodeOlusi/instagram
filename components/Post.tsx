import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'
import {
  BookmarkIcon,
  ChatIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
  DotsHorizontalIcon,
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { db } from '../firebase'
import Moment from 'react-moment'
import { useCollection } from 'react-firebase-hooks/firestore'

interface Props {
  id: any
  userName: string
  img: string
  caption: string
  userImage: string
}

const Post: React.FC<Props> = ({ id, userName, img, caption, userImage }) => {
  const { data: session } = useSession()
  const [comment, setComment] = useState<string>('')
  const [hasLiked, setHasLiked] = useState<boolean>(false)
  const [likesData] = useCollection(collection(db, 'posts', id, 'likes'))
  const [postComments] = useCollection<DocumentData>(
    query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc'))
  )

  useEffect(() => {
    // @ts-ignore
    setHasLiked(
      Boolean(
        // @ts-ignore
        likesData?.docs.findIndex((like) => like.id === session?.user?.uid) !==
          -1
      )
    )
  }, [likesData])

  // Like a post
  const likePost = async () => {
    if (hasLiked) {
      // @ts-ignore
      await deleteDoc(doc(db, 'posts', id, 'likes', session?.user?.uid))
    } else {
      // @ts-ignore
      await setDoc(doc(db, 'posts', id, 'likes', session?.user?.uid), {
        username: session?.user?.name,
      })
    }
  }

  // Add a comment to a selected post
  const sendComment = async (e: Event) => {
    e.preventDefault()

    const commentToSend: string = comment
    setComment('')

    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: commentToSend,
      username: session?.user?.name,
      userImage: session?.user?.image,
      timestamp: serverTimestamp(),
    })
  }

  return (
    <div className="my-7 rounded-sm border bg-white">
      {/**Header */}
      <div className="flex items-center p-5">
        <img
          src={userImage}
          alt=""
          className="mr-3 h-12 w-12 rounded-full border object-contain p-1"
        />
        <p className="flex-1 font-bold">{userName}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>

      {/**Image */}
      <img src={img} className="w-full object-cover" alt="" />

      {/**Buttons */}
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="btn text-red-500"
              />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>

          <BookmarkIcon className="btn" />
        </div>
      )}

      {/**Caption */}
      <p className="truncate p-5">
        {likesData ? (
          likesData?.docs.length > 0 ? (
            <p className="mb-1 font-bold">{likesData?.docs.length} likes</p>
          ) : null
        ) : null}
        <span className="mr-1 font-bold">{userName}</span> {caption}
      </p>

      {/**Comments */}
      {postComments?.docs.length && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thin scrollbar-thumb-black">
          {postComments.docs.map((post) => {
            const { id, comment, username, userImage, timestamp } = post.data()
            {
              return (
                <div key={id} className="mb-1 flex items-center space-x-2">
                  <img src={userImage} alt="" className="h-7 rounded-full" />
                  <p className="flex-1 text-xs">
                    <span className="text-xs font-bold">{username} </span>
                    {comment}
                  </p>

                  <Moment fromNow className="pr-5 text-xs">
                    {timestamp?.toDate()}
                  </Moment>
                </div>
              )
            }
          })}
        </div>
      )}

      {/**Input Box */}
      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7" />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 border-none outline-none focus:ring-0"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment as any}
            className="font-semibold text-blue-400 "
          >
            Post
          </button>
        </form>
      )}
    </div>
  )
}

export default Post
