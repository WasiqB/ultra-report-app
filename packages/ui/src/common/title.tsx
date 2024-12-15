import { JSX } from 'react';

interface TitleProps {
  text: string;
}

export const Title = ({ text }: TitleProps): JSX.Element => {
  return (
    <h2 className='text-foreground text-center text-3xl font-bold'>{text}</h2>
  );
};
