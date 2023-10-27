import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

const today = dayjs();

function isWeekend(date){
    const dayOfWeek = date.format('dddd');
    return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}

export function formatDeliveryDate(deliveryDays){
    let remainingDays = deliveryDays;
    let deliveryDate = dayjs();

    while (remainingDays > 0){
        deliveryDate = deliveryDate.add(1, 'day')

        if(!isWeekend(deliveryDate)){
            remainingDays--;
        }
    }
        
    
    const deliveryDateString = deliveryDate.format('dddd, MMMM D')
    return deliveryDateString;
}

