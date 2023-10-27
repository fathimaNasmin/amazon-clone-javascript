export const deliveryOptions = [
    {
        id: '1',
        deliveryDays:7,
        deliveryPriceCents:0
    },{
        id: '2',
        deliveryDays:3,
        deliveryPriceCents:499
    },{
        id: '3',
        deliveryDays:1,
        deliveryPriceCents:999
    }
];

export function getDeliveryOption(deliveryOptionId){
    let matchingDeliveryOption;
    deliveryOptions.forEach((deliveryOption) => {
        if (deliveryOptionId === deliveryOption.id){
            matchingDeliveryOption = deliveryOption;
        }

    });
    return matchingDeliveryOption;
}