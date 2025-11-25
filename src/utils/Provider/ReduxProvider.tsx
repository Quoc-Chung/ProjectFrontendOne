"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../../redux/store";
import DataLoader from "../../components/client/Common/DataLoader";

const PersistLoading = () => {
  const justLoggedOut = typeof window !== 'undefined' ? sessionStorage.getItem('justLoggedOut') === 'true' : false;
  
  if (justLoggedOut) {
    return null; 
  }
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      
      </div>
    </div>
  );
};

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<PersistLoading />} persistor={persistor}>
        <DataLoader />
        {children}
      </PersistGate>
    </Provider>
  );
}
