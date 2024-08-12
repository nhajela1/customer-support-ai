// components/FAQ.js

import styled from 'styled-components';
import { useState } from 'react';

const FAQWrapper = styled.div`
  padding: 30px 0;
  background-color: #f7faff;
`;

const FAQTitle = styled.h2`
  text-align: center;
  margin-bottom: 40px;
  padding-top: 20px;
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
  max-height: ${({ $isOpen }) => ($isOpen ? '1000px' : '0')};
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, padding 0.3s ease-in-out;
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
    { question: 'What is BOT.ai?', answer: 'The Customer Support AI Chatbot is an AI-powered chatbot that resolves customer queries in real-time using natural language processing.' },
    { question: 'How can I use BOT.ai?', answer: 'You can use the chatbot by integrating it into your website or mobile application. It can be used to provide customers with individualized responses based on their needs.' },
    { question: 'Is BOT.ai customizable?', answer: 'Yes, the chatbot is customizable. Companies can tailor the chatbot’s tone and style to match their brand identity. Organization administrators can configure the bot by providing a specific description of the services via text entry and document upload.' },
    { question: 'What are the benefits of using BOT.ai?', answer: 'The chatbot allows enterprises to scale their customer support operations by providing 24/7 automated assistance. It can handle a large volume of customer queries simultaneously, ensuring immediate support for customers.' },
    { question: 'How does BOT.ai work?', answer: 'The chatbot uses natural language processing to understand customer queries and provide relevant responses. It can be trained to recognize specific keywords and phrases based on your organization\'s offerings, enabling it to provide accurate and personalized responses to customers.' },
    { question: 'How can I get assistance integrating BOT.ai?', answer: 'If you need assistance integrating the chatbot into your website or mobile application, please contact our support team by filling out the contact form below.' }
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
