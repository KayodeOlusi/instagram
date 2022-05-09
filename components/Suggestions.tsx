import { faker } from '@faker-js/faker'
import { useEffect, useState } from 'react'

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

const Suggestions: React.FC = () => {
  const [suggestions, setSuggestions] = useState<Suggestions[]>([])

  useEffect(() => {
    const suggestions: Suggestions[] = [...Array(5)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }))

    setSuggestions(suggestions)
  }, [])

  return (
    <div className="mt-4 ml-10">
      <div className="text-small mb-5">
        <h3 className="text0sm font-bold text-gray-400">Suggestions for you</h3>
      </div>

      {suggestions?.map((profile) => (
        <div
          key={profile.id}
          className="mt-3 flex items-center justify-between"
        >
          <img
            src={profile.avatar}
            className="h-10 w-10 rounded-full border p-[2px]"
            alt=""
          />

          <div className="ml-4 flex-1">
            <h2 className="text-sm font-semibold">{profile.username}</h2>
            <h3 className="text-sm text-gray-400">
              Works at {profile.company.name}
            </h3>
          </div>
          <button className="ml-5 text-sm font-bold text-blue-400">
            Follow
          </button>
        </div>
      ))}
    </div>
  )
}

export default Suggestions
