import React from 'react';

const Watchlist = () => {
  const watchlistItems = [
    {
      title: 'The Midnight Horizon',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDk9wnypWAlzFiiJfm5wS7CtmrJUuQhJr6GkUJ2wnY4CTFJB4Ytwip7-2FgLgLQ-p3ASzwW6mQmSXiawo5CGBoibRkSfSounGp6SRhOAsLAf0RMRXSN2BaOFQ6NXzGhrSXN4NR6Q6_u527tossw7wy-nAlI7VCVLO3ER1E-g4I_V0ExjrUKvjHd9-i1_gcodWPxG9NWDYitxja4okPo80F2Bnc9DeZ-tsqD0Ro_5Dwl51Hdww2yvHol4ObBXsQ-GsZD6yS43g7cG30',
    },
    {
      title: 'Echoes of the Past',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATpDftn4BpEf4WGdz6pcJFpFVAu-5wMWQa-564Tve2vzj413dto5t14FeTlwdRa-m-BdDvhiyfhoMVMCABnGfMJOm-tKgnVuJDJLMm-zX5GzSDOm5tNmPoPliu0acnvFlAurg0cE_768O2tr6FjFI0PbTToNiRbiyKmnZJ7TdMny-RCEy6sOAW5jRORDOEswtxrleYIxSX78oMXzW5jwHXIfzsrlwdmzdqMpZqS9WiRd3KsgSQQi0Ghaaf8IPK-f-oY3Z9xwX8Tqs',
    },
    {
      title: 'Crimson Tide',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCf5jRZgeNjAPN3QtGGQ6x5aXdGqHpi62yIQtS8QTD0gmXL5LbsdBHDSi6JPfa6R7ZG7Bm7Lhx_tk-8SmuUScUq6z06C6xSuYAmqsEvbVJoVq9-5C7rwvEeQdf8QvMc-HOQDthCpjew-bERA7d5WS18OK73shrog0M0u8rJgeb1u5VsrbVwdK0_hm6qezQdeNFHD8JHfzmFkNH1tqar2bNSvUMdNzFF5iWzHEH-_dFomMeo9pxoxsJdt8Ko5AucHHc3nJnjj9VS-vg',
    },
    {
      title: 'Whispers of the Wind',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRELJaUMvxyDUSbxGKpBstmDlJv_eCfQAJYIJF7mDhJQ-H7pSdIsJSG4toKchbkqTNhvhSDDxylP1EAezixdtTYl5N4Bl_sF_j6u0oeDS2tzxFwe45Jdl8WaOMw1slr_BfVw5Yz09_5mPI5UpOVPcXyO1u2dLpJ421gPYjJEDzSslZcLQaXCH97r24ii7xw5NSZmYp8ZTMtNRUL1n-qBki4HUkeqk1yMJeWChBANP_KTguYJcdn_Jj5MaFy6vC8PsFOR6J3X3czyk',
    },
    {
      title: 'Starlight Serenade',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGNFu-WBWNYcoht3QCI4vXjjF3c8Fq9yaleMX6N68MEFjb_FN-XcQyishDH8YnMmrwStj9bw5sxkuk45iLIc7YCOi-Nl4ssr9arUdJ4307TmnAELPl-nNjmyqMVBJGfY_jDqny1wMtseqZGRqV1FF_lhKDaWgw_7JeYQRTWW4F4xFPOqEHJGVMzBaCcpRbnQTiBRpUVsTPfA6wP6cOpJ0nT4trQMVtkemsue5iHX4yc1og6Upjyi0HlVsqm9XJqw-n4hNoMZXRtgE',
    },
    {
      title: 'Shadows of Destiny',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBurvgZcFU3weY-9-WF1vZpWs4Ulg-oAoXdY6_65AfNwCcN35nXDdiUFqhsYhiRzdsR-Hcr8NiPgAgtfpUYqDEoNpH6mgx5o4JB0itAQg3Di3CMRmdHWgdJRbtmRC8sS_fVWjngGjpu30EjK3xnrZuDPC3BYXqb4l0G6E-karykR8EEPgzxQplWCO8c7QljwS6awYm7YeEUPBbU3hLH6nedom6_DQGLjLQyziabWbrimnOco6mB9fO0kP90vD5HVI5B7hyw12iJ3UU',
    },
  ];

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#141414] dark group/design-root overflow-x-hidden" style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        {/* Main Content */}
        <div className="px-4 sm:px-6 lg:px-8 xl:px-40 flex flex-1 justify-center py-8">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap items-center justify-between gap-4 p-4">
              <h1 className="text-white tracking-tight text-4xl font-bold leading-tight">
                My Watchlist
              </h1>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(158px,1fr))] gap-x-4 gap-y-8 p-4">
              {watchlistItems.map((item, index) => (
                <div key={index} className="flex flex-col gap-3 group relative">
                  <div className="relative">
                    <div
                      className="w-full bg-center bg-no-repeat aspect-[2/3] bg-cover rounded-md"
                      style={{ backgroundImage: `url("${item.image}")` }}
                    ></div>
                    <button className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                  <p className="text-white text-base font-medium leading-normal">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watchlist;