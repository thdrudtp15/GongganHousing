import ContentWrap from '@/wrappers/ContentWrap';
import ProjectItems from '@/components/ProjectItems';

const Projects = () => {
  return (
    <section className="bg-[#0b1b30] py-[100px]">
      <ContentWrap>
        <div className="flex gap-[20px] mb-[100px] flex-col">
          <h2 className="text-[50px] text-[#ffffff] font-bold">
            시공사례
          </h2>
          <p className="text-[20px] font-medium text-[#ffffff]">
            “투명한 과정, 전문적인 시공으로 당신의 공간을
            완성합니다.”
          </p>
        </div>
        <ProjectItems />
      </ContentWrap>
    </section>
  );
};

export default Projects;
