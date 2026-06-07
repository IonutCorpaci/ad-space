import {useContext, useState} from "react";
import {uploadToCloudinary} from "../utils/UploadToClodinary.jsx";
import {AuthContext} from "../context/Auth/AuthContext.jsx";
import {useNavigate} from "react-router";
import useServerRequest from "../api/ServerRequest.jsx";
import toast from "react-hot-toast";
import AdForm from "../components/AdForm.jsx";

const CreateAd = () => {
    const [loading, setLoading] = useState(false);
    const {user, addUserAd} = useContext(AuthContext);
    const {createAd} = useServerRequest();

    const navigate = useNavigate();

    const handleSubmitForm = async (data, uploadedImages) => {

        setLoading(true);

        try {
            // In create flow: upload only files and include any non-file previews if present
            const existingPreviews = (uploadedImages || []).filter(img => !img.file).map(img => img.preview);
            const newFiles = (uploadedImages || []).filter(img => img.file);

            const uploadedUrls = [...existingPreviews];
            for (const img of newFiles) {
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

            const adId = await createAd(ad);
            await addUserAd(adId);
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
        <div className="container mx-auto mt-10">
            <h1 className="text-5xl">Создать объявление</h1>

            <AdForm mode="create" data={{}} handleSubmitForm={handleSubmitForm} loading={loading}/>
        </div>
    );
}

export default CreateAd;
