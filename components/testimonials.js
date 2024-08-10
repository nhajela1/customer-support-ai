// components/Testimonials.js

import styled from 'styled-components';

const TestimonialsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  /* padding: 50px 50px; */
  text-align: center;
  background-color: #f7faff;
`;

const TestimonialCard = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 20px;
  img {
    width: 100%;
    height: auto;
  }
`;

const Name = styled.h3`
  font-size: 18px;
  margin: 10px 0;
  color: #4a90e2;
`;

const Quote = styled.p`
  font-size: 16px;
  color: #555;
`;

export default function Testimonials() {
  return (
    <TestimonialsWrapper>
      <TestimonialCard>
        <Avatar>
          <img src="/stella-larson.jpg" alt="Stella Larson" />
        </Avatar>
        <Name>STELLA LARSON</Name>
        <Quote>Sample text. Click to select the text box. Click again or double click to start editing the text.</Quote>
      </TestimonialCard>
      <TestimonialCard>
        <Avatar>
          <img src="/olga-johnson.jpg" alt="Olga Jhonson" />
        </Avatar>
        <Name>OLGA JHONSON</Name>
        <Quote>Sample text. Click to select the text box. Click again or double click to start editing the text.</Quote>
      </TestimonialCard>
      <TestimonialCard>
        <Avatar>
          <img src="/paul-smith.jpg" alt="Paul Smith" />
        </Avatar>
        <Name>PAUL SMITH</Name>
        <Quote>Sample text. Click to select the text box. Click again or double click to start editing the text.</Quote>
      </TestimonialCard>
      <TestimonialCard>
        <Avatar>
          <img src="/nat-reynolds.jpg" alt="Nat Reynolds" />
        </Avatar>
        <Name>NAT REYNOLDS</Name>
        <Quote>Sample text. Click to select the text box. Click again or double click to start editing the text.</Quote>
      </TestimonialCard>
    </TestimonialsWrapper>
  );
}