'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Menu, X, Search } from 'lucide-react';
import SearchInput from '../ui/SearchInput'; // pastikan path benar

// 🔹 Daftar navigasi
const navItems = [
  { name: 'home', href: '/' },
  { name: 'favorites', href: '/favorites' },
];

const HEADER_HEIGHT_PX = 68;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // 🔹 Toggle menu (mobile)
  const toggleMenu = () => {
    if (!isOpen && isSearchOpen) setIsSearchOpen(false); // tutup search jika menu dibuka
    setIsOpen((prev) => !prev);
  };

  // 🔹 Toggle search bar (mobile)
  const toggleSearch = () => {
    if (!isSearchOpen && isOpen) setIsOpen(false); // tutup menu jika search dibuka
    setIsSearchOpen((prev) => !prev);
  };

  // 🔹 Efek saat komponen pertama kali muncul
  useEffect(() => {
    setIsMounted(true);

    // Kunci scroll saat menu terbuka
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';

    // Cleanup (pastikan overflow dikembalikan ke normal)
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // 🔹 Styling dinamis untuk menu mobile
  const menuProps = {
    className: `
      md:hidden ${isMounted ? 'fixed' : 'absolute'}
      left-0 w-full ${isMounted ? 'h-screen' : ''}
      z-40 transition-transform duration-300 ease-in-out
      transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      bg-[#0A0D12]
    `,
    style: isMounted ? { top: `${HEADER_HEIGHT_PX}px` } : {},
  };

  // 🔹 Styling dinamis untuk search bar mobile
  const searchProps = {
    className: `
      md:hidden absolute w-full transition-all duration-300 ease-in-out
      ${
        isSearchOpen
          ? 'max-h-20 opacity-100 py-3'
          : 'max-h-0 opacity-0 overflow-hidden'
      }
      bg-[#0A0D12] px-4 z-40
    `,
    style: isMounted ? { top: `${HEADER_HEIGHT_PX}px` } : {},
  };

  return (
    <header className='sticky top-0 z-50'>
      {/* === HEADER BAR === */}
      <div
        className={`w-full flex items-center justify-between p-4 md:p-5 
        bg-[#0A0D1299] backdrop-blur-2xl h-[${HEADER_HEIGHT_PX}px]`}
      >
        {/* === KIRI: Logo & Navigasi Desktop === */}
        <div className='flex items-center'>
          {/* Logo */}
          <Link href='/' className='flex-shrink-0'>
            <Image
              src='/images/Logo.png'
              alt='Logo'
              width={120}
              height={100}
              priority
              className='cursor-pointer w-24 h-auto md:w-40'
            />
          </Link>

          {/* Navigasi Desktop */}
          <nav className='hidden md:flex items-center ml-8 lg:ml-12 space-x-6'>
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className='text-white capitalize text-lg font-medium hover:text-red-500 transition'
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* === KANAN: Search + Tombol Mobile === */}
        <div className='flex items-center space-x-3'>
          {/* Search Input Desktop */}
          <div className='hidden md:block'>
            <SearchInput />
          </div>

          {/* Tombol Mobile */}
          <div className='flex items-center space-x-3 md:hidden'>
            {/* Tombol Search */}
            <button
              onClick={toggleSearch}
              className='p-2 text-gray-400 hover:text-white transition'
              aria-label='Toggle Search'
            >
              <Search className='h-6 w-6' />
            </button>

            {/* Tombol Menu */}
            <button
              onClick={toggleMenu}
              className='p-2 rounded-md text-gray-400 hover:text-white transition'
              aria-label='Toggle Menu'
            >
              {isOpen ? (
                <X className='h-7 w-7' />
              ) : (
                <Menu className='h-7 w-7' />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* === MENU OVERLAY MOBILE === */}
      <div className={menuProps.className} style={menuProps.style}>
        {/* Tombol Close */}
        <div className='flex justify-end p-4 h-16 items-center'>
          <button
            onClick={toggleMenu}
            className='p-2 text-gray-400 hover:text-white'
            aria-label='Close Menu'
          >
            <X className='h-8 w-8' />
          </button>
        </div>

        {/* Isi Menu */}
        <div className='px-5 space-y-5 flex flex-col pt-10'>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className='text-white capitalize text-2xl font-bold hover:text-red-500 transition'
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* === SEARCH BAR MOBILE === */}
      <div className={searchProps.className} style={searchProps.style}>
        <SearchInput />
      </div>
    </header>
  );
};

export default Header;
