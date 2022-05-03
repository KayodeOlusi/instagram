interface Props {
  img: string
  username: string
}

const Story: React.FC<Props> = ({ img, username }) => {
  return (
    <div>
      <img
        className="object contain h-14 w-14 cursor-pointer
         rounded-full border-2 border-red-500 p-[1.5px]
         transition duration-200 ease-out hover:scale-110"
        src={img}
        alt=""
      />
      <p className="w-14 transform truncate text-center text-xs">{username}</p>
    </div>
  )
}

export default Story
