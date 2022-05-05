import { GetServerSideProps } from 'next'
import { BuiltInProviderType } from 'next-auth/providers'
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from 'next-auth/react'

interface Props {
  providers: Promise<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>
}

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders()
  console.log(providers, 'providers')

  return {
    props: {
      providers,
    },
  }
}

const SignIn: React.FC<Props> = ({ providers }) => {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign In with {provider.name}
          </button>
        </div>
      ))}
    </>
  )
}

export default SignIn
