import { useEffect } from "react";
// import { useUser } from "../context/user";

const Login = () => {
  // const { login } = useUser();

    useEffect(() => {
        // login();
    }, []);

  return (

    <div className="w-full max-w-3xl mx-auto my-16 px-2">
        <p>Loading...</p>
    </div>
  );
};

export default Login;