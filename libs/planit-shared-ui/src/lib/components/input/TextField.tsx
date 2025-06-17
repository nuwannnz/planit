import { Field, Input, InputProps } from '@chakra-ui/react';

interface TextFieldProps extends InputProps {
  label?: string;
  helperText?: string;
}

export function TextField(props: TextFieldProps) {
  return (
    <Field.Root required={props.required}>
      <Field.Label>
        {props.label}
        {props.required && <Field.RequiredIndicator />}
      </Field.Label>
      <Input variant="outline" {...props} />
      <Field.HelperText>{props.helperText}</Field.HelperText>
    </Field.Root>
  );
}
