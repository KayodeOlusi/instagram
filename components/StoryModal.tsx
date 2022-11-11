import { Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface Props {
  image: string;
  userName: string;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const StoryModal: React.FC<Props> = ({
  image,
  userName,
  setShowModal,
  showModal,
}) => {
  useEffect(() => {
    setTimeout(() => {
      setShowModal(false)
    }, 3000)
  }, [])

  return (
    <div>
      <Transition.Root show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setShowModal(false)}
        >
          <div className="flex min-h-[800px] items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:min-h-screen sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <span
              aria-hidden="true"
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div
                className="mb-64 inline-block h-60 transform overflow-hidden
                rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all
                sm:my-8 sm:w-full sm:max-w-sm sm:p-2 sm:align-middle"
              >
                <img
                  src={image}
                  alt="No Image"
                  className="h-full w-full cursor-pointer object-contain"
                />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}

export default StoryModal
