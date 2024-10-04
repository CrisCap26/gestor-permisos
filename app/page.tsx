import Header from "./components/Header";
import Cards from "./components/Cards";


export default function Home() {
  return (
    <div className='md:grid md:grid-cols-1 md:h-screen'>
      <Header />
      {/* <Divider className="p-0.5 bg-sky-700" /> */}
      <div className=''>
        <Cards />
      </div>
    </div>
  );
}
