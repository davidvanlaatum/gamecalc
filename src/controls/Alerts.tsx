import React, { createContext, ReactNode, useContext } from 'react';
import useLocalStorage from '../useLocalstorage.ts';
import { Alert } from 'react-bootstrap';

interface Alerts {
  addAlert: (message: string) => void;
  addAlerts: (messages: string[]) => void;
}

class AlertsImpl implements Alerts {
  private alertData: string[];
  private setAlertData: (value: string[]) => void;

  constructor(alertData: string[], setAlertData: (value: string[]) => void) {
    this.alertData = alertData;
    this.setAlertData = setAlertData;
  }

  addAlert(message: string) {
    this.addAlerts([message]);
  }

  addAlerts(messages: string[]) {
    const newAlerts = [...this.alertData];
    messages.forEach((message) => {
      if (!newAlerts.includes(message)) {
        newAlerts.push(message);
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
  const [alertData, setAlertData] = useLocalStorage<string[]>('alerts', []);
  const alerts = new AlertsImpl(alertData, setAlertData);

  return (
    <>
      {alertData.map((message, index) => (
        <Alert
          key={index}
          variant="info"
          dismissible
          onClose={() => setAlertData([...alertData.filter((_, i) => i != index)])}
        >
          {message}
        </Alert>
      ))}
      <SharedObjectContext.Provider value={alerts}>{children}</SharedObjectContext.Provider>
    </>
  );
};

export const useAlerts = () => {
  const context = useContext(SharedObjectContext);
  if (context === undefined) {
    throw new Error('useSharedObject must be used within a SharedObjectProvider');
  }
  return context;
};
