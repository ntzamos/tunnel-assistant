import { supabase } from "../utils/supabase";
import Link from "next/link";


export default function Projects({ projects }) {
  return (
    <div className="w-full max-w-3xl mx-auto my-16 px-2">
      {projects.map((project) => (
        <Link key={project.id} href={`/projects/${project.id}`}>
          <a className="p-8 h-40 mb-4 rounded shadow text-xl flex">
            {project.title}

            <p>{project.description}</p>
          </a>

        </Link>
      ))}
    </div>
  );
}

export const getStaticProps = async () => {
  const { data: projects } = await supabase.from("project").select("*");

  return {
    props: {
      projects,
    },
  };
};


