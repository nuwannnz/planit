import { Field, Input, InputProps } from '@chakra-ui/react';

interface TextFieldProps extends InputProps {
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
    <Field.Root required={required} invalid={!!errorText}>
      <Field.Label>
        {label}
        {required && <Field.RequiredIndicator />}
      </Field.Label>
      <Input variant="outline" {...props} />
      <Field.HelperText>{helperText}</Field.HelperText>
      <Field.ErrorText>{errorText}</Field.ErrorText>
    </Field.Root>
  );
}
