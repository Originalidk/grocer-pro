import './app.css';
import NavBar from "@/components/NavBar";
import Image from "next/image";
import ShoppingAppSVG from "../../public/shopping-app-cart.svg";
import SuperMarkets from '@/components/SuperMarkets';

export default function Home() {
  return (
    <main>
      <NavBar />
      <div className="h-[100vh] w-full">
        <div className="h-full w-full flex flex-row justify-end bg-green-700 absolute z-0">
          <div className="h-full w-[45%] flex flex-col">
            <div className="h-[90%] w-full flex flex-col justify-center items-center mt-[10%]">
              <div className='h-1/2 w-full flex flex-col justify-center items-center mb-[13%]'>
                <h1 className="text-big-title font-bold text-white">Grocer Pro</h1>
                <p className="mt-12 text-xl text-white">Prices | Quality | Availability</p>
                <p className="mt-5 text-xl text-white">Grocer Pro is your one stop shop for all things groceries.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full w-full absolute z-10">
          <div className="h-full w-3/5 flex flex-col justify-center items-center relative bg-white rounded-bottom-right right-[5%]">
            <Image src={ShoppingAppSVG} alt="Shopping Cart" className='h-3/5 mb-[5%]' priority={true} />
          </div>
        </div>
      </div>
      <div className="h-[90vh] flex flex-col justify-center items-center bg-green-700">
        <div className='h-2/5 w-full flex flex-col justify-between items-center'>
          <h3 className='text-white font-bold text-6xl'>Did you know?</h3>
            <p className='text-white text-3xl'>"In Singapore, the average household spends <span className='text-red-500 font-bold text-4xl'>$1200</span> per month on food"</p>
          <div className='text-center text-white text-lg text-wrap'>
            <p>With Grocer Pro, you can easily compare prices and shop like a pro, enabling you to make substantial savings.</p>
            <p className='my-2'>Embracing our price comparison tool not only stretches your dollar further, but also ensures you get the best value for your money.</p>
            <p>Best of all, Grocer Pro is <span className='text-xl font-bold'>FREE</span> of charge. So what are you waiting for? Shop now!</p>
          </div>
        </div>
      </div>
      <SuperMarkets />
      <div className='h-[128px] w-full bg-green-700'></div>
    </main>
  );
}
