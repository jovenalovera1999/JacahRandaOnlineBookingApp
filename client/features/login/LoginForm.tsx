"use client";

import Button from "@/components/ui/Button";
import FloatingLabelInputField from "@/components/ui/FloatingLabelInputField";
import Form from "@/components/ui/Form";

export default function LoginForm() {
  return (
    <>
      <Form>
        <div className="mb-5">
          <FloatingLabelInputField
            label="Username"
            type="text"
            name="username"
            required
            autoFocus
          />
        </div>
        <div className="mb-5">
          <FloatingLabelInputField
            label="Password"
            type="password"
            name="password"
            required
          />
        </div>
        <div>
          <Button tag="button" type="submit">
            Login
          </Button>
        </div>
      </Form>
    </>
  );
}
