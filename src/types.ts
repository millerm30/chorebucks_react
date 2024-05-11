export interface CartItem {
  title: string;
  points: number;
  quantity: number;
  id: string;
}

export interface ShoppingContextType {
  cart: CartItem[];
  addToCartHandler: (itemTitle: string, itemPoints: number) => void;
  removeFromCartHandler: (wish: CartItem) => void;
  purchaseCartHandler: () => void;
  cartTotal: number;
  updateCartItem: (wish: CartItem) => void;
}

export interface Wish {
  id: string;
  title: string;
  points: number;
  style: {
    borderColor: string;
  };
}

export interface Chore {
  id: string;
  title: string;
  points: number;
  style: {
    borderColor: string;
  };
}

export interface ChoresContextType {
  chores: Chore[];
  addChore: (title: string, points: number) => void;
  removeChore: (chore: Chore) => void;
  completeChore: (chore: Chore) => void;
}

export interface UserContextType {
  login: (username: string, password: string) => void;
  handleLogOut: () => void;
  user: User | null;
  isLoggedIn: boolean;
}

export interface User {
  username: string;
  password: string;
}