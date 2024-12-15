import { JSX } from 'react';

interface DescriptionProps {
  text: string;
}

export const Description = ({ text }: DescriptionProps): JSX.Element => {
  return (
    <p className='text-muted-foreground leading-normal sm:text-lg sm:leading-7'>
      {text}
    </p>
  );
};
