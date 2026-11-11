"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import { getBuyable, isBuyable } from "@/lib/catalog";

export type CartLine = { slug: string; quantity: number };

type State = { lines: CartLine[] };

type Action =
  | { type: "add"; slug: string; quantity: number }
  | { type: "remove"; slug: string }
  | { type: "setQuantity"; slug: string; quantity: number }
  | { type: "clear" }
  | { type: "hydrate"; lines: CartLine[] };

const STORAGE_KEY = "sajid-cart-v1";
const MAX_QUANTITY = 20;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "hydrate":
      return { lines: action.lines.filter((line) => isBuyable(line.slug) && line.quantity > 0) };

    case "add": {
      const existing = state.lines.find((line) => line.slug === action.slug);
      if (!existing) {
        return { lines: [...state.lines, { slug: action.slug, quantity: Math.min(action.quantity, MAX_QUANTITY) }] };
      }
      return {
        lines: state.lines.map((line) =>
          line.slug === action.slug
            ? { ...line, quantity: Math.min(line.quantity + action.quantity, MAX_QUANTITY) }
            : line,
        ),
      };
    }

    case "setQuantity": {
      const quantity = Math.max(0, Math.min(action.quantity, MAX_QUANTITY));
      if (quantity === 0) return { lines: state.lines.filter((line) => line.slug !== action.slug) };
      return {
        lines: state.lines.map((line) => (line.slug === action.slug ? { ...line, quantity } : line)),
      };
    }

    case "remove":
      return { lines: state.lines.filter((line) => line.slug !== action.slug) };

    case "clear":
      return { lines: [] };

    default:
      return state;
  }
}

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  ready: boolean;
  isOpen: boolean;
  add: (slug: string, quantity?: number) => void;
  remove: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] });
  const [ready, setReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Rehydrate from storage after mount so server and client markup match.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) dispatch({ type: "hydrate", lines: parsed });
      }
    } catch {
      /* storage unavailable — start empty */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
    } catch {
      /* storage unavailable — cart stays in memory for this session */
    }
  }, [state.lines, ready]);

  // Lock background scrolling while the drawer is open.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const add = useCallback((slug: string, quantity = 1) => dispatch({ type: "add", slug, quantity }), []);
  const remove = useCallback((slug: string) => dispatch({ type: "remove", slug }), []);
  const setQuantity = useCallback(
    (slug: string, quantity: number) => dispatch({ type: "setQuantity", slug, quantity }),
    [],
  );
  const clear = useCallback(() => dispatch({ type: "clear" }), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(() => {
    const count = state.lines.reduce((total, line) => total + line.quantity, 0);
    const subtotal = state.lines.reduce((total, line) => {
      const item = getBuyable(line.slug);
      return total + (item ? item.price * line.quantity : 0);
    }, 0);
    return { lines: state.lines, count, subtotal, ready, isOpen, add, remove, setQuantity, clear, open, close };
  }, [state.lines, ready, isOpen, add, remove, setQuantity, clear, open, close]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside <CartProvider>");
  return context;
}