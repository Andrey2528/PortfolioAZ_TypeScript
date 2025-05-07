import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import certificateImg from '@/api/db/certificateImg';
import SertificateCard from './sertificateCard';

const SertificateWrapper = () => {
    const sortedCerticate = certificateImg.sort((a, b) => a.date - b.date);

    return (
        <>
            <div className="container">
                <div className="card__list">
                    {sortedCerticate.map((sertificate) => (
                        <SertificateCard
                            key={sertificate.id}
                            id={sertificate.id}
                            title={sertificate.title}
                            img={sertificate.img}
                            date={sertificate.date}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};
export default SertificateWrapper;
