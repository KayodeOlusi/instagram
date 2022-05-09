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
import { useState } from 'react'
import {
  addDoc,
  collection,
  DocumentData,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase'
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
  const [postComments] = useCollection<DocumentData>(
    query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc'))
  )

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
            <HeartIcon className="btn" />
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>

          <BookmarkIcon className="btn" />
        </div>
      )}

      {/**Caption */}
      <p className="truncate p-5">
        <span className="mr-1 font-bold">{userName}</span> {caption}
      </p>

      {/**Comments */}

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
            onClick={sendComment}
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
