import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

const today = dayjs();

export function formatDeliveryDate(deliveryDays){
    const deliveryDate = today.add(deliveryDays, 'days')
    const deliveryDateString = deliveryDate.format('dddd, MMMM D')
    return deliveryDateString;
}

