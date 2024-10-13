function calculateTotalTarget(startDate, endDate, totalAnnualTarget) {
    // 1. Parse the startDate and endDate strings into Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // 2. Initialize arrays for storing data
    let daysExcludingFridays = [];
    let daysWorkedExcludingFridays = [];
    let monthlyTargets = [];
    
    // 3. Loop through each month between the start and end dates
    let current = new Date(start);
    while (current <= end) {
        const month = current.getMonth();
        const year = current.getFullYear();
        
        // 4. Calculate the number of days in the current month
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // 5. Count non-Friday working days in the month
        let nonFridayDays = 0;
        let nonFridayWorkedDays = 0;
        
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const isFriday = date.getDay() === 5;
            
            if (!isFriday) {
                nonFridayDays++;
                // Check if the day is within the provided date range
                if (date >= start && date <= end) {
                    nonFridayWorkedDays++;
                }
            }
        }
        
        // Store the calculated values
        daysExcludingFridays.push(nonFridayDays);
        daysWorkedExcludingFridays.push(nonFridayWorkedDays);
        
        // 6. Calculate the target distribution for the month
        const monthlyTarget = (nonFridayWorkedDays / nonFridayDays) * (totalAnnualTarget / 12);
        monthlyTargets.push(monthlyTarget);
        
        // Move to the next month
        current.setMonth(current.getMonth() + 1);
        current.setDate(1); // Reset date to the first to prevent overflow issues
    }
    
    // 7. Calculate the total target based on the worked days within the range
    const totalTarget = monthlyTargets.reduce((acc, val) => acc + val, 0);
    
    // 8. Return an object with the results
    return {
        daysExcludingFridays: daysExcludingFridays,
        daysWorkedExcludingFridays: daysWorkedExcludingFridays,
        monthlyTargets: monthlyTargets,
        totalTarget: totalTarget
    };
}

// Example usage
const result = calculateTotalTarget('2022-01-01', '2022-01-31', 5220);
console.log(result);
