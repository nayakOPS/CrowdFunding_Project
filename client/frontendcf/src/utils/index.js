export const daysLeft = (deadline) => {
  // Convert deadline to a date object and log it
  const deadlineDate = new Date(deadline * 1000).getTime();
  console.log("Deadline:", deadline);          // Log the original deadline
  console.log("Parsed Deadline:", deadlineDate); // Log the parsed deadline timestamp

  // Calculate the difference between the deadline and the current time
  const difference = deadlineDate - Date.now();

  // If the deadline has passed, return 0 days left
  if (difference < 0) {
      console.log("Difference is negative, returning 0 days left.");
      return 0;
  }

  // Calculate the remaining days
  const remainingDays = difference / (1000 * 3600 * 24);

  // Log the remaining days
  console.log("Remaining Days:", remainingDays);

  // Return the remaining days as an integer
  return remainingDays.toFixed(0);
};

  
  export const calculateBarPercentage = (goal, raisedAmount) => {
    const percentage = Math.round((raisedAmount * 100) / goal);
  
    return percentage;
  };
  
  export const checkIfImage = (url, callback) => {
    const img = new Image();
    img.src = url;
  
    if (img.complete) callback(true);
  
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
  };