import AnimatedList from '@/shared/components/AnimatedList/AnimatedList';
import skillsListDB from '@/shared/constants/skillsList';
import { ISkill } from '@/shared/interface/interfaceSocial';

const SkillsListRender = () => {
    return (
        <AnimatedList
            items={skillsListDB}
            keyExtractor={(item: ISkill) => item.id}
            renderItem={(item: ISkill) => (
                <p className="info__text info_description">{item.title}</p>
            )}
        />
    );
};

export default SkillsListRender;
