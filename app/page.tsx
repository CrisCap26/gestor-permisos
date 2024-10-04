import Header from "./components/Header";
import Cards from "./components/Cards";


export default function Home() {
  return (
    <div className='md:grid md:grid-cols-1 md:h-screen'>
      <Header />
      <div className=''>
        <Cards />
      </div>
    </div>
  );
}
