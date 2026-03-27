import {useContext, useEffect, useState} from "react";
import clsx from "clsx";
import {AuthContext} from "../../context/Auth/AuthContext.jsx";
import useServerRequest from "../../api/ServerRequest.jsx";

const PersonalInfoSection = ({user}) => {

    const [userData, setUserData] = useState({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        city: user.city || ''
    });
    const [cities, setCities] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    const { getAllCities } = useServerRequest()
    const { onUpdateUser } = useContext(AuthContext);

    useEffect(() => {
        getAllCities().then(data => setCities(data));
    }, [getAllCities]);

    const onChangeData = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value});
    }

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    }

    const handleSave = () => {
        onUpdateUser(user.id, userData);
        toggleEditing();
    }
    const handleCancel = () => {
        setUserData({
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || '',
            city: user.city || ''
        })
        toggleEditing()
    }

    const inputClass = clsx(
        'border w-full border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50',
        isEditing ? 'text-gray-800' : 'text-gray-400 cursor-not-allowed'
    );


    return (
        <div className="bg-white rounded-2xl shadow-md p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-gray-800">Личная информация</h2>
                {
                    !isEditing ?
                        <button onClick={toggleEditing} className="flex items-center gap-1.5 text-sm text-blue-800 hover:text-blue-600 cursor-pointer">
                            <span className="_icon-pencil text-base"></span>
                            <span>Редактировать</span>
                        </button> :
                        <div className="flex gap-8">
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-1.5 text-sm text-blue-800 hover:text-blue-600 cursor-pointer">Сохранить</button>
                            <button
                                onClick={handleCancel}
                                className="flex items-center gap-1.5 text-sm text-red-600 hover:text-red-800 cursor-pointer">Отмена</button>
                        </div>
                }
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs text-gray-500 mb-1">Имя</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Не указано"
                        value={userData.name}
                        onChange={onChangeData}
                        className={inputClass}
                        disabled={!isEditing}
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-500 mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Не указано"
                        value={userData.email}
                        onChange={onChangeData}
                        className={inputClass}
                        disabled={!isEditing}
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-500 mb-1">Телефон</label>
                    <input
                        type="text"
                        name="phone"
                        placeholder="Не указано"
                        value={userData.phone}
                        onChange={onChangeData}
                        className={inputClass}
                        disabled={!isEditing}
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-500 mb-1">Город</label>
                    <select className={inputClass} name='city' value={userData.city} onChange={onChangeData}>
                        <option value="">Выберите город</option>
                        {cities.map(item => (
                            <option key={item.id} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default PersonalInfoSection;