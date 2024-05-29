import React from 'react';
import "./globals.css";
import NavLink, {} from "../../components/NavLink";

export default function RootLayout({children}) {
  return (
    <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <body className='bg-gray-900'>
      <nav className='p-4 border-b-[1px] border-b-gray-600' >
        <ul className='text-slate-100 text-lg'>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/todo-lists">TodoList</NavLink>
        </ul>
      </nav>
      <h1>hello</h1>
      {children}
    </body>
    </html>
  );
}
