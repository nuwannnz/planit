interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
export const Button = (props: ButtonProps) => {
  return (
    <button className="btn btn-primary" {...props}>
      {props.children}
    </button>
  );
};
