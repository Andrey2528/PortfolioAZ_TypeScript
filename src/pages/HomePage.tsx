import { useState, useEffect } from 'react';
import CardWrapper from '@/components/Portfolio/CardWrapper';
import Loader from '@/shared/components/Loader/Loader';

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Симуляція завантаження компонента
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 100); // Швидке завантаження для HomePage

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <CardWrapper />
        </>
    );
};
export default HomePage;
