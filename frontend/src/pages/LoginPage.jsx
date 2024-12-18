import { useState } from "react";
import { useAtom } from "jotai";
import { useNavigate, useLocation } from "react-router-dom";
import { authActionsAtom } from "../stateManager/authAtom";
import { Container, Row, Col, Form } from "react-bootstrap";
import { CustomButton } from "../components/CustomButtons/CustomButton";

export const LoginPage = () => {
  const [, authCRUD] = useAtom(authActionsAtom);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard/homepage";

  const [credentials, setCredentials] = useState({
    email: "admin@eduhub.it",
    password: "123456",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await authCRUD({
      type: "LOGIN",
      payload: credentials,
    });

    if (success) {
      navigate(from);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center align-items-center vh-100">
        <Col className="col-6 d-flex flex-column gap-4">
          <a href="/" className="small d-flex align-items-center gap-2">
            <i className="ri-arrow-left-line icon-xs"></i> Torna indietro
          </a>
          <h2>Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-center gap-3">
              <CustomButton
                type="submit"
                style="filled-gradient"
                size="lg"
                className="w-100"
              >
                Login
              </CustomButton>
              <CustomButton
                style="filled-gradient"
                size="lg"
                className="w-100"
                onClick={() => navigate("/registration")}
              >
                Register
              </CustomButton>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
