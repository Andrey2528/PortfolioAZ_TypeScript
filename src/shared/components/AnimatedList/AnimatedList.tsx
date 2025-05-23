import { motion } from 'framer-motion';
import { animationSertificateProps } from '@/shared/config/animationConfig';
import { IAnimListProps } from '@/utils/interface/interfaceAnimList';

const AnimatedList = <T,>({
    items,
    keyExtractor,
    renderItem,
    animationConfig = animationSertificateProps,
}: IAnimListProps<T>) => {
    return (
        <ul className="animated-list">
            {items.map((item) => (
                <motion.li
                    className="animated-list__item"
                    key={keyExtractor(item)}
                    {...animationConfig}
                >
                    {renderItem(item)}
                </motion.li>
            ))}
        </ul>
    );
};
export default AnimatedList;
