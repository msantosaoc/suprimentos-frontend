'use client';
import React from 'react';
import { JsxElement } from 'typescript';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    loading?: boolean;
    Icon?: JsxElement
}

function ButtonLogin({children, Icon, loading, ...rest}: ButtonProps) {
  return (
    <button className='w-11/12 h-8 bg-light-blue rounded-md text-white text-sm hover:brightness-105' disabled={loading} {...rest}>{children}</button>
  )
}

export default ButtonLogin