import {assets} from "../assets/assets.js";
import {useState} from "react";
import axios from "axios";
import {backendUrl} from "../App.jsx";
import {toast} from "react-toastify";

const Add = ({token}) => {

    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);
    const [image3, setImage3] = useState(false);
    const [image4, setImage4] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("fresh_produce");
    const [subCategory, setSubCategory] = useState("fruits");
    const [bestseller, setbestseller] = useState(false);
    const [quantity, setQuantity] = useState([]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("bestseller", bestseller);
            formData.append("quantity", JSON.stringify(quantity));

            image1 && formData.append('image1', image1);
            image2 && formData.append('image2', image2);
            image3 && formData.append('image3', image3);
            image4 && formData.append('image4', image4);

            const response = await axios.post(backendUrl + '/api/product/add', formData, {headers: {token}});

            if (response.data.success) {
                toast.success(response.data.message);
                setName('');
                setDescription('');
                setImage1(false);
                setImage2(false);
                setImage3(false);
                setImage4(false);
                setPrice('');
                setQuantity([])
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    return (
        <div>
            <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
                <div>
                    <p className='mb-2'>Upload Image</p>
                </div>

                <div className='flex gap-2'>
                    <label htmlFor='image1'>
                        <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt=''/>
                        <input onChange={(e)=>setImage1(e.target.files[0])} type='file' id='image1' hidden/>
                    </label>
                    <label htmlFor='image2'>
                        <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt=''/>
                        <input onChange={(e)=>setImage2(e.target.files[0])} type='file' id='image2' hidden/>
                    </label>
                    <label htmlFor='image3'>
                        <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt=''/>
                        <input onChange={(e)=>setImage3(e.target.files[0])} type='file' id='image3' hidden/>
                    </label>
                    <label htmlFor='image4'>
                        <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt=''/>
                        <input onChange={(e)=>setImage4(e.target.files[0])} type='file' id='image4' hidden/>
                    </label>
                </div>
                <div className='w-full'>
                    <p className='mb-2'>Product Name</p>
                    <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type='text' placeholder='Enter product Name'
                           required/>
                </div>

                <div className='w-full'>
                    <p className='mb-2'>Product Description</p>
                    <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type='text'
                              placeholder='Enter product description' required/>
                </div>

                <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                    <div>
                        <p className='mb-2'>Product Category</p>
                        <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
                            <option value='fresh_produce'>Fresh Produce</option>
                            <option value='dairy_eggs'>Dairy & Eggs</option>
                            <option value='meat_seafood'>Meat & Seafood</option>
                            <option value='pantry_staples'>Pantry Staples</option>
                            <option value='beverages'>Beverages</option>
                            <option value='snacks'>Snacks</option>
                        </select>
                    </div>

                    <div>
                        <p>Product Sub-Category</p>
                        <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2'>
                            <option value='fruits'>Fruits</option>
                            <option value='vegetables'>Vegetables</option>
                            <option value='dairy_products'>Dairy Products</option>
                            <option value='eggs'>Eggs</option>
                            <option value='meat'>Meat</option>
                            <option value='Seafood'>Seafood</option>
                            <option value='rice'>Rice</option>
                            <option value='flour_baking'>Flour and Baking Supplies</option>
                            <option value='pasta_noodles'>Pasta & Noodles</option>
                            <option value='oils'>Oils</option>
                            <option value='tea_coffee'>Tea & Coffee</option>
                            <option value='jucies'>Jucies</option>
                            <option value='soft_drinks'>Soft Drinks</option>
                            <option value='chips'>Chips</option>
                            <option value='cookies'>Cookies</option>
                        </select>
                    </div>

                    <div>
                        <p className='mb-2'>Product Price</p>
                        <input onChange={(e)=>setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type='Number' placeholder='Price' min={0} required/>
                    </div>
                </div>

                <div>
                    <p className='mb-2'>Product quantity</p>
                    <div className='flex gap-3'>
                        {/*KG*/}
                        <div
                            onClick={() => setQuantity((prev) => prev.includes('1/2KG') ? prev.filter((item) => item !== '1/2KG') : [...prev, '1/2KG'])}>
                            <p className={`${quantity.includes('1/2KG') ? 'bg-green-200' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>1/2KG</p>
                        </div>
                        <div
                            onClick={() => setQuantity(prev => prev.includes('1KG') ? prev.filter(item => item !== '1KG') : [...prev, '1KG'])}>
                            <p className={`${quantity.includes('1KG') ? 'bg-green-200' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>1KG</p>
                        </div>
                        <div
                            onClick={() => setQuantity(prev => prev.includes('2KG') ? prev.filter(item => item !== '2KG') : [...prev, '2KG'])}>
                            <p className={`${quantity.includes('2KG') ? 'bg-green-200' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>2KG</p>
                        </div>
                        <div
                            onClick={() => setQuantity(prev => prev.includes('5KG') ? prev.filter(item => item !== '5KG') : [...prev, '5KG'])}>
                            <p className={`${quantity.includes('5KG') ? 'bg-green-200' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>5KG</p>
                        </div>
                        <div
                            onClick={() => setQuantity(prev => prev.includes('10KG') ? prev.filter(item => item !== '10KG') : [...prev, '10KG'])}>
                            <p className={`${quantity.includes('10KG') ? 'bg-green-200' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>10KG</p>
                        </div>

                        {/*PCS*/}
                        <div
                            onClick={() => setQuantity(prev => prev.includes('x1') ? prev.filter(item => item !== '4PCS') : [...prev, 'x1'])}>
                            <p className={`${quantity.includes('x1') ? 'bg-green-200' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>x1</p>
                        </div>

                        {/*Litre*/}
                        <div
                            onClick={() => setQuantity(prev => prev.includes('1ltr') ? prev.filter(item => item !== '1ltr') : [...prev, '1ltr'])}>
                            <p className={`${quantity.includes('1ltr') ? 'bg-green-200' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>1ltr</p>
                        </div>
                        <div
                            onClick={() => setQuantity(prev => prev.includes('2ltr') ? prev.filter(item => item !== '2ltr') : [...prev, '2ltr'])}>
                            <p className={`${quantity.includes('2ltr') ? 'bg-green-200' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>2ltr</p>
                        </div>
                        <div
                            onClick={() => setQuantity(prev => prev.includes('5ltr') ? prev.filter(item => item !== '5ltr') : [...prev, '5ltr'])}>
                            <p className={`${quantity.includes('5ltr') ? 'bg-green-200' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>5ltr</p>
                        </div>
                    </div>
                </div>

                <div className='flex gap-2 mt-2'>
                    <input onChange={() => setbestseller((prev) => !prev)} checked={bestseller} type='checkbox'
                           id='bestseller'/>
                    <label className='cursor-pointer' htmlFor='bestseller'>Add to bestseller</label>
                </div>

                <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
            </form>
        </div>
    )
}

export default Add;