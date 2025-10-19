import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='w-full border-t border-[#252B37] bg-black'>
      <div className='max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 p-5 text-center md:text-left'>
        {/* Logo */}
        <Link href='/' className='flex-shrink-0'>
          <Image
            src='/images/Logo.png'
            alt='Movie Explorer Logo'
            width={160}
            height={100}
            priority
            className='cursor-pointer w-36 md:w-40 h-auto'
          />
        </Link>

        {/* Copyright */}
        <p className='text-gray-400 text-sm md:text-base'>
          © {new Date().getFullYear()}{' '}
          <span className='font-semibold text-[#535862]'>Movie Explorer</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
