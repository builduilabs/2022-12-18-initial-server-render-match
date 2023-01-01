🟢 Step

In this video we're going to talk about how to change some default React state based on the screen size, in a way that's robust to SSR. This is actually a little bit trickier than you might think, but I promise you're gonna learn a thing or two along the way.

🟢 Step

```jsx
let [open, setOpen] = useState(window.innerWidth >= 1024);
```

END ON MOBILE

```jsx
let [open, setOpen] = useState(
  typeof window !== "undefined" && window.innerWidth >= 1024
);
```

Show on mobile, works. Show on desktop, breaks.

This hydration error won't show in production but it will log an error to the console, and
it's always something that should be addressed. Even if it doesn't seem like it's causing bugs,
take a closer look.

Debugger. Flash.

So big takeaway here is that you only want to rely on APIs that exist in both the server and the client so that the initial render from each match. And window doesn't exist on the server, so we can't rely on that for the first render.

So let's put this back to true. And ask:

hat can we do instead?

🟢 Step

Let's come here and comment out all the JS for a second. And if we take a look, we'll see that we're already using CSS to style the sidebar different on mobile and desktop. And CSS is robust to server side rendering – you can use any CSS feature for the initial render of your app.

So can we use CSS to hide the sidebar on desktop? Sure we can!

🟢 Step

```jsx
<div className="hidden lg:sticky lg:flex lg:h-screen" />
```

It works, and it's robust to SSR: if I refresh on large screens, it's there, and if I refresh on small, it's hidden.

But of course, we need to bring back React to be able to acatually toggle this panel. So what happens if we do that?

END ON DESKTOP

🟢 Step

If we bring back the javascript and save, we'll see it works on desktop, but it doesn't work on mobile. And that's because even though our sidebar is being rendered here, it's being hidden with CSS here.

So the problem is that we don't have a single source of truth for whether our sidebar should be hidden.

So what should we do?

🟢 Step

Need a single source of truth.

On first render, CSS needs to be the source of truth, since it's robust to SSR. Then once react hydrates, and the client render matches the server render, then our React state can become the single source of truth.

So how can we do this?

We need a third state for our `isOpen` variable, something that tells us its actually not the source of truth yet. Let's make it undefined.

```jsx
let [open, setOpen] = useState(undefined);
```

Now this makes TS unhappy because it thinks this variable should always undefined, so we can fix this like this:

```jsx
let [open, setOpen] = useState<boolean>();
```

Ok, and now when we're in this state, we want this to always render on the initial render. We don't want JS to interfere bc the source of truth is CSS:

```
{open === undefined && (
```

So now we see this works for the initial render on desktop and on mobile.

So now that our first render works – how do we move the source of truth from CSS to our React state?

Well an effect sounds like a perfect way to solve this. Effects run after render, so we don't have to worry about them messing up our initial render either on the server or the client.

And in this effect, since we know we're on the client, we can safely access `window`. And we can use the effect to seed the initial value of open, to move it from undefined to one of the other two states:

```jsx
useEffect(() => {
  let initialOpen = window.innerWidth >= 1024;

  if (open === undefined) {
    setOpen(initialOpen);
  }
}, [open]);
```

Let's drop a console in and see what we have. We've updated our state correctly based on the window size for that second render.

So now all that's left is to use this state to actually control showing or hiding the sidebar starting on the second render.

```jsx
{(open === undefined || open === true) && (
```

Iniital render correct, state correct. And we can see the sidebar.

Now let's try our button. If we go to desktop, everything is working. But if we go to mobile, don't see our sidebar. That's because our hidden class is still taking effect. So in the 2nd render we still have two sources of truth: JS and CSS.

So what we want to do is only render the CSS class on the first render. And we can do that using an expression.

```jsx
className={`${
  open === undefined ? "hidden lg:flex" : "flex"
} fixed inset-y-0 right-0 lg:sticky lg:h-screen`}
```

CSS class no longer being applied after the first render.

Let's triple check our work with a `debugger`.

🟢 Step

Let's clean up this code a little bit.

Bit more clear:

```jsx
let isInitialRender = open === undefined;
```

Next, this is a bummer:

```jsx
className={`${
  isInitialRender ? "hidden lg:flex" : "flex"
} fixed inset-y-0 right-0 lg:sticky lg:h-screen`}
```

Hard to change, understand.

```jsx
className={`${
  isInitialRender ? "max-lg:hidden" : ""
} fixed inset-y-0 right-0 lg:sticky flex lg:h-screen`}
```

Can even move it to another div to clarify even more:

```jsx
<div className={isInitialRender ? "max-lg:hidden" : ""}>
```

Finally, coupling between this class and this number. So this number is something of a magic number.

Change max-lg:hidden to max-md:hidden. Breaks.

Can actually read display state with getComputedStyle.

```jsx
let sidebarRef = useRef(null);
```

```jsx
if (isInitialRender && sidebarRef.current) {
  setOpen(window.getComputedStyle(sidebarRef.current).display !== "none");
}
```

So there you have it.

---

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
