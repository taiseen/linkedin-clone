import { useLogin } from "../../api/mutation";
import { useForm } from "react-hook-form";
import { input } from "../../constants";
import { Loader } from "lucide-react";


const LoginForm = () => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm(); // custom hook by lib...

    const { mutate: loginMutation, isPending } = useLogin();

    const isBtnDisable = isSubmitting || isPending;


    const handleLogin = (data) => loginMutation(data);


    return (
        <form
            onSubmit={handleSubmit(handleLogin)}
            className='space-y-4 w-full max-w-md'
        >

            <input
                type='text'
                placeholder='Username'
                className={`input input-bordered w-full ${errors[input.userName] ? 'input-error' : ''}`}
                {...register(input.userName, { required: true })}
            />


            <input
                type='password'
                placeholder='Password'
                className={`input input-bordered w-full ${errors[input.password] ? 'input-error' : ''}`}
                {...register(input.password, {
                    required: true,
                    minLength: { value: 6, message: `Min length 6 characters` },
                })}
            />


            <button
                type='submit'
                disabled={isBtnDisable}
                className='btn btn-primary w-full'
            >
                {
                    isBtnDisable
                        ? <Loader className='size-5 animate-spin' />
                        : "Login"
                }
            </button>
        </form>
    );
}

export default LoginForm