"use client";

import SlidingPane from "react-sliding-pane";
import { PropsWithChildren } from "react";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { useMediaQuery } from "usehooks-ts";

export function SlidingPaneAutoWidth(
  props: PropsWithChildren<{
    title: string;
    isOpen: boolean;
    onRequestClose: () => void;
  }>,
) {
  const isLargeScreen = useMediaQuery("(min-width: 768px)");

  return (
    <SlidingPane
      title={props.title}
      isOpen={props.isOpen}
      width={isLargeScreen ? "50%" : "100%"}
      onRequestClose={props.onRequestClose}
    >
      <style>
        {`
						.slide-pane__header {
							background-color: #343a40;
							color: white;
						}
						.slide-pane__content {
							background-color: #f8f9fa;
						}						
				`}
      </style>
      {props.children}
    </SlidingPane>
  );
}
