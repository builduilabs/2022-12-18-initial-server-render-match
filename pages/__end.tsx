import { useEffect, useState } from "react";
import * as Icons from "@heroicons/react/24/solid";

export default function Page() {
  let [open, setOpen] = useState<boolean>();
  let { width } = useWindowSize();
  debugger;

  if (width && open === undefined) {
    setOpen(width >= 1024);
  }

  return (
    <div className="flex min-h-full">
      <div className="flex flex-1 flex-col">
        <header className="sticky inset-x-0 top-0 flex h-16 items-center justify-between border-b border-gray-700 bg-gray-800 px-4">
          <div className="flex items-center space-x-4 text-sm font-medium">
            <p className="text-gray-500">Projects</p>
            <p className="text-gray-500">/</p>
            <p>Customer Support</p>
          </div>

          <button
            className="rounded p-1 hover:bg-white/10"
            onClick={() => setOpen(!open)}
          >
            <Icons.Bars3Icon className="h-6 w-6" />
          </button>
        </header>

        <main className="flex-1 px-4 pt-6 lg:pt-16">
          <div className="mx-auto max-w-xl">
            <p className="text-2xl text-white lg:text-5xl">Customer Support</p>
            <div className="mt-6 space-y-4 lg:mt-16 lg:space-y-6 lg:text-lg">
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

      {open && (
        <div className={width === undefined ? "max-[1024px]:hidden" : ""}>
          <div className="fixed inset-y-0 right-0 flex lg:sticky lg:h-screen">
            <div className="w-64 bg-gray-900 shadow-xl lg:w-96">
              <div className="flex h-16 items-center justify-between border-b border-transparent text-sm">
                <p className="px-4 font-medium">Sidebar</p>
                <button
                  onClick={() => setOpen(false)}
                  className="mr-4 rounded p-1 hover:bg-white/10 lg:hidden"
                >
                  <Icons.XMarkIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// https://usehooks.com/useWindowSize/
function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
}
