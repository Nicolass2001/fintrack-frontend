import type { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect } from "@remix-run/react";
import { commitSession } from "../sessions";
import {
  Button,
  Container,
  Fieldset,
  Flex,
  PasswordInput,
  Space,
  TextInput,
  Title,
} from "@mantine/core";
import { userLoggedIn } from "~/services/authentication/middleware";
import {
  registerInBackend,
  setSessionData,
  validateRegisterData,
} from "~/services/authentication/auth";
import { SessionDataWithoutCurrency } from "~/types/session";

export function meta() {
  return [{ title: "Register" }];
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();

    const { email, password, name } = validateRegisterData(
      formData.get("email"),
      formData.get("password"),
      formData.get("name")
    );

    const sessionData = await registerInBackend(email, password, name);

    const session = await setSessionData({
      request,
      sessionData,
    } as ActionFunctionArgs & { sessionData: SessionDataWithoutCurrency });

    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    console.error(error);
    return redirect("/register");
  }
}

export async function loader({ request }: ActionFunctionArgs) {
  if (await userLoggedIn({ request } as ActionFunctionArgs)) {
    return redirect("/");
  }
  return {};
}

export default function Register() {
  return (
    <Container size="xs">
      <Fieldset>
        <Space h="md" />
        <Title order={1}>Register</Title>
        <Space h="md" />
        <Form method="post">
          <TextInput label="Name" name="name" type="text" required />
          <TextInput label="Email" name="email" type="email" required />
          <PasswordInput label="Password" name="password" required />
          <Space h="md" />
          <Flex justify="flex-end">
            <Button variant="filled" type="submit">
              Register
            </Button>
          </Flex>
        </Form>
      </Fieldset>
    </Container>
  );
}
