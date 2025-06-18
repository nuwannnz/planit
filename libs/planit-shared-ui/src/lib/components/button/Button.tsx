import { ButtonProps, Button as ChakraButton } from '@chakra-ui/react';

export const Button = (props: ButtonProps) => {
  return (
    <ChakraButton {...props} className={`btn btn-primary ${props.className}`}>
      {props.children}
    </ChakraButton>
  );
};
