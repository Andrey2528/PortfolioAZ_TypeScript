import '@/styles/index.scss';

const SertificateCard = ({ id, title, date, img }) => {
    return (
        <div className="card" id={id}>
            <div className="card__row sertificate__margin">
                <p className="card__desc">{title}</p>
                <span className="card__number card__desc">{date}</span>
            </div>
            <div className="card__miniature">
                <img src={img} alt={title} className="sertificate__img" />
            </div>
        </div>
    );
};

export default SertificateCard;
