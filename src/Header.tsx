import { Outlet } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { AlertsProvider } from './controls/Alerts.tsx';
import { AppVersion, version } from '@/version.ts';
import { useCallback, useEffect, useState } from 'react';

const basename = (import.meta.env.VITE_BASE_PATH ?? '/') as string;

const minVersionCheckInterval = version.commit == 'dev' ? 5000 : 30000;
const versionCheckInterval = version.commit == 'dev' ? 5000 : 600000;

function Header() {
  const [lastVersionCheck, setLastVersionCheck] = useState<Date>();
  const checkVersion = useCallback(async () => {
    if (
      lastVersionCheck === undefined ||
      new Date().getTime() - lastVersionCheck.getTime() >= minVersionCheckInterval
    ) {
      const res = await fetch(`${basename}version.json`, { cache: 'no-cache' });
      if (res.status == 200) {
        const data = (await res.json()) as AppVersion;
        if (typeof data == 'object' && data.version != version.version && data.commit != version.commit) {
          window.location.reload();
        }
        setLastVersionCheck(new Date());
      }
    }
  }, [lastVersionCheck]);

  useEffect(() => {
    const id = setInterval(() => void checkVersion(), versionCheckInterval);
    return () => clearInterval(id);
  }, [checkVersion]);

  useEffect(() => {
    function handleVisibilityChange() {
      if (document.visibilityState === 'visible') {
        console.log('Visibility changed to visible');
        void checkVersion();
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [checkVersion]);

  return (
    <>
      <Navbar expand="lg" sticky={'top'}>
        {/*<Navbar.Brand href="#home">Game Calc</Navbar.Brand>*/}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href={basename}>Home</Nav.Link>
            <Nav.Link href={`${basename}medieval_dynasty`}>
              <img alt="logo" src={`${basename}T_GameSymbol.png`} style={{ height: '1em' }} /> Medieval Dynasty
            </Nav.Link>
          </Nav>
          <Navbar.Text className="me-2">Version: {version.version + '-' + version.commit.substring(0, 8)}</Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      <Container>
        <AlertsProvider>
          <Outlet />
        </AlertsProvider>
      </Container>
    </>
  );
}

export default Header;
