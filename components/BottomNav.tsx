import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';
import { PlusCircleIcon } from '@heroicons/react/outline';
import { HomeIcon, HeartIcon, CameraIcon } from '@heroicons/react/solid';

const BottomNav: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);

  return (
    <div className="fixed bottom-0 z-50 flex w-full items-center justify-between bg-white p-2 md:hidden">
      <HomeIcon className="bottomNavBtn" onClick={() => router.push('/')} />
      <PlusCircleIcon
        onClick={() => setIsOpen(true)}
        className="bottomNavBtn"
      />
      <HeartIcon className="bottomNavBtn" />
      {session ? (
        <img
          src={session?.user?.image!}
          alt=""
          className="h-8 w-8 cursor-pointer rounded-full md:hidden"
        />
      ) : (
        <CameraIcon className="bottomNavBtn" />
      )}
    </div>
  )
}

export default BottomNav
