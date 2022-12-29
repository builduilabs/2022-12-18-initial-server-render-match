import { useEffect, useState } from "react";
import * as Icons from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";

export default function Page() {
  let [open, setOpen] = useState<boolean>();
  let { width } = useInitialWindowSize();
  let isInitialRender = width === undefined;

  if (width && open === undefined) {
    setOpen(width > 768);
  }

  return (
    <div className="flex min-h-full bg-gray-800 text-gray-400">
      <div className="flex flex-col flex-1">
        <header className="border-gray-700 bg-gray-800 px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm font-medium">
            <p className="text-gray-500">Projects</p>
            <p className="text-gray-500">/</p>
            <p>Desktop app</p>
          </div>
          <button
            className="hover:bg-gray-700 rounded p-1"
            onClick={() => setOpen(!open)}
          >
            <Icons.Bars3Icon className="w-6 h-6" />
          </button>
        </header>

        <main className="flex-1 border-t border-gray-600">
          <div className="max-w-md mx-auto">
            <p className="p-4">Main</p>
          </div>
        </main>
      </div>

      {isInitialRender ? (
        <div className="hidden lg:flex absolute right-0 inset-y-0 lg:relative">
          <Sidebar onClose={() => setOpen(false)} />
        </div>
      ) : (
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="absolute right-0 inset-y-0 lg:relative flex"
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
      <div className="flex justify-between h-16 items-center text-sm">
        <p className="px-4">Sidebar</p>
        <button onClick={onClose} className="p-4 lg:hidden">
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
