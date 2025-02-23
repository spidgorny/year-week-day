"use client";
import { useMediaQuery } from "usehooks-ts";
import Container from "react-bootstrap/Container";
import React, { PropsWithChildren } from "react";

export function ContainerMaybeFluid(props: PropsWithChildren) {
  const isMobile = useMediaQuery("(max-width: 800px)");
  return <Container fluid={isMobile}>{props.children}</Container>;
}
