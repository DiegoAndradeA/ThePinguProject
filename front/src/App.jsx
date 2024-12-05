import { useState } from 'react'
import './App.css'
import Header from './components/header';


export default function App() {
  return (
    <div >
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-[10%_90%] mt-2 min-h-screen">
      
        <aside className="bg-sky-300 border border-gray-300 rounded-md p-4 shadow">
          <h2 className="text-xl font-semibold">Sidebar</h2>
          <p>Contenido del sidebar</p>
        </aside>

        <section className="bg-white border border-gray-300 rounded-md p-4 shadow">
          <h2 className="text-xl font-semibold">Sección principal</h2>
          <p>Contenido principal</p>
        </section>
      </div>
    
      <footer className="bg-blue-600 text-white text-center py-3 mt-2 rounded-md shadow">
        © 2024 The Pingu Project. Todos los derechos reservados.
      </footer>
    </div>
  );
}
