"use client";

import Button from "@/components/ui/Button";
import FloatingLabelInputField from "@/components/ui/FloatingLabelInputField";
import Form from "@/components/ui/Form";
import Spinner from "@/components/ui/Spinner";
import { useAuth } from "@/context/AuthContext";
import { FormEvent, useState } from "react";

export default function LoginForm() {
  const { isLoading, handleLogin, errors } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await handleLogin(username, password);
  };

  return (
    <>
      <Form onSubmit={handleOnSubmit}>
        <div className="mb-5">
          <FloatingLabelInputField
            label="Username"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
            errors={errors.username}
          />
        </div>
        <div className="mb-5">
          <FloatingLabelInputField
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            errors={errors.password}
          />
        </div>
        <div>
          <Button
            tag="button"
            type="submit"
            isLoading={isLoading}
            isLoadingChildren={
              <>
                <Spinner size="xs" />
                <span>Logging In...</span>
              </>
            }
          >
            Login
          </Button>
        </div>
      </Form>
    </>
  );
}
