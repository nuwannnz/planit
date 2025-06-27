import {
  Button as MantineButton,
  ButtonProps as MantineButtonProps,
} from '@mantine/core';
import { BaseComponentProps } from '../base';
import { BLACK } from '@/shared/branding/colors';

type ButtonProps = BaseComponentProps &
  MantineButtonProps & { type: 'button' | 'submit' | 'reset' };

export const Button = (props: ButtonProps) => {
  return (
    <MantineButton {...props} color={BLACK}>
      {props.children}
    </MantineButton>
  );
};
