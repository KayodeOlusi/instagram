import { faker } from '@faker-js/faker'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Story from './Story'

interface Suggestions {
  id: number
  name: string
  username: string
  avatar: string
  email: string
  dob: Date
  phone: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  website: string
  company: {
    bs: string
    catchPhrase: string
    name: string
  }
}

const Stories: React.FC = () => {
  const { data: session } = useSession()
  const [suggestions, setSuggestions] = useState<Suggestions[]>([])

  useEffect(() => {
    const suggestions: Suggestions[] = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }))

    setSuggestions(suggestions)
  }, [])

  return (
    <div
      className="mt-8 flex space-x-2 overflow-x-scroll
      rounded-sm border border-gray-200 bg-white p-6
      scrollbar-thin scrollbar-thumb-black"
    >
      {suggestions?.map((profile) => (
        <Story
          key={profile.id}
          img={profile.avatar}
          username={profile.username}
        />
      ))}
    </div>
  )
}

export default Stories
