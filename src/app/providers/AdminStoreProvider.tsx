import React from "react";

export type NotificationItem = {
  id: string;
  title: string;
  description: string;
  read: boolean;
};

type AdminState = {
  sidebarOpen: boolean;
  notifications: NotificationItem[];
};

type AdminAction =
  | { type: "toggle_sidebar" }
  | { type: "close_sidebar" }
  | { type: "mark_all_read" }
  | { type: "add_notification"; payload: NotificationItem };

const initialState: AdminState = {
  sidebarOpen: false,
  notifications: [
    {
      id: "notif-1",
      title: "سفارش جدید",
      description: "ORD-10046 ثبت شد.",
      read: false,
    },
    {
      id: "notif-2",
      title: "کمبود موجودی",
      description: "هدفون بی‌سیم سونی کمتر از حد مجاز است.",
      read: false,
    },
  ],
};

const AdminStoreContext = React.createContext<
  { state: AdminState; dispatch: React.Dispatch<AdminAction> } | undefined
>(undefined);

const reducer = (state: AdminState, action: AdminAction): AdminState => {
  switch (action.type) {
    case "toggle_sidebar":
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case "close_sidebar":
      return { ...state, sidebarOpen: false };
    case "mark_all_read":
      return {
        ...state,
        notifications: state.notifications.map((item) => ({ ...item, read: true })),
      };
    case "add_notification":
      return { ...state, notifications: [action.payload, ...state.notifications] };
    default:
      return state;
  }
};

export const AdminStoreProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <AdminStoreContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminStoreContext.Provider>
  );
};

export const useAdminStore = () => {
  const context = React.useContext(AdminStoreContext);
  if (!context) {
    throw new Error("useAdminStore must be used within AdminStoreProvider");
  }
  return context;
};
