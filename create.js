export const createUseLinkedContext = ({ useState, useCallback, useContext, useEffect }) => {
  const contextToValue = new WeakMap();
  const contextToSubscribers = new WeakMap();

  return function useLinkedContext(Context) {
    const [_, forceUpdate] = useState({});
    const cb = useCallback(
      (value) => {
        contextToValue.set(Context, value);
        forceUpdate({});
      },
      [Context]
    );
    const value = useContext(Context);

    useEffect(() => {
      return () => {
        const subscribers = contextToSubscribers.get(Context);
        contextToSubscribers.set(
          Context,
          subscribers.filter((v) => v !== cb)
        );
      };
    }, []);

    useEffect(() => {
      const subscribers = contextToSubscribers.get(Context);
      if (!Array.isArray(subscribers)) return;
      subscribers.forEach((update) => update(value));
    }, [value]);

    const sharedValue = contextToValue.get(Context) || value;
    if (contextToValue.has(Context)) {
      const sharedCallbacks = contextToSubscribers.get(Context);
      contextToSubscribers.set(Context, [...sharedCallbacks, cb]);
    } else {
      contextToValue.set(Context, value);
      contextToSubscribers.set(Context, [cb]);
    }
    return sharedValue;
  };
};
