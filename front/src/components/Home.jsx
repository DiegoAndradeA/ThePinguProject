function Home() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-[10%_90%] mt-2 min-h-screen">
        <aside className="bg-sky-300 border border-gray-300 rounded-md p-4 shadow">
          <h2 className="text-xl font-semibold">Sidebar</h2>
          <p>Contenido del sidebar</p>
        </aside>

        <section className="bg-white border border-gray-300 rounded-md p-4 shadow">
          <h2 className="text-xl font-semibold">Sección principal</h2>
          <p>Contenido principal</p>
          <button
            className="bg-red-500 px-2 py-1 rounded-md mt-4 hover:bg-red-400"
            onClick={() => alert("FEO!")}
          >
            Send
          </button>
        </section>
      </div>
    </div>
  );
}

export default Home;
