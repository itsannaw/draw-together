import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [allBoards, setAllBoards] = useState([]);

  const getBoards = async () => {
    const { data } = await axios.get("http://localhost:3000/api/boards");
    setAllBoards(data);
  };

  const onDelete = async ({ id }) => {
    try {
      await axios.delete("http://localhost:3000/api/boards/delete", {
        data: {
          id,
        },
      });
      await getBoards();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBoards();
  }, []);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await axios.post("http://localhost:3000/api/boards/create", {
        name,
      });
    } catch (error) {
      console.error(error);
    }
  };

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
              value={name}
              id="name"
              onChange={handleChange}
              className="block w-full p-3 border border-gray-700 rounded-lg sm:text-xs focus:ring-rose-500 focus:border-blue-500"
            />
          </div>
          <div>
            <button
              type="button"
              onClick={handleSubmit}
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
          <div className="flex flex-col justify-center items-center gap-3">
            {allBoards.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className="flex justify-between items-center gap-[50px] max-w-[400px] w-full border px-2 py-2 rounded-lg"
                >
                  <div className="flex gap-2">
                    <span className="pl-2">{index + 1}.</span>
                    <span>{item.name}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate("board")}
                      type="button"
                      className="text-gray-900 bg-gradient-to-r from-teal-50 to-lime-50 hover:bg-gradient-to-l hover:from-teal-100 hover:to-lime-100 focus:ring-4 focus:outline-none focus:ring-lime-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Enter
                    </button>
                    <button
                      onClick={() => onDelete(item)}
                      type="button"
                      className="text-gray-900 bg-gradient-to-r from-teal-50 to-lime-50 hover:bg-gradient-to-l hover:from-teal-100 hover:to-lime-100 focus:ring-4 focus:outline-none focus:ring-lime-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
