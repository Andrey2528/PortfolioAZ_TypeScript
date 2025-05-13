import { motion } from 'framer-motion';
import { IPortfolioCardFull } from '@/shared/interface/interfaceCard';
import { animationCardProps } from '@/shared/config/animationConfig';
import Card from '@/shared/components/Card/Card';

interface RenderCardProps {
    card: IPortfolioCardFull;
    index: number;
    observerRef: React.MutableRefObject<IntersectionObserver | null>;
    visibleCards: Set<number>;
    openModal: (card: IPortfolioCardFull) => void;
}

const RenderCard: React.FC<RenderCardProps> = ({
    card,
    index,
    observerRef,
    visibleCards,
    openModal,
}) => {
    return (
        <motion.div
            key={card.id}
            className="card"
            data-index={index}
            ref={(el) => {
                if (el && observerRef.current) {
                    observerRef.current.observe(el);
                }
            }}
            {...animationCardProps}
            animate={
                visibleCards.has(index)
                    ? animationCardProps.animate
                    : animationCardProps.initial
            }
            transition={{
                ...animationCardProps.transition,
                delay: index * 0.1,
            }}
        >
            <Card<IPortfolioCardFull>
                card={card}
                openModal={openModal}
                titleKey="title"
                subTitleKey="subTitle"
                imgKey="img"
                idKey="id"
            />
        </motion.div>
    );
};

export default RenderCard;
