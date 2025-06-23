import React, { useState, useEffect } from 'react';


export default function useGreetings() {
  const [greeting, setGreeting] = useState('');
  const [holidayMessage, setHolidayMessage] = useState('');
  const holidays = {
    '6-1': "Happy Madaraka Day :tada:", 
    '12-25': "Merry Christmas :christmas_tree:",
    '5-1': "Happy Labour Day :hammer_and_pick:", 
    '1-1': "Happy New Year :fireworks:",
    '6-23': "Happy Presentation Day :trophy:"
  };

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    
    if (hour < 12) {
      setGreeting('Good Morning');
    } else if (hour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  
    const todayKey = `${now.getMonth() + 1}-${now.getDate()}`; // e.g. "6-1"
    if (holidays[todayKey]) {
      setHolidayMessage(holidays[todayKey]);
    }
  }, []);
  return {greeting, holidayMessage}
   
  
};