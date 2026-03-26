import {useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {createEditSchema} from "../schemas/create-form/createEditForm.js";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import useServerRequest from "../api/ServerRequest.jsx";

const AdForm = ({mode, data, handleSubmitForm, loading}) => {
    const [categories, setCategories] = useState([]);
    const [cities, setCities] = useState([]);
    const {getAllCategories, getAllCities} = useServerRequest();

    const {
        register,
        handleSubmit, control,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(createEditSchema),
        defaultValues: {
            images: mode === "edit"
                ? data.images.map(url => ({ file: null, preview: url }))
                : [],
            title: mode === "edit" ? data.title : "",
            description: mode === "edit" ? data.description : "",
            category: mode === "edit" ? data.category : "",
            city: mode === "edit" ? data.city : "",
            price: mode === "edit" ? data.price.toString() : "",
        }
    })

    const images = useWatch({
        control,
        name: 'images'
    })

    const imagesSafe = images || [];

    useEffect(() => {
        getAllCategories()
            .then(cats => {
                setCategories(cats)
                if (mode === "edit") {
                    setTimeout(() => {
                        setValue("category", data.category);
                    }, 0);
                }
            })
            .catch(error => toast.error(`Ошибка загрузки категорий: ${error}`));

        getAllCities()
            .then(items => {
                setCities(items);
                if (mode === "edit") {
                    setTimeout(() => {
                        setValue("city", data.city);
                    }, 0);
                }
            }).catch(error => toast.error(`Ошибка загрузки городов: ${error}`));
    }, [])

    useEffect(() => {
        return () => {
            imagesSafe.forEach(img => {
                try {
                    URL.revokeObjectURL(img.preview);
                } catch (e) {
                    // ignore if preview is not an object URL
                }
            });
        };
    }, [imagesSafe]);


    const handleAddImages = (e) => {
        const files = Array.from(e.target.files || []);
        const newImages = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        const currentImages = imagesSafe;

        setValue('images', [...currentImages, ...newImages].slice(0, 5), { shouldValidate: true });
    };

    const handleRemoveImage = (index) => {
        const currentImages = imagesSafe;

        const toRemove = currentImages[index];
        if (toRemove) {
            URL.revokeObjectURL(toRemove.preview);
        }

        setValue('images', currentImages.filter((_, i) => i !== index), {
            shouldValidate: true,
        });
    };

    return (
        <>
            <form className="flex flex-col mt-10 gap-8 max-w-xl" onSubmit={handleSubmit((data) => handleSubmitForm(data, images))}>

                <div className="flex flex-col gap-3">
                    <span className="text-lg">Загрузите фото:</span>

                    <div className="grid grid-cols-3 gap-4">

                        {imagesSafe.length < 5 && (
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
                                    onChange={(e) => handleAddImages(e)}
                                />
                            </label>
                        )}

                        {imagesSafe.map((url, index) => (
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
                        {cities.map((city) => (
                            <option key={city.id} value={city.name}>{city.name}</option>
                        ))}
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
        </>
    );
}

export default AdForm;