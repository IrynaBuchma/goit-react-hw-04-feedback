import { useState } from "react";
import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Notification from "./Notification/Notification";

export default function App() {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addValue = (option) => {
    switch (option) {
      case 'good': 
        setGood(prevGood => prevGood + 1);
        break;
      case 'neutral': 
        setNeutral(prevNeutral => prevNeutral + 1);
        break;
      case 'bad': 
        setBad(prevBad => prevBad + 1);
        break;
      default:
        return;
    }
  }

  const TotalFeedback = () => {
    return good + neutral + bad; 
  }

  const positiveFeedbackPercentage = () => {
    return Math.round((good * 100) / TotalFeedback()) || 0;
  } 

  return (
    <div
        style={{
          marginBottom: 20,
          padding: 20,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
    >
      <Section title="Please leave feedback">
          <FeedbackOptions 
              options={['good', 'neutral', 'bad']} 
              onLeaveFeedback={addValue}></FeedbackOptions>
          </Section>
      <Section title="Statistics">
          {TotalFeedback() ? (
          <Statistics
              good={good} 
              neutral={neutral} 
              bad={bad} 
              total={TotalFeedback()} 
              positiveFeedbackPercentage={positiveFeedbackPercentage()}></Statistics>
            )
              : (
          <Notification message="There is no feedback"></Notification>
            )}
          </Section>
    </div>   
    )
  }
