import React, { PropsWithChildren } from "react";
import moment from "moment/moment";

export const RectContext = React.createContext(
  {} as {
    rectState: {};
    setRectState: (
      date: moment.Moment,
      state: {
        bottom: number;
        height: number;
        left: number;
        right: number;
        top: number;
        width: number;
      },
    ) => void;
  },
);

export function RectContextProvider(props: PropsWithChildren) {
  const [rectState, setRectStateRaw] = React.useState({});

  let setRectState = (date: moment.Moment, rect: DOMRect) =>
    setRectStateRaw((state) => ({
      ...state,
      [date.toISOString().substring(0, 10)]: rect,
    }));
  return (
    <RectContext.Provider
      value={{
        rectState,
        setRectState,
      }}
    >
      {props.children}
    </RectContext.Provider>
  );
}
