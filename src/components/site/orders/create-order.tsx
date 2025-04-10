import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BadgePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useAdminStore } from "../../../stores/useAdminStore";
import { useOrderStore } from "../../../stores/useOrderStore";
import { OrderItem } from "../../../types";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../ui/sidebar";

export default function CreateOrder() {
  const { products, getallProducts } = useAdminStore();
  const { createOrder } = useOrderStore();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    getallProducts();
  }, [getallProducts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createOrder({ totalAmount, items });
    setOpen(!open);
  };

  // Handle adding items to the order
  const handleUpdateItems = (selectedProductName: string) => {
    const findProduct = items.find(
      (item) => item.productName === selectedProductName
    );

    if (findProduct) return;

    const selectedProduct = products.find(
      (product) => product.name === selectedProductName
    );

    if (selectedProduct) {
      const newItem: OrderItem = {
        productId: selectedProduct.id,
        price: selectedProduct.price,
        productName: selectedProduct.name,
        quantity: 1,
      };
      setItems((prevItems) => [...prevItems, newItem]);
      setTotalAmount((prevTotal) => prevTotal + selectedProduct.price);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <BadgePlus />
                Create Order
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-3xl">Add Order</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <Label>Total Amount</Label>
            <Input
              placeholder="Enter Total Amount"
              type="number"
              value={Math.ceil(totalAmount)}
              readOnly
            />
          </div>
          <div>
            <Select onValueChange={handleUpdateItems}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Products" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem value={product.name} key={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            {items.map((item) => (
              <li key={item.productId}>{item.productName}</li>
            ))}
          </div>
          <Button type="submit">Create Order</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
