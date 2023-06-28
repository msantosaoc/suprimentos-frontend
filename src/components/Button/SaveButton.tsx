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
    <button className='w-full h-8 bg-light-blue rounded-2xl shadow-sm border-white border text-white text-sm hover:brightness-105' disabled={loading} {...rest}>{children}</button>
  )
}

export default SaveButton