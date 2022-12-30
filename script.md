🟢 Step

```jsx
let [open, setOpen] = useState(window.innerWidth >= 1024);
```

Show on mobile, works. Show on desktop, breaks.

This hydration error won't show in production but it will log an error to the console, and
it's always something that should be addressed. Even if it doesn't seem like it's causing bugs,
take a closer look.

Debugger. Flash.

So big takeaway here is that you only want to rely on APIs that exist in both the server and the client
so that the initial render from each match. And window doesn't exist on the server, so we can't
rely on that for the first render.

So what can we do instead?

🟢 Step

Let's come here and comment out all the JS for a second. And if we take a look, we'll see that we're already using CSS to style the sidebar different on mobile and desktop. And CSS is robust to server side rendering – you can use any CSS feature for the initial render of your app.

So can we use CSS to hide the sidebar on desktop? Sure we can!

```jsx
<div className="hidden lg:sticky lg:flex lg:h-screen" />
```

🟢 Step

```jsx
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
```
