import styled from 'styled-components';

const Title = styled.h4`
  text-transform: uppercase;
  margin-bottom: 1.5rem;
`;
const Text = styled.p`
  line-height: 1.5;
`;
const SubTitle = styled.h5`
  margin-bottom: 0.7rem;
`;

export default function ShippingCol({ column: { title, text, subtitle } }) {
  return (
    <article>
      <Title>{title}</Title>
      {subtitle && <SubTitle>{subtitle}</SubTitle>}
      <Text>{text}</Text>
      {/* generuoti addresa jei gaunam addreso duomenis */}
    </article>
  );
}
