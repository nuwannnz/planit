import { Heading, HeadingProps, Text, TextProps } from '@chakra-ui/react';
import { BaseComponentProps } from '../../../generated/base';

interface TypographyProps extends BaseComponentProps, HeadingProps, TextProps {
  variant?: 'body' | 'heading' | 'subheading';
  children?: React.ReactNode;
}

export function Typography({ variant, children, ...props }: TypographyProps) {
  if (variant === 'heading') {
    return <Heading {...props}>{children}</Heading>;
  }

  if (variant === 'subheading') {
    return (
      <Heading as="h2" size="md" {...props}>
        {children}
      </Heading>
    );
  }

  return <Text {...props}>{children}</Text>;
}
