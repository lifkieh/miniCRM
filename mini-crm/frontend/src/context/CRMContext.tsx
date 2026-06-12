import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Customer, Order } from '../types';
import { fetchCustomers, fetchOrders } from '../api';

// ─── State ────────────────────────────────────────────────────────────────────

interface CRMState {
  customers: Customer[];
  orders: Order[];
  selectedCustomerId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: CRMState = {
  customers: [],
  orders: [],
  selectedCustomerId: null,
  loading: false,
  error: null,
};

// ─── Actions ──────────────────────────────────────────────────────────────────

type Action =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CUSTOMERS'; payload: Customer[] }
  | { type: 'ADD_CUSTOMER'; payload: Customer }
  | { type: 'SET_ORDERS'; payload: Order[] }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'SELECT_CUSTOMER'; payload: string | null };

function reducer(state: CRMState, action: Action): CRMState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_CUSTOMERS':
      return { ...state, customers: action.payload };
    case 'ADD_CUSTOMER':
      return { ...state, customers: [action.payload, ...state.customers] };
    case 'SET_ORDERS':
      return { ...state, orders: action.payload };
    case 'ADD_ORDER':
      return { ...state, orders: [action.payload, ...state.orders] };
    case 'SELECT_CUSTOMER':
      return { ...state, selectedCustomerId: action.payload };
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface CRMContextValue extends CRMState {
  dispatch: React.Dispatch<Action>;
  refreshAll: () => Promise<void>;
}

const CRMContext = createContext<CRMContextValue | undefined>(undefined);

export function CRMProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const refreshAll = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    try {
      const [customers, orders] = await Promise.all([fetchCustomers(), fetchOrders()]);
      dispatch({ type: 'SET_CUSTOMERS', payload: customers });
      dispatch({ type: 'SET_ORDERS', payload: orders });
    } catch (err: any) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  useEffect(() => {
    refreshAll();
  }, []);

  return (
    <CRMContext.Provider value={{ ...state, dispatch, refreshAll }}>
      {children}
    </CRMContext.Provider>
  );
}

export function useCRM(): CRMContextValue {
  const ctx = useContext(CRMContext);
  if (!ctx) throw new Error('useCRM must be used within CRMProvider');
  return ctx;
}
