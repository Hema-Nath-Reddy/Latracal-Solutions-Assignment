import React from 'react'
import Navbar from '../components/NavBar'
const Home = () => {
  return (
  <div
      className="relative flex size-full min-h-screen flex-col text-white dark group/design-root overflow-x-hidden "
      style={{
        fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif',
      }}
    >
      <div className="layout-container flex h-full grow flex-col">
     

        {/* Main Content */}
        <main className="flex-1">
          {/* Hero Section */}
          <section
            className="relative min-h-[60vh] lg:min-h-[75vh] flex items-end p-4 sm:p-6 lg:p-12 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                'linear-gradient(to top, rgba(17, 17, 17, 0.9) 10%, rgba(17, 17, 17, 0) 50%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDsNIlCWtm1mKERb-KIhppTDwDbXtCsjqhLQWEVkGBe-oHyzOYiGM8x1EDlVxCFRDHk6k8JfYtR_4LTdK_NDaXpzll5XKaQVVBz67NV0yEoCN-jXh81F6crav_nlxsuYu3Ki7mtI5RT8zwdJeYX_LH0XC9euBvJLMDsMEQv94tMEmWJmKYFGDNxExSfCQc8-ufcxomwv_9VB7A614rdDsh28sHpzIOLaok61OpkHIgLXIuLzE2NIg9OKJCWuTUom-6WatUB-ecWrpk")',
            }}
          >
            <div className="w-full max-w-4xl space-y-4">
              <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tighter">
                Journey to the Unknown
              </h1>
              <p className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-2xl">
                Embark on an epic quest with 'Journey to the Unknown,' a
                thrilling adventure filled with mystery and danger. Follow a
                group of explorers as they uncover ancient secrets and face
                formidable challenges in their pursuit of the truth.
              </p>
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-12 px-6 bg-[var(--primary-color)] text-white text-base font-bold leading-normal tracking-wide hover:bg-red-700 transition-colors">
                <span className="truncate">Watch Now</span>
              </button>
            </div>
          </section>

          {/* Trending Section */}
          <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
            <h2 className="text-white text-2xl sm:text-3xl font-bold leading-tight tracking-tight mb-6">
              Trending Now
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
              {[
                {
                  title: "The Last Stand",
                  url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7vti7kbEFUBTWBazl0OiphjllNxjxRqi8e-Y0md1QIU6Qk4ciWF4xPy26wU8sNoM6m5gdG_5BBK4MLfivrmL-ChbIdeKM_ytOHNcuWqqeslVm5j82L1KRAyyPxQtkZYZflUIxJHSXjTBlq41mz4fyij7CJwk3sYWo75Xyzv_P1CXv1DmbHBujeXuDyOhtecXTVxHKFWf-y4b_NXypWMQ4Z4Oj4AyDFiDvt3Do5xIop5RkjP_6miIyLUDhUYDKLdEE3cSlnE15YkU",
                },
                {
                  title: "Echoes of the Past",
                  url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHNxwx6nvOy2d23yEBa7bUvB7NI9u368GfZFo5V42P4OLg0P806SYstmDDFhP9TG1T_DXq6QPEiQWJHSSn1N8RiOCXM5wiCS3SFniLkNqpETqOpMLpCHICsI5l2oeWoJMfo3mOL3mYoz04YBeE0oxRDNzeFcXaJ-oqsfOWAsjARvFy8rqiZ1JLWpo50Z12-9y89wa0UQs__u1MxXYCsjmOhhloyfE8gbvTh6ehFIXAJjo3NJtr1nZnSP_wmQ0BRp5upbgGyr7-E8c",
                },
                {
                  title: "Laugh Out Loud",
                  url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgxXPJV_DCBAyKkKmb_3I8uZbKnPptufcVn4o4gxBNl90ANubv6KJkPTLWZfo76vzzuiMMsTkOow8VU_zQzjy9QxUUzmzIjbOgSKhCw_AcNcVL59KRPCYxjuIqF-S0MoRM1scnrZHJI1-qEUyto4TC-3jHpM-M8KmxS6_C8BG0exXl0s5HEjyL84ZM98fyHa6emUDonVjzCkHH1_xddnwEDg_B6AHmqrn3mLY0RNU8mWHP87LaGeKoPzpSIfp9UDo97kXTLC2bB1M",
                },
                {
                  title: "Silent Witness",
                  url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAR7MKoaV0juieKUViN56I6qDYxH4RKqliSSPpjv9AHmrB7DnsAh1ksbzy1RMLj_bP2xU6SY0GPE1K928xigt1x4c80rKR4jFs7AYb_hr3J48LW4fgIP61ej-wEeL8_FmWm646qHF_0BIW2AJhNr_IPYxxEb74AVzaNie93I9PyOJPbzAT2cmPTjUTiQxuhD5duFYKtefmZ4YGCnSXwuxHQcezT52bIHTIR0q0xfJfEJ8-d9j1C2RtbmOxf2FlpoB6oOGAmHnxfzDc",
                },
                {
                  title: "Beyond the Stars",
                  url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDiBddtpmr52WdQIzXhLHtMPPPLVSCUprKO0PsM5OC75fqMeNl5m1YrqPtH5UAJb_OLnxS_EHTkXJxv3pyoGXXCnG70CHaNCevglu2RSysgQn7xRxHhq3jTc3TBOhKvFqhrxDcvQOk0QLw1JttTtvjWHG6RfOahhZUJXWBeIRVGS7900Kn7mT-Jd7GhKF3v5cJuM9XzHJrvdYZJt1dpN7LD3GyaEend4SlikIf-bZlSwtT9QruTmLptSchmS-gHiyDBB_iRBu30PyI",
                },
                {
                  title: "Cosmic Echo",
                  url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMs6t5j09T4j1Q1x0j3G5u7i8z7o8p7b6f5g4h3i2j1k0l9m8n7b5c4x3y2a1s0d9f8e7g6h5j4k3l2m1n0o9p8q7r6s5t4u3v2w1x0y9z8a7b6c5d4e3f2g1h0i9j8k7l6m5n4o3p2q1r0s9t8u7v6w5x4y3z2a1b0c9d8e7f6g5h4i3j2k1l0m9n8o7p6q5r4s3t2u1v0w9x8y7z6a5b4c3d2e1f0g9h8i7j6k5l4m3n2o1p0q9r8s7t6u5v4w3x2y1z0",
                },
              ].map((movie) => (
                <div key={movie.title} className="group flex flex-col gap-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-[2/3] bg-cover rounded-md flex flex-col overflow-hidden transform transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundImage: `url(${movie.url})` }}
                  />
                  <p className="text-white text-sm font-medium leading-normal truncate">
                    {movie.title}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default Home
