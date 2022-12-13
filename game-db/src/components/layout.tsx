import React from 'react';
import { Outlet, Link } from "react-router-dom";
import { LayoutProps } from '../app.interface';
import '../styles.css';

export function Layout ({ snippetList, stepNum}:LayoutProps) {
  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/admin">Admin</Link></li>
          <li><Link to="/step">Step</Link></li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
}