"use client";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import React from "react";

export function MainNavbar() {
  return (
    <Navbar bg="light" expand="lg" className="px-3">
      <Navbar.Brand href=".">Year-Week-Day</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="https://github.com/spidgorny/year-week-day/issues">
            Problem/Suggestion?
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
