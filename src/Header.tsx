import { Outlet } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { AlertsProvider } from './controls/Alerts.tsx';

const basename = (import.meta.env.VITE_BASE_PATH ?? '/') as string;

function header() {
  return (
    <>
      <Navbar expand="lg" sticky={'top'}>
        {/*<Navbar.Brand href="#home">Game Calc</Navbar.Brand>*/}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href={basename}>Home</Nav.Link>
            <Nav.Link href={`${basename}/medieval_dynasty`}>
              <img alt="logo" src={`${basename}T_GameSymbol.png`} style={{ height: '1em' }} /> Medieval Dynasty
            </Nav.Link>
          </Nav>
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

export default header;
