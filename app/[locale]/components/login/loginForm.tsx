"use client";
import { Button, Group, TextInput, PasswordInput, Loader } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useTranslations } from "next-intl";

type LoginFormProps = {
  login: ( email: string, password: string ) => void;
  loginErrorMessage: string;
  loading: boolean;
};
//pass in login function as prop
const LoginForm = ( { login, loginErrorMessage, loading }: LoginFormProps ) : React.JSX.Element => {
  const t = useTranslations( "Login" );

  const form = useForm ( {
    initialValues: {
      password: "",
      email: ""
    }
  } );

  return (
    <>
      <TextInput id="username" mt="md" label={t( "username" )} placeholder={t( "username" )} {...form.getInputProps ( "email" ) } />
      <PasswordInput id="password" label={t( "password" )} placeholder={t( "password" )} mt="md" { ...form.getInputProps ( "password" )}/>
      <p> {loginErrorMessage} </p>
      { loading && <Loader id="loginLoader" className="mx-auto mt-4" />}
      <Group position="right">
        <Button id="loginButton" type="submit" disabled={ loading } variant="light" color="blue" onClick={() => login( form.values.email, form.values.password )}>{t( "login" )}</Button>
      </Group>
    </>
  );
};

export default LoginForm;