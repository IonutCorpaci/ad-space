import {useLoaderData, useNavigate} from "react-router";
import {useContext, useState} from "react";
import AdForm from "../components/AdForm.jsx";
import {AuthContext} from "../context/Auth/AuthContext.jsx";
import useServerRequest from "../api/ServerRequest.jsx";
import {uploadToCloudinary} from "../utils/UploadToClodinary.jsx";
import toast from "react-hot-toast";

const EditAd = () => {
    const ad = useLoaderData();
    const [loading, setLoading] = useState(false);
    const {user} = useContext(AuthContext);
    const {editAd} = useServerRequest();

    const navigate = useNavigate();

    const handleSubmitForm = async (data, uploadedImages) => {

        setLoading(true);

        try {
            const existingUrls = (uploadedImages || [])
                .filter(img => !img.file)
                .map(img => img.preview);

            const newFiles = (uploadedImages || []).filter(img => img.file);

            const uploadedUrls = [...existingUrls];
            for (const img of newFiles) {
                const url = await uploadToCloudinary(img.file);
                uploadedUrls.push(url);
            }

            const editedAd = {
                title: data.title,
                description: data.description,
                price: data.price,
                category: data.category,
                city: data.city,
                userId: user.id,
                images: uploadedUrls,
            };

            await editAd(ad.id, editedAd);
            navigate("/");
        } catch (error) {
            const message =
                error.message ||
                "Что-то пошло не так..";

            toast.error(message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container mx-auto px-4 mt-10">
            <h1 className="text-5xl">Редатктирование объявления</h1>

            <AdForm mode="edit" data={ad} handleSubmitForm={handleSubmitForm} loading={loading}/>
        </div>
    )
}

export default EditAd;