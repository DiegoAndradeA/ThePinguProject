import React from 'react';

const data = {"username":"pepo", "email":"test@232.cl"};

// URL del dominio al que enviarás el JSON
const url = 'https://thepinguproject.onrender.com/usersdb';

function Home() {
  const handleClick = async () => {
    // Muestra el mensaje de alerta
    alert("FEO pepo!");

    try {
      // Enviar el JSON usando fetch
      const response = await fetch(url, {
        method: 'POST', // Usamos POST para enviar los datos
        headers: {
          'Content-Type': 'application/json' // Indicamos que el cuerpo es un JSON
        },
        body: JSON.stringify(data) // Convertimos el objeto JavaScript a JSON
      });

      // Verificamos la respuesta
      if (response.ok) {
        // Si la respuesta es exitosa (código 200-299)
        const jsonResponse = await response.json(); // Procesamos la respuesta JSON del servidor
        console.log("Respuesta del servidor:", jsonResponse);
        alert("¡JSON enviado con éxito!");
      } else {
        // Si la respuesta no es exitosa (código 400, 500, etc.)
        console.error("Error en la solicitud:", response.status);
        alert("Error al enviar el JSON. Código de error: " + response.status);
      }
    } catch (error) {
      // Si ocurre un error de red o algún otro problema
      console.error("Error de red:", error);
      alert("Hubo un error al intentar enviar el JSON.");
    }
  };

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
            onClick={handleClick} // Llamamos a handleClick cuando se hace clic en el botón
          >
            Send
          </button>
        </section>
      </div>
    </div>
  );
}

export default Home;
