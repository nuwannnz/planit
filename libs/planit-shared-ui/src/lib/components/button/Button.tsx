import { Button as ChakraButton } from '@chakra-ui/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
export const Button = (props: ButtonProps) => {
  return (
    <ChakraButton {...props} className={`btn btn-primary ${props.className}`}>
      {props.children}
    </ChakraButton>
  );
};
