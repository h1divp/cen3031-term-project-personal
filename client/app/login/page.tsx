import {Input} from "@heroui/input";
import {Button} from "@heroui/button";
import {Form} from "@heroui/form";

export default function Login() {
  return (
    <div className="grid h-screen place-items-center">
      <Form className= "w-1/4 place-items-center">
        <h1> Log in </h1>
        <Input label="Username" type="text" />
        <Input className = "w-full" label="Password" type="password" />
        <Button color="primary" variant="flat" type="submit">Log In</Button>
      </Form>
    </div>
  );

