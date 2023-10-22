import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const HomePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [allBoards, setAllBoards] = useState([]);
  const [errorText, setErrorText] = useState("");
  const [message, setMessage] = useState("");

  const getBoards = async () => {
    try {
      const { data } = await api.get("boards");
      setAllBoards(data);
    } catch (error) {
      console.error(error);
    }
  };

  const onDelete = async ({ id }) => {
    try {
      await api.delete("boards/delete", {
        data: {
          id,
        },
      });
      await getBoards();
    } catch (error) {
      setErrorText(error);
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
      const response = await api.post("boards/create", {
        name,
      });
      await getBoards();

      if (response.status === 200) {
        const message = response.data.message;
        setMessage(message);
      }
    } catch (error) {
      if (error.response?.data.error) {
        setErrorText(error.response.data.error);
      }
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
        <span className="flex justify-center text-red-500 text-[12px] font-semibold">
          {errorText}
        </span>
        <span className="flex justify-center text-green-500 text-[12px] font-semibold">
          {message}
        </span>
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
                      onClick={() => navigate(`/board/${item.id}`)}
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
