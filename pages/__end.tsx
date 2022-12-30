import { useEffect, useState } from "react";
import * as Icons from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";

export default function Page() {
  let [open, setOpen] = useState<boolean>();
  let { width } = useInitialWindowSize();

  if (width && open === undefined) {
    setOpen(width >= 1024);
  }

  return (
    <div className="flex min-h-full">
      <div className="flex flex-col flex-1">
        <header className="sticky top-0 inset-x-0 border-b border-gray-700 bg-gray-800 px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm font-medium">
            <p className="text-gray-500">Projects</p>
            <p className="text-gray-500">/</p>
            <p>Customer Support</p>
          </div>

          <button
            className="hover:bg-white/10 rounded p-1"
            onClick={() => setOpen(!open)}
          >
            <Icons.Bars3Icon className="w-6 h-6" />
          </button>
        </header>

        <main className="lg:pt-16 flex-1 pt-6 px-4">
          <div className="mx-auto max-w-xl">
            <p className="text-2xl lg:text-5xl text-white">Customer Support</p>
            <div className="mt-6 lg:mt-16 space-y-4 lg:space-y-6 lg:text-lg">
              {[...Array(20).keys()].map((i) => (
                <p key={i}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Recusandae est asperiores eaque assumenda necessitatibus sint
                  labore? Ipsam consequuntur dolorem illo laudantium velit,
                  aliquid ut voluptas debitis officiis. Eligendi, perspiciatis
                  cum?
                </p>
              ))}
            </div>
          </div>
        </main>
      </div>

      {width === undefined ? (
        <div className="hidden lg:flex absolute right-0 inset-y-0 lg:relative">
          <Sidebar onClose={() => setOpen(false)} />
        </div>
      ) : (
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              variants={{
                open: width >= 1024 ? { width: "auto" } : { x: "0%" },
                closed: width >= 1024 ? { width: 0 } : { x: "100%" },
              }}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed right-0 inset-y-0 lg:sticky lg:h-screen flex"
            >
              <Sidebar onClose={() => setOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

function Sidebar({ onClose }: { onClose: () => void }) {
  return (
    <div className="lg:w-96 bg-gray-900 shadow-xl w-64">
      <div className="flex justify-between h-16 border-b border-transparent items-center text-sm">
        <p className="px-4 font-medium">Sidebar</p>
        <button
          onClick={onClose}
          className="lg:hidden hover:bg-white/10 rounded p-1 mr-4"
        >
          <Icons.XMarkIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

function useInitialWindowSize() {
  const [windowSize, setWindowSize] = useState<{
    width?: number;
    height?: number;
  }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  return windowSize;
}
