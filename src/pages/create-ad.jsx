import {useContext, useEffect, useState} from "react";
import {uploadToCloudinary} from "../utils/UploadToClodinary.jsx";
import {AuthContext} from "../context/Auth/AuthContext.jsx";
import {useNavigate} from "react-router";
import useServerRequest from "../api/ServerRequest.jsx";
import {useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {createEditSchema} from "../schemas/create-form/createEditForm.js";
import toast from "react-hot-toast";

const CreateAd = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const {user} = useContext(AuthContext);
    const {getAllCategories, createAd} = useServerRequest();

    const {
        register,
        handleSubmit,
        reset, control,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(createEditSchema),
        defaultValues: {
            images: [],
            title: "",
            description: "",
            category: "",
            city: "",
            price: "",
        }
    })
    const navigate = useNavigate();
    const images = useWatch({
        control,
        name: 'images'
    })

    useEffect(() => {
        getAllCategories()
            .then(data => setCategories(data))
            .catch(error => toast.error(`Ошибка загрузки категорий: ${error}`));
    }, [getAllCategories])

    useEffect(() => {
        return () => {
            images.forEach(img => {
                URL.revokeObjectURL(img.preview);
            });
        };
    }, [images]);


    const handleAddImages = (e) => {
        const files = Array.from(e.target.files || []);
        const newImages = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        const currentImages = images || [];

        setValue(
            'images',
            [...currentImages, ...newImages].slice(0, 5),
            {shouldValidate: true}
        );
    };

    const handleRemoveImage = (index) => {
        const currentImages = images || [];

        const toRemove = currentImages[index];
        if (toRemove) {
            URL.revokeObjectURL(toRemove.preview);
        }

        setValue('images', currentImages.filter((_, i) => i !== index), {
            shouldValidate: true,
        });
    };

    const handleSubmitForm = async (data) => {

        setLoading(true);

        try {
            const uploadedUrls = [];
            for (const img of images) {
                const url = await uploadToCloudinary(img.file);
                uploadedUrls.push(url);
            }

            const ad = {
                title: data.title,
                description: data.description,
                price: data.price,
                category: data.category,
                city: data.city,
                userId: user.id,
                images: uploadedUrls,
            };

            await createAd(ad);
            reset()
        } catch (error) {
            console.error("Ошибка создания объявления:", error);
        } finally {
            setLoading(false);
            navigate("/");
        }
    }

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-5xl">Создать объявление</h1>

            <form className="flex flex-col mt-10 gap-8 max-w-xl" onSubmit={handleSubmit(handleSubmitForm)}>

                <div className="flex flex-col gap-3">
                    <span className="text-lg">Загрузите фото:</span>

                    <div className="grid grid-cols-3 gap-4">

                        {images.length < 5 && (
                            <label className={`${errors.images && 'border-red-600'} w-full h-32 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-100 transition`}>
                                {loading ? (
                                    <span className="text-gray-500">Загрузка...</span>
                                ) : (
                                    <span className="text-gray-500">+ Фото</span>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                    onChange={handleAddImages}
                                />
                            </label>
                        )}

                        {images.map((url, index) => (
                            <div key={index} className="relative group">
                                <img
                                    src={url.preview}
                                    className="w-full h-32 object-cover rounded-xl"
                                    alt=""
                                />

                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                    {errors.images && (
                        <span className="text-red-600">{errors.images.message}</span>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="title-create-ad">Название объявления:</label>
                    <input
                        type="text"
                        id="title-create-ad"
                        placeholder="Название объявления"
                        className={`${errors.title && 'border-red-600'} border rounded p-2`}
                        {...register("title")}
                    />
                    {errors.title && (
                        <span className="text-red-600">{errors.title.message}</span>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="description-create-ad">Описание:</label>
                    <textarea
                        name="description"
                        id="description-create-ad"
                        placeholder="Описание..."
                        className={`${errors.description && 'border-red-600'} border rounded p-2 resize-none min-h-40`}
                        {...register("description")}
                    />
                    {errors.description && (
                        <span className="text-red-600">{errors.description.message}</span>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="categories-create-ad">Выберите категорию:</label>
                    <select
                        id="categories-create-ad"
                        name="category"
                        className={`${errors.category && 'border-red-600'} border rounded p-2`}
                        {...register("category")}
                    >
                        <option value="">Выберите категорию</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.name}>{category.name}</option>
                        ))}
                    </select>

                    {errors.category && (
                        <span className="text-red-600">{errors.category.message}</span>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="city-create-ad">Выберите город:</label>
                    <select
                        id="city-create-ad"
                        name="city"
                        className={`${errors.city && 'border-red-600'} border rounded p-2`}
                        {...register("city")}
                    >
                        <option value="">Выберите город</option>
                        <option value="Кишинёв">Кишинёв</option>
                        <option value="Бричаны">Бричаны</option>
                    </select>
                    {errors.city && (
                        <span className="text-red-600">{errors.city.message}</span>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="price-create-ad">Цена:</label>
                    <input
                        type="text"
                        name="price"
                        id="price-create-ad"
                        placeholder="Введите цену"
                        className={`${errors.price && 'border-red-600'} border rounded p-2`}
                        {...register('price', {
                            onChange: (e) => {
                                let value = e.target.value.replace(/[^0-9]/g, '');
                                if (value.length > 1 && value.startsWith('0')) {
                                    value = value.replace(/^0+/, '');
                                }
                                setValue('price', value, { shouldValidate: true });
                            },
                        })}
                    />
                    {errors.price && (
                        <span className="text-red-600">{errors.price.message}</span>
                    )}
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white cursor-pointer p-3 rounded-xl mt-4 hover:bg-blue-700 transition"
                >
                    {loading ? "Создается..." : "Создать объявление"}
                </button>

            </form>
        </div>
    );
}

export default CreateAd;
