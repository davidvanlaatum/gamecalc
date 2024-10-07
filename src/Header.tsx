import { Outlet } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { AlertsProvider } from './controls/Alerts.tsx';
import { AppVersion, version } from '@/version.ts';
import { useEffect } from 'react';

const basename = (import.meta.env.VITE_BASE_PATH ?? '/') as string;

function Header() {
  async function checkVersion() {
    const res = await fetch(`${basename}version.json`);
    if (res.status == 200) {
      const data = (await res.json()) as AppVersion;
      if (typeof data == 'object' && data.version != version.version && data.commit != version.commit) {
        window.location.reload();
      }
    }
  }

  useEffect(() => {
    const id = setInterval(() => void checkVersion(), 60000);
    return () => clearInterval(id);
  }, []);

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
          <Navbar.Text className="me-2">Version: {version.version + '-' + version.commit}</Navbar.Text>
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
