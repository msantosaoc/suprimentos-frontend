'use client';
import React from 'react';
import { JsxElement } from 'typescript';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    loading?: boolean;
    Icon?: JsxElement
}

function CancelButton({children, Icon, loading, ...rest}: ButtonProps) {
  return (
    <button className='w-full h-8 text-red-900 text-sm hover:brightness-105 hover:scale-105 transition' disabled={loading} {...rest}>{children}</button>
  )
}

export default CancelButton