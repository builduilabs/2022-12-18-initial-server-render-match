import { useEffect, useState } from "react";
import * as Icons from "@heroicons/react/24/solid";

export default function Page() {
  let [open, setOpen] = useState<undefined | boolean>();
  let { width } = useInitialWindowSize();

  if (width && open === undefined) {
    setOpen(width > 768);
  }

  return (
    <div className="flex min-h-full bg-gray-800 text-gray-400">
      <div className="flex flex-col flex-1">
        <header className="shadow-lg bg-gray-800 p-4 flex items-center justify-between">
          <p>Header</p>
          <button
            className="hover:bg-gray-700 rounded p-1"
            onClick={() => setOpen(!open)}
          >
            <Icons.Bars3Icon className="w-6 h-6" />
          </button>
        </header>
        <div className="flex-1">
          <p className="p-4">Main</p>
        </div>
      </div>

      {(width === undefined || open) && (
        <div
          className={`${
            width === undefined ? "initial-mobile:hidden" : ""
          } w-96 bg-gray-900 shadow-xl`}
        >
          <p className="p-4">Sidebar</p>
        </div>
      )}
    </div>
  );
}

function useInitialWindowSize() {
  const [windowSize, setWindowSize] = useState({
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
