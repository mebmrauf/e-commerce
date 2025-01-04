import Title from "../components/Title.jsx";
import {assets} from "../assets/assets.js";

const Contact = () => {
    return (
        <div>
            <div className='text-center text-2xl pt-10 border-t'>
                <Title text1={'Contact'} text2={'Us'}/>
            </div>
            <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
                <div className='flex flex-col justify-center items-start gap-6'>
                    <p className='font-semibold text-xl text-gray-600'>Our Store</p>
                    <p className='text-gray-500'>Kha 224 Pragati Sarani, Merul Badda <br/>Dhaka 1212, Bangladesh</p>
                    <p className='text-gray-500'>Mobile: +8801305-091891 <br/>Email: raufbiswas@bmrauf.me</p>
                </div>
                <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt={''} />
            </div>
        </div>
    )
}

export default Contact