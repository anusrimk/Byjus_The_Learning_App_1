// Subscription.jsx
import React from 'react';
import styles from './Subscription.module.css';

const Subscription = () => {
  const subscriptions = [
    {
      name: 'Wizard',
      price: '₹25,000/year',
      description: 'Perfect for individuals who want to explore their potential.',
      features: ['Feature 1: Access to basic tools', 'Feature 2: Limited storage', 'Feature 3: Email support'],
    },
    {
      name: 'Pro Wizard',
      price: '₹40,000/year',
      description: 'Designed for professionals aiming for mastery.',
      features: ['Feature 1: Access to all tools', 'Feature 2: Unlimited storage', 'Feature 3: Priority support'],
    },
  ];

  return (
    <div className={styles.container}>
      {subscriptions.map((sub, index) => (
        <div key={index} className={styles.subscriptionBox}>
          <div className={styles.details}>
            <h2 className={styles.name}>{sub.name}</h2>
            <p className={styles.description}>{sub.description}</p>
            <ul className={styles.features}>
              {sub.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className={styles.priceSection}>
            <p className={styles.price}>{sub.price}</p>
            <button className={styles.subscribeButton}>Subscribe Now</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Subscription;
