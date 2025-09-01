import React from 'react';

const Navbar = () => {
  const primaryColor = '#ea2a33';

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-800 px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center gap-6 lg:gap-10">
        {/* Logo */}
        <div className="flex items-center gap-2 text-white">
          <svg
            className="h-8 w-8"
            style={{ color: primaryColor }}
            fill="none"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor" />
          </svg>
          <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em]">
            CineView
          </h2>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {["Home", "Movies", "TV Shows", "Genres"].map((item) => (
            <a
              key={item}
              className="text-gray-300 hover:text-white text-sm font-medium leading-normal transition-colors"
              href="#"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>

      {/* Right Side (Search + Icons + Avatar) */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <label className="hidden sm:flex flex-col min-w-40 !h-10 max-w-64">
          <div className="flex w-full flex-1 items-stretch rounded-md h-full">
            <div className="text-gray-400 flex border-none bg-gray-800 items-center justify-center pl-3 rounded-l-md border-r-0">
              <svg
                fill="currentColor"
                height="20px"
                viewBox="0 0 256 256"
                width="20px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
              </svg>
            </div>
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-md text-white focus:outline-0 focus:ring-0 border-none bg-gray-800 focus:border-none h-full placeholder:text-gray-400 px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal"
              placeholder="Search"
            />
          </div>
        </label>

        {/* Bookmark Button */}
        <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 w-10 bg-gray-800 hover:bg-gray-700 text-white transition-colors">
          <svg
            fill="currentColor"
            height="20px"
            viewBox="0 0 256 256"
            width="20px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Zm0,177.57-51.77-32.35a8,8,0,0,0-8.48,0L72,209.57V48H184Z" />
          </svg>
        </button>

        {/* Avatar */}
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDRwvFniIOmhzeb-BKlaHDUMCqt_uEp5DNKC8oQPDFKXwRQOkqSkzhGnBimMpXWBzWo6A8fzScBEmIeD-21dHZTZEFOsjNko5Fo_ziwxIchzDNp9i8-_x6pycarwtdN_UPQxKxWRVGj7ySIDI4YYuGW3ngh8OVByqCF3S4XgRhdB1jNq_51L3M4urFJb1eEGArFNgNjRTZPYXQ_5QrR2fkGPzDopAAD6brgwyS05TMvJQXC_NfoS4e8P7Og1u0qS-9h8ZzTCSkASJg")',
          }}
        />
      </div>
    </header>
  );
};

export default Navbar;