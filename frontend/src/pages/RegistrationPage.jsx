import { useState } from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { authActionsAtom } from "../stateManager/authAtom";
import { Container, Row, Col, Form } from "react-bootstrap";
import { CustomButton } from "../components/CustomButtons/CustomButton";

export const RegistrationPage = () => {
  const [, authCRUD] = useAtom(authActionsAtom);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Le password non coincidono");
      return;
    }

    const success = await authCRUD({
      type: "REGISTER",
      payload: {
        email: formData.email,
        password: formData.password,
      },
    });

    if (success) {
      navigate("/dashboard/homepage");
    }
  };

  return (
    <Container>
      <Row className="justify-content-center align-items-center vh-100">
        <Col className="col-6 d-flex flex-column gap-4">
          <a href="/" className="small d-flex align-items-center gap-2">
            <i className="ri-arrow-left-line icon-xs"></i> Torna indietro
          </a>
          <h2>Registrazione</h2>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Conferma Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
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
                Registrati
              </CustomButton>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
