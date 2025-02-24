import React, { useState } from 'react';

// URL del dominio al que enviarás el JSON
const url = 'https://thepinguproject.onrender.com/userdb';

function Home() {
  // Estado para almacenar los valores del formulario y los usuarios
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  // Función para manejar el envío del formulario
  const handleClick = async () => {
    // Crear el objeto con los datos que se van a enviar
    const data = {
      username: username,
      email: email,
    };

    try {
      // Enviar el JSON usando fetch
      const response = await fetch(url, {
        method: 'POST', // Usamos POST para enviar los datos
        headers: {
          'Content-Type': 'application/json', // Indicamos que el cuerpo es un JSON
        },
        body: JSON.stringify(data), // Convertimos el objeto JavaScript a JSON
      });

      // Si la respuesta es exitosa, mostramos un mensaje
      if (response.ok) {
        alert('Datos enviados exitosamente!');
      } else {
        alert('Error al enviar los datos.');
      }
    } catch (error) {
      // Si ocurre un error de red o algún otro problema
      console.error('Error de red:', error);
      alert('Hubo un error al intentar enviar el JSON.');
    }
  };

  // Función para manejar la obtención de usuarios
  const handleClick2 = async () => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        // Convertimos la respuesta a JSON
        const data = await response.json();
        setUsers(data); // Guardamos los usuarios en el estado
      } else {
        alert('Error en la respuesta del servidor');
      }
    } catch (error) {
      alert('Error al hacer la solicitud: ' + error.message);
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

          {/* Formulario para ingresar el contenido de data */}
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block">Username:</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Ingresa tu username"
              />
            </div>
            <div>
              <label htmlFor="email" className="block">Email:</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Ingresa tu email"
              />
            </div>
            <button
              className="bg-red-500 px-2 py-1 rounded-md hover:bg-red-400"
              onClick={handleClick} // Llamamos a handleClick cuando se hace clic en el botón
            >
              Send
            </button>
          </div>

          {/* Botón para obtener datos */}
          <button
            className="bg-green-500 px-2 py-1 rounded-md hover:bg-green-400 mt-4"
            onClick={handleClick2} // Llamamos a handleClick2 para obtener los usuarios
          >
            Get Data
          </button>

          {/* Mostrar los usuarios en tarjetas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white p-4 rounded-md shadow-lg hover:shadow-xl transition"
              >
                <h3 className="font-semibold text-lg">{user.username}</h3>
                <p className="text-gray-600">{user.email}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
