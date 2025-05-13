import img1Dark from '@/assets/images/socialIMG/dark/socialGithub.svg';
import img2Dark from '@/assets/images/socialIMG/dark/socialInstagram.svg';
import img3Dark from '@/assets/images/socialIMG/dark/socialLinkedin.svg';
import img4Dark from '@/assets/images/socialIMG/dark/socialTelegram.svg';
import img1Light from '@/assets/images/socialIMG/light/socialGithub.svg';
import img2Light from '@/assets/images/socialIMG/light/socialInstagram.svg';
import img3Light from '@/assets/images/socialIMG/light/socialLinkedin.svg';
import img4Light from '@/assets/images/socialIMG/light/socialTelegram.svg';

interface ISocialImg {
    id: number;
    img: string;
    title: string;
}

export const socialImg: ISocialImg[] = [
    {
        id: 8,
        img: img4Light,
        title: 'Telegram',
    },
    {
        id: 7,
        img: img3Light,
        title: 'LinkedIn',
    },
    {
        id: 6,
        img: img2Light,
        title: 'Instagram',
    },
    {
        id: 5,
        img: img1Light,
        title: 'Github',
    },
    {
        id: 4,
        img: img4Dark,
        title: 'Telegram',
    },
    {
        id: 3,
        img: img3Dark,
        title: 'LinkedIn',
    },
    {
        id: 2,
        img: img2Dark,
        title: 'Instagram',
    },
    {
        id: 1,
        img: img1Dark,
        title: 'Github',
    },
];

export default socialImg;
