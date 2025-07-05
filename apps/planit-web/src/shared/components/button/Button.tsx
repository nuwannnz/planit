import {
  Button as MantineButton,
  ButtonProps as MantineButtonProps,
} from '@mantine/core';
import { BaseComponentProps } from '../base';
import { BLACK } from '@/shared/branding/colors';
import { DOMAttributes } from 'react';

type ButtonProps = BaseComponentProps &
  DOMAttributes<HTMLButtonElement> &
  MantineButtonProps & { type: 'button' | 'submit' | 'reset' };

export const Button = (props: ButtonProps) => {
  return (
    <MantineButton {...props} color={BLACK}>
      {props.children}
    </MantineButton>
  );
};
