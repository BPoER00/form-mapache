const Tabs = ({ children, tab, setTab, opciones }) => {
  const handleSelectTab = (selectedTab) => {
    setTab(selectedTab);
  };

  return (
    <section className="w-full h-auto flex flex-col items-center p-5">
      <ul className="w-10/12 flex justify-around transition-all">
        {opciones.map((item, index) => (
          <li
            key={index}
            className={`w-1/2 text-center font-bold overflow-hidden
              ${index === 0 ? "rounded-l-xl" : ""}
              ${index === opciones.length - 1 ? "rounded-r-xl" : ""}
              transition-colors duration-300 ease-in-out
              ${
                tab === item
                  ? "bg-[#30A5E9] text-white"
                  : "bg-gray-200 text-black"
              }
            `}
          >
            <button
              onClick={() => handleSelectTab(item)}
              className={`w-full px-4 py-4 text-xl transition-colors duration-300 ease-in-out
                ${
                  tab === item
                    ? "bg-[#30A5E9] text-white cursor-default"
                    : "bg-gray-200 text-black hover:bg-[#a7d7f5] hover:text-black hover:cursor-pointer"
                }
              `}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>

      <div className="w-10/12 mt-6 transition-opacity duration-300 ease-in-out">
        {children}
      </div>
    </section>
  );
};

export default Tabs;
