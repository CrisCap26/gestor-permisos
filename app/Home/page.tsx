import Header from "../components/Header";
import Cards from "../components/Cards";
import { fetchDataIncidencia } from "../libs/fetchDataIncidencia";

export default async function Home({ searchParams }: { searchParams: { idIncidencia: string } }) {

  const { idIncidencia } = searchParams;

  if (!idIncidencia) {
    return (
      <div className='grid grid-cols-1 h-screen'>
        <h1 className="flex justify-center self-center text-xl">Error: Faltan parámetros de ID</h1>
      </div>
    );
  }

  // Obtener datos del backend
  const dataIncidencia = await fetchDataIncidencia(idIncidencia);

  if (!dataIncidencia) {
    return (
      <div className='grid grid-cols-1 h-screen'>
        <h1 className="flex justify-center self-center text-xl">Incidencia no encontrada</h1>
      </div>
    );
  }
  const datosEmpleadoIncidencia = dataIncidencia;
  console.log("Empleado",datosEmpleadoIncidencia.empleado)
  return (
    <div className='md:grid md:grid-cols-1 md:h-screen'>
      <Header fecha={datosEmpleadoIncidencia.incidencia.fecha} />
      <div className=''>
        <Cards data={datosEmpleadoIncidencia} />
      </div>
    </div>
  );
}
