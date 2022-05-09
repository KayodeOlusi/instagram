import React, { Dispatch, SetStateAction, useState } from 'react'
import StoryModal from './StoryModal'

interface Props {
  img: string
  username: string
}

const Story: React.FC<Props> = ({ img, username }) => {
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <React.Fragment>
      {showModal && (
        <StoryModal
          showModal={showModal}
          setShowModal={setShowModal}
          image={img}
          userName={username}
        />
      )}
      <div onClick={() => setShowModal(true)}>
        <img
          className="object contain h-14 w-14 cursor-pointer
         rounded-full border-2 border-red-500 p-[1.5px]
         transition duration-200 ease-out hover:scale-110"
          src={img}
          alt=""
        />
        <p className="w-14 transform truncate text-center text-xs">
          {username}
        </p>
      </div>
    </React.Fragment>
  )
}

export default Story
