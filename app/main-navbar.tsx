"use client";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BsCalendarWeek } from "react-icons/bs";

export function MainNavbar() {
  const { userId } = useParams();

  return (
    <Navbar bg="light" expand="lg" className="px-3">
      <Navbar.Brand href="." className="d-flex gap-3 align-items-center">
        <BsCalendarWeek />
        Year-Week-Day
      </Navbar.Brand>
      <Navbar.Text>
        <Link href={`/${userId}/events`} className="nav-link">
          All Events
        </Link>
      </Navbar.Text>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="https://github.com/spidgorny/year-week-day/issues">
            Problem/Suggestion?
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
