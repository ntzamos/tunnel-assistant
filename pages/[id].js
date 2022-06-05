import { supabase } from "../utils/supabase";

const ProjectDetails = ({ project }) => {
    console.log({project})
  return (
    <div className="w-full max-w-3xl mx-auto py-16 px-8">
      <h1 className="text-3xl mb-6">{project.title}</h1>
      <p>{project.description}</p>
    </div>
  );
};

export const getStaticPaths = async () => {
  const { data: projects } = await supabase.from("project").select("id");

  const paths = projects.map(({ id }) => ({
    params: {
      id: id.toString(),
    },
  }));

  
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { id } }) => {
  const { data: project } = await supabase
    .from("project")
    .select("*")
    .eq("id", id)
    .single();

  return {
    props: {
      project,
    },
  };
};

export default ProjectDetails;