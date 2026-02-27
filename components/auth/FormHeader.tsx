interface FormHeaderProps {
  title: string;
  description: string;
}

const FormHeader: React.FC<FormHeaderProps> = (props) => {
  const { title, description } = props;
  return (
    <div className="mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
        {title}
      </h2>
      <p className="text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  );
};

export default FormHeader;
