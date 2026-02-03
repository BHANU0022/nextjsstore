import { useCartStore } from "@/store/cartStore";
import { cartService } from "@/services/cartService";

export const useCartMachine = () => {
  const {
    setItems,
    addItemLocal,
    updateQtyLocal,
    removeItemLocal,
    clear,
  } = useCartStore();

  const loadCart = async () => {
    debugger
    console.log("In  loadCartfetch")
    const res = await cartService.fetch();
    console.log("itttt", res)
    
    console.log("rrrr", res.data)
    console.log("rrrr", res.data.items)
    setItems(res?.data?.items ?? []);

   // setItems(res.data.items);
  };

  const addItem = async (item) => {
    await cartService.add(item);
    addItemLocal(item);
  };

  const updateQty = async (id, qty) => {
    await cartService.update({ id, qty });
    updateQtyLocal(id, qty);
  };

  const removeItem = async (id) => {
    await cartService.remove(id);
    removeItemLocal(id);
  };

  const clearCart = async () => {
    await cartService.clear();
    clear();
  };

  return {
    loadCart,
    addItem,
    updateQty,
    removeItem,
    clearCart,
  };
};
