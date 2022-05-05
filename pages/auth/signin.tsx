import { GetServerSideProps } from 'next'
import { BuiltInProviderType } from 'next-auth/providers'
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from 'next-auth/react'
import Header from '../../components/Header'

interface Props {
  providers: Promise<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>
}

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}

const SignIn: React.FC<Props> = ({ providers }) => {
  return (
    <>
      <Header />

      <div className="mt-20 flex flex-col items-center justify-center text-center">
        <img className="w-80" src="https://links.papareact.com/ocw" alt="" />

        <div className="mt-40">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="rounded-lg bg-blue-500 p-3 text-white"
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              >
                Sign In with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default SignIn
