import {
  ButtonProps as ChakraButtonProps,
  Button as ChakraButton,
} from '@chakra-ui/react';
import { BaseComponentProps } from '../../../generated/base';

interface ButtonProps extends BaseComponentProps, ChakraButtonProps {}

export const Button = (props: ButtonProps) => {
  return (
    <ChakraButton {...props} className={`btn btn-primary ${props.className}`}>
      {props.children}
    </ChakraButton>
  );
};
