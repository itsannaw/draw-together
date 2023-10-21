import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <section>
      <div className="flex flex-col mx-auto justify-center text-center max-w-[400px] mt-5 gap-3">
        <img className="h-[70px]" src="icon.svg" alt="icon" />
        <span className="font-bold text-3xl">DRAW TOGETHER</span>
        <span>You can go to an existing board or create your own.</span>
      </div>
      <div className="flex flex-col mt-6 gap-3">
        <div className="flex justify-center items-center gap-4">
          <div>
            <input
              type="text"
              placeholder="Board name"
              id="small-input"
              className="block w-full p-3 border border-gray-700 rounded-lg sm:text-xs focus:ring-rose-500 focus:border-blue-500"
            />
          </div>
          <div>
            <button
              type="button"
              className="text-gray-900 bg-gradient-to-r from-violet-50 to-rose-50 hover:bg-gradient-to-l hover:from-violet-100 hover:to-rose-100 focus:ring-4 focus:outline-none focus:ring-violet-200 font-medium rounded-lg text-s px-5 py-2.5 text-center"
            >
              Create
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex justify-center  mt-[20px]">
            <span className="font-semibold text-[18px]">Boards list:</span>
          </div>
          <div className="flex justify-center items-center gap-8 ">
            <span>Doska 1</span>
            <button
              onClick={() => navigate("board")}
              type="button"
              className="text-gray-900 bg-gradient-to-r from-teal-50 to-lime-50 hover:bg-gradient-to-l hover:from-teal-100 hover:to-lime-100 focus:ring-4 focus:outline-none focus:ring-lime-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Enter
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
