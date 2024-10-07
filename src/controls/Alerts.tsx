import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import useLocalStorage from '../useLocalstorage.ts';
import { Alert } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';

interface Alerts {
  addAlert: (message: string) => void;
  addAlerts: (messages: string[]) => void;
}

interface AlertData {
  id: string;
  message: string;
}

class AlertsImpl implements Alerts {
  private readonly alertData: AlertData[];
  private readonly setAlertData: (value: AlertData[]) => void;

  constructor(alertData: AlertData[], setAlertData: (value: AlertData[]) => void) {
    this.alertData = alertData;
    this.setAlertData = setAlertData;
  }

  addAlert(message: string) {
    this.addAlerts([message]);
  }

  addAlerts(messages: string[]) {
    const newAlerts = [...this.alertData];
    messages.forEach((message) => {
      if (!newAlerts.find((v) => v.message == message)) {
        newAlerts.push({ message, id: uuid() });
      } else {
        console.debug('Alert already exists:', message);
      }
    });
    this.setAlertData(newAlerts);
  }
}

interface AlertsProviderProps {
  children: ReactNode;
}

const SharedObjectContext = createContext<Alerts | undefined>(undefined);

export const AlertsProvider: React.FC<AlertsProviderProps> = ({ children }) => {
  const [alertData, setAlertData] = useLocalStorage<AlertData[]>('alerts', []);
  const alerts = useMemo(() => new AlertsImpl(alertData, setAlertData), [alertData, setAlertData]);

  return (
    <>
      {alertData.map((data) => (
        <Alert
          key={data.id}
          variant="info"
          dismissible
          onClose={() => setAlertData([...alertData.filter((v) => v.id != data.id)])}
        >
          {data.message}
        </Alert>
      ))}
      <SharedObjectContext.Provider value={alerts}>{children}</SharedObjectContext.Provider>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAlerts = () => {
  const context = useContext(SharedObjectContext);
  if (context === undefined) {
    throw new Error('useSharedObject must be used within a SharedObjectProvider');
  }
  return context;
};
