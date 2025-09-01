import { React, useState, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../store/movieSlice";
const Movies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const movieData = useSelector((state) => state.movies.data);
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);
  useEffect(() => {
    dispatch(fetchMovies({ page: 1 }));
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded" && movieData) {
      console.log(
        "Movie data successfully fetched and is available:",
        movieData
      );
    }
  }, [movieData, status]);

  const primaryColor = "#ea2a33";
  if (status === "loading") {
    return <div className="text-white text-center p-8">Loading movies...</div>;
  }

  if (status === "failed") {
    return (
      <div className="text-red-500 text-center p-8">
        Error: {error ? error.status_message : "Something went wrong"}
      </div>
    );
  }
  /* const movies = [
    {
      id: 1,
      title: "Movie Title 1",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlZD5VW1PHCGs_edTuJYzykiiHLnzsZBJ1lQOoUChKR55LQPHhXBt9SxA9NZLbcYu0VdyzaMTjXLNq_VTY0SKnhnqchsGem81LEL_udqIg0V4WhDoNtJcCw7m0sehQczzS168QATd2Xx_H43hBRjPEc46dDz9f6V8fZiIVsKcP8O57jn3JrUDsNGtKanJ5PTqDDKPM3O2bCAUkGsRXodyuSTc-Gx3pOzoxb__Mfe8wPVqNV6luqED260S8LSdasZiM7akwPqeFT54",
    },
    {
      id: 2,
      title: "Movie Title 2",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBW3CujGIs4UUAQ_3C0fEv-GRDVkd45rWoh9FO5XmtlhQeWB7aVuMT3qMa9w_wBcVq6mMf0F5iALh6CXOCjydBCKbSFIWaWJrnUvtPCUIusz3D4PJfkjQtC3JC9fkDe9S-koaS_vLbsEqMg_DJj1SqkCmRTX0DQTIrFEpzHMefzBccVy1LFgF77Gw6S_pSVKCxWW59gp5bpYNbQPTv8mJJ0ICZHQP2y3QGCJQ9ROZAhdVwNdPuoMMFAfxAn7JuC5nqqUzDWcGHTnrw",
    },
    {
      id: 3,
      title: "Movie Title 3",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCN01TpkEGBFkMW-6CSPXQAqJNp7hnDTunlMBsxXMhjN9Dq3L_NDTpOARgLqo7z7JjW4aT0wlue9EmKZyfbSLedLdzFgrWdGtG6TneCuGXsfMLNk4GZfE3d7nMNN73IyZK8zF2hNZ1Q5jJWf-dgU7DvYUwyLRvSn-x5UCSBvOvjc2pBzR429psKBPCCpjNnNr_YwH91KmTzQR8NzliEfgtP-AFUA6iQAdPUklNre-m1sdxUPMcNzkG9SP9lmN-KiE5QC_V1Q_sNKAQ",
    },
    {
      id: 4,
      title: "Movie Title 4",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQV0sf9Zbe7EHnaIs-xd9aCXGjwYSGus868Mul82sJQkU5wTM9AWLJoe7DMyP31DNqy8z_FiCb4FJdWKrhBAADr0EpPlR64Rv3vH7qCGCaciZ_YNsphGcGCcXWroMbXoyvzinBkJgIPwkgMjJ1i4orn43pg_jTK-Hv0ViQUcwtLUeUsZNPULlZSlJV9whQs-Zsca40hyVqzo0EEDBpWQL8CclXhBMlAw5kOFTP-O8DLATLxKgFLAvhAfOCI6wWH7vAalG3DZ9yWQw",
    },
    {
      id: 5,
      title: "Movie Title 5",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8BmoMg5LiL40up8c_3bmls51XJP3EpsJkZU0LFbNJirs5JKlRGinp7qciS5kHDDIvTdgE-OvselPnbDAKc0f0X9lrQA6B3GVzsA1DcCRx_G9kYjw3XHtMzyTcKpt7mWmDhCKMn0ZMI8FaULYMkfQiQA6XNSC_pJoVlr6IZ8PQerrCF7I-OR-f4QErCnyUiVrzLN7HqGRxDa8szn-2svt03Bl0U4dWdSdTdnsenJgXGrrEzZlsNYX3mawIKtG6_0Da5FMdMJMfcpU",
    },
    {
      id: 6,
      title: "Movie Title 6",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCs_IhKC_y1_khzJGYkhEey6DovC2awEXl53gMoJ1Td8eMKNgysDtQnqIgfFwoR-seTIEHlz2W3gkXhFrm3kJDuaW2-G-2kSX6_5znWRKBaEK36O8pSZG9Z_UL-Xze8netXV6IyS1czsZIrzWE_vIJlIoc8x3S-KRkuQMjS_amqb_iYMOFN7G4HqYrS9aQs2-tbEKp6qsuO2jFS6yAy-ZouEmbbA1G7xIEdpSGQ345cRT2UEpiC6Dat0TaG-pEvA3-4B4-yBd-lnxY",
    },
    {
      id: 7,
      title: "Movie Title 7",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzJ2mF2_y-2z3oyF7JSunAwmDgPpkR0b0twguLVL8O4r1zdH0zRiRIyGGNbXfULG3W1KaKbV4RhHqRjZEjS00T0NKa2lw4Z6heULrRY1pavDbYBZBoVc80OE4LMtoYd4PUTmHGwbZA6S8xxdNJCvLhxed9o23JJQ5gDeU7gC-ExrHb_iH9hL6nxL7oYVkn1_AthLfBJKG05NGd1rOsR3AYTox3BnTRgw3wOFqFE4sXEkGnvlMjm6MHcsY2KI1vV-y_8-dPNH4AOrk",
    },
    {
      id: 8,
      title: "Movie Title 8",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxW7GnrX4NtQ1eRKEppXZpO_0cLlDil2iN9tzJrpBSLCvucHrkWj95KCn57IB5cgc6aR0gXkf-abFBS7PLa4iPAKdOGwP1bTqdTdwN7uxZiVHYlmXIOEVw-EHYBhuXw6m5ucc90GfsunCLT9uzecSP5MdTndEYbXsJzf_5iW_PJnM1OJnpWB6J18--MO_t7Tis2-b1t_7ys2QWYFblY-BKD1ZH5avdqeEVxKFdQLbKP_ZgPGKTwdJu9CSV-xQINJ9qKZW0X-qhzE0",
    },
    {
      id: 9,
      title: "Movie Title 9",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgWx7dCmrHT4CewezWl5hr_gaP4MjQ4jdegnVNBPBqAs8pz8oLen38xpwkd6Zk9PB9_-GqfWuGsnaSi0FHJTwV2Lk_i3M3zJnaBAlqqxKkbXotggdV_VujWP3Do8FEyE4Z-_tiXExVYI6LLUSX1QbNg9EwC8i_vpF2Texh20v52aH0KjqFYjozSGdPFHVDIzwEbN_RtWeBwLsPWOawlpzP5K65je_Pn-KwgkyYcHO97pg9MD-PtOqPCsu3lvgRtJmpd-6rNeOOCdo",
    },
    {
      id: 10,
      title: "Movie Title 10",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBX_CLsKu3h16LY2IOviTFi7_CntvpfDg1JswmXefHXslH7G2gI5OA1rj0KCg7yXctBIVn_hPhnX30lu7GHDXF2WEiwN9xYko5mrIcrLZXe6Ox0u5exreFmCpYpbm_cAwpK5Np9ezlG5OVua6q2ejhlssmkIX7qPHnTPfV4-tAo4LHKOCXPgJAYrF9dXTTsohY-x5cFT3WXDM4-4veFAiwkHggy5B_IQlS2qNAR558cnOE7tOKBDHt316VGsqvhCFEDZ7mYN_9oO4c",
    },
    {
      id: 11,
      title: "Movie Title 11",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBoAZLNfmaWbqQR6SJKxuDZ7JyGnSlkZ3yyDpqIirszq7_RgcenwstGWTsZ0MmjLDyVJZ3Q5QeCWADcya9w-MsiIkLaLy0TJ0PdL-c54Itjfij0a45gdYxeWzUDEy7JlLM8EnyuFdJowVn4NVC5RAu32C0vTlUusLNK7aLrDx6RV99nl2pQ8cXWCPJHB7b8xwcyfFK1HcLCsyHGk6ICjffqUs8Ecak-54AlkV2t4Z-Y4i4pyPyZlLrbFcqnlPZIGzZ7opySuE1HOI",
    },
    {
      id: 12,
      title: "Movie Title 12",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjZftuML2XUEo8K4gzlTKCjcxM-q8l0eelapGx6QWNwIvnMkfMvNxraMCZx0C1p7E8M9bN-aXf41L8g6deRdaiUCGF7TyLAGurevs4ZlAvROlT5Ys9KpkCjlta314bx97X1fTWXFCVj_zZwEfuhZCemw3dxeMPe3VC6ZSTi5HBj6ZGSLKqaSC6aJTq6_DzLl14Clsm9gcHTT7fOVlJqpfxEstLIuMhGg_gsubQFmxVEsKy1u4JaYs6ef4Z8xr5jNA1WFinQaKY6QE",
    },
  ]; */

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#141414] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1">
          <aside className="hidden lg:flex flex-col w-64  border-r border-gray-800 p-4">
            <div className="px-4 py-3">
              <label className="flex flex-col min-w-40 h-12 w-full">
                <div className="flex w-full flex-1 items-stretch rounded-md h-full ">
                  <div
                    className="text-gray-400 flex border border-gray-700 bg-gray-800 items-center justify-center pl-3 rounded-l-md border-r-0"
                    data-icon="MagnifyingGlass"
                    data-size="24px"
                    data-weight="regular"
                  >
                    <Search />
                  </div>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-md text-white focus:outline-0 focus:ring-2 focus:ring-[#ea2a33] border border-gray-700 bg-gray-800 focus:border-[#ea2a33] h-full placeholder:text-gray-400 px-3 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal"
                    placeholder="Search movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </label>
            </div>
            <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Filters
            </h3>
            <div className="flex flex-col p-4 gap-4">
              <details
                className="flex flex-col rounded-md border border-gray-700 bg-gray-800 group"
                open=""
              >
                <summary className="flex cursor-pointer items-center justify-between gap-6 p-3 list-none">
                  <p className="text-white text-sm font-medium leading-normal">
                    Genre
                  </p>
                  <div
                    className="text-white transition-transform duration-300 group-open:rotate-180"
                    data-icon="CaretDown"
                    data-size="20px"
                    data-weight="regular"
                  >
                    <ChevronDown />
                  </div>
                </summary>
                <div className="px-3 pb-3">
                  <p className="text-gray-400 text-sm font-normal leading-normal">
                    Action, Comedy, Drama, Thriller, Sci-Fi
                  </p>
                </div>
              </details>
              <details className="flex flex-col rounded-md border border-gray-700 bg-gray-800 group">
                <summary className="flex cursor-pointer items-center justify-between gap-6 p-3 list-none">
                  <p className="text-white text-sm font-medium leading-normal">
                    Year
                  </p>
                  <div
                    className="text-white transition-transform duration-300 group-open:rotate-180"
                    data-icon="CaretDown"
                    data-size="20px"
                    data-weight="regular"
                  >
                    <ChevronDown />
                  </div>
                </summary>
                <div className="px-3 pb-3">
                  <p className="text-gray-400 text-sm font-normal leading-normal">
                    2023, 2022, 2021, 2020, 2019
                  </p>
                </div>
              </details>
              <details className="flex flex-col rounded-md border border-gray-700 bg-gray-800 group">
                <summary className="flex cursor-pointer items-center justify-between gap-6 p-3 list-none">
                  <p className="text-white text-sm font-medium leading-normal">
                    Rating
                  </p>
                  <div
                    className="text-white transition-transform duration-300 group-open:rotate-180"
                    data-icon="CaretDown"
                    data-size="20px"
                    data-weight="regular"
                  >
                    <ChevronDown />
                  </div>
                </summary>
                <div className="px-3 pb-3">
                  <p className="text-gray-400 text-sm font-normal leading-normal">
                    9+, 8+, 7+, 6+
                  </p>
                </div>
              </details>
            </div>
            <div className="flex px-4 py-3 justify-end ">
              <button className="flex min-w-[84px] w-full max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 px-4 bg-[#ea2a33] hover:bg-red-700 transition-colors text-white text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Apply Filters</span>
              </button>
            </div>
          </aside>
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
              <h1 className="text-white tracking-light text-3xl sm:text-4xl font-bold leading-tight min-w-72">
                Movies
              </h1>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
              {movieData.map((movie, index) => (
                <div
                  key={index}
                  className="cursor-pointer  group flex flex-col gap-2"
                  onClick={() => {
                    navigate(`/moviedetail/${movie.id}`);
                  }}
                >
                  <div
                    className="w-full bg-center bg-no-repeat aspect-[2/3] bg-cover rounded-md overflow-hidden transform group-hover:scale-105 transition-transform duration-300"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`,
                    }}
                  ></div>
                  <h4 className="text-white text-sm font-semibold truncate">
                    {movie.title}
                  </h4>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Movies;
