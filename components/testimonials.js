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
        <Quote>"Implementing this chatbot AI has drastically reduced our response times and improved customer satisfaction. It's like having an extra team member that works around the clock, ensuring no customer query goes unanswered."</Quote>
      </TestimonialCard>
      <TestimonialCard>
        <Avatar>
          <img src="/olga-johnson.jpg" alt="Olga Jhonson" />
        </Avatar>
        <Name>OLGA JHONSON</Name>
        <Quote>"The chatbot AI has transformed the way we handle customer inquiries, freeing up our support team to focus on more complex issues. We've seen a significant increase in positive feedback from our customers."</Quote>
      </TestimonialCard>
      <TestimonialCard>
        <Avatar>
          <img src="/paul-smith.jpg" alt="Paul Smith" />
        </Avatar>
        <Name>PAUL SMITH</Name>
        <Quote>"Our customers love the instant responses they receive thanks to the chatbot AI. It's streamlined our support process, allowing us to maintain high levels of service even during peak times."</Quote>
      </TestimonialCard>
      <TestimonialCard>
        <Avatar>
          <img src="/nat-reynolds.jpg" alt="Nat Reynolds" />
        </Avatar>
        <Name>NAT REYNOLDS</Name>
        <Quote>"This chatbot AI has been a game-changer for our customer service department. It's incredibly efficient at addressing common queries, which has led to higher customer retention and satisfaction."</Quote>
      </TestimonialCard>
    </TestimonialsWrapper>
  );
}