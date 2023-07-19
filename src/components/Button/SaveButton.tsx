'use client';
import React from 'react';
import { JsxElement } from 'typescript';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    loading?: boolean;
    Icon?: JsxElement
}

function SaveButton({children, Icon, loading, ...rest}: ButtonProps) {
  return (
    <button className='w-full h-8 bg-light-blue rounded-2xl shadow-sm items-center justify-center inline-flex border-white border text-white text-sm hover:brightness-105' disabled={loading} {...rest}>
      { loading ? (      
      <svg className="animate-spin m-auto h-5 w-5 absolute text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      
  ): (
  <a className='decoration-transparent text-white hover:text-white  '>
      {children}
  </a>

  )}
      </button>
  )
}

export default SaveButton