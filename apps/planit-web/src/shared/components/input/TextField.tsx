import { TextInput, TextInputProps } from '@mantine/core';
import { BaseComponentProps } from '../base';

interface TextFieldProps extends BaseComponentProps, TextInputProps {
  label?: string;
  helperText?: string;
  errorText?: string;
}

export function TextField({
  required,
  label,
  helperText,
  errorText,
  ...props
}: TextFieldProps) {
  return (
    <TextInput
      required={required}
      label={label}
      description={helperText}
      error={errorText}
      {...props}
    />
  );
}
