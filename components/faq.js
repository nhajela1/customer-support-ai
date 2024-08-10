// components/FAQ.js

import styled from 'styled-components';
import { useState } from 'react';

const FAQWrapper = styled.div`
  /* padding: 50px 0; */
  background-color: #f7faff;
`;

const FAQTitle = styled.h2`
  text-align: center;
  margin-bottom: 40px;
  font-size: 24px;
  color: #4a4a4a;
`;

const Question = styled.div`
  background: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background: #f9f9f9;
  }
`;

const Answer = styled.div`
  max-height: ${({ $isOpen }) => ($isOpen ? '500px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease;
  background: #f9f9f9;
  padding: ${({ $isOpen }) => ($isOpen ? '20px' : '0 20px')};
  border-left: 1px solid #e6e6e6;
  border-right: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
  border-radius: 0 0 5px 5px;
`;

const PlusMinus = styled.span`
  font-size: 24px;
  color: #4a4a4a;
`;

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  const faqData = [
    { question: 'What is Cult Wines?', answer: 'Cult Wines is...' },
    { question: 'What sets Cult Wines Investment apart?', answer: 'Cult Wines Investment stands out due to...' },
    { question: 'Can you tell me about your CSR / ESG initiatives?', answer: 'Our CSR / ESG initiatives include...' },
    { question: 'What services do you provide?', answer: 'We offer services such as...' },
    { question: 'How does wine investing work?', answer: 'Wine investing works by...' },
    { question: 'Is investing in wine suitable for me?', answer: 'Wine investment may be suitable for...' },
    { question: 'How is wine investment regulated?', answer: 'Wine investment is regulated by...' },
    { question: 'What regions does Cult Wines invest in?', answer: 'We invest in regions such as...' },
    { question: 'What are the recommended investment terms?', answer: 'The recommended investment terms are...' },
    { question: 'How can I sell my wine?', answer: 'You can sell your wine by...' },
    { question: 'How quickly can I liquidate my portfolio?', answer: 'You can liquidate your portfolio by...' },
    { question: 'Where is the wine stored?', answer: 'The wine is stored in...' },
  ];

  return (
    <FAQWrapper>
      <FAQTitle>Frequently Asked Questions</FAQTitle>
      {faqData.map((faq, index) => (
        <div key={index} padding={5}>
          <Question style={{color: 'black'}} onClick={() => toggleFAQ(index)}>
            {faq.question}
            <PlusMinus>{openIndex === index ? '-' : '+'}</PlusMinus>
          </Question>
          <Answer $isOpen={openIndex === index} style={{color: 'black'}}>{faq.answer}</Answer>
        </div>
      ))}
    </FAQWrapper>
  );
}
