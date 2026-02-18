import AdCard from "./AdCard.jsx";


const AdsList = ({ads}) => {
    return (
        <ul className="grid grid-cols-2 gap-4  xl:grid-cols-3 2xl:grid-cols-4 md:gap-6">
            {ads.length > 0 ? ads.map((ad) =>
                <AdCard key={ad.id} ad={ad}/>
            ) : null}
        </ul>
    )
}

export default AdsList;