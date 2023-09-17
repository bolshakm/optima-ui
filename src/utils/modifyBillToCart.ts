// import { IBill } from '../types'
// import { ICartItem } from '../store/slices/cart/cart.slice'

// export const modifyBillToCart = (bill: IBill): ICartItem[] => {
//   if (!bill || !bill.orderedDish?.length) {
//     return []
//   };

//   return bill.orderedDish.reduce((acc, item) => {
//     const findedIndex = acc.findIndex((el) => el.dish.id === item.productId && item.selectedVolumeId === el.volumeId);

    
//     if (findedIndex === -1) {
//       acc = [
//         ...acc,
//         {
//           dish: {
//             id: item.productId,
//             name: item.name,
//             description: item.description,
//             dishVolumesAndPrice: item.volumeDataList,
//             image: item.image,
//           },
//           quantity: item.quantity,
//           volumeId: item.selectedVolumeId
//         }
//       ];
//     } else {
//       acc[findedIndex].quantity = acc[findedIndex].quantity + item.quantity;
//     }
    
//     return acc;
//   }, [] as ICartItem[])
// };
 
export const g = () => {};