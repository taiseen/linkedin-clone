import { useRegistration } from "../../api/mutation";
import { useNavigate, } from "react-router-dom";
import { useForm } from "react-hook-form";
import { input } from "../../constants";
import { Loader } from "lucide-react";
import route from "../../routes";


const RegistrationForm = () => {

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm(); // custom hook by lib...

    const { mutate: registerMutation, isPending } = useRegistration();

    const isBtnDisable = isSubmitting || isPending;


    // useEffect(() => {
    //     if (!isPending) reset();
    // }, [isPending, reset])


    const handleRegister = (data) => {
        registerMutation(data)

        setTimeout(() => navigate(route.login), 5000)
    };


    return (
        <form
            onSubmit={handleSubmit(handleRegister)}
            className='flex flex-col gap-4'
        >
            <input
                type='text'
                placeholder='Full name'
                className={`input input-bordered w-full ${errors[input.name] ? 'input-error' : ''}`}
                {...register(input.name, { required: true })}
            />

            <input
                type='text'
                placeholder='Username'
                className={`input input-bordered w-full ${errors[input.userName] ? 'input-error' : ''}`}
                {...register(input.userName, { required: true })}
            />

            <input
                type='email'
                placeholder='Email'
                className={`input input-bordered w-full ${errors[input.email] ? 'input-error' : ''}`}
                {...register(input.email, { required: true })}
            />

            <input
                type='password'
                placeholder='Password (6+ characters)'
                className={`input input-bordered w-full ${errors[input.password] ? 'input-error' : ''}`}
                {...register(input.password, {
                    required: true,
                    minLength: { value: 6, message: `Min length 6 characters` },
                })}
            />

            <button
                type='submit'
                disabled={isBtnDisable}
                className='btn btn-primary text-white w-full'
            >
                {
                    isBtnDisable
                        ? <Loader className='size-5 animate-spin' />
                        : "Agree & Join"
                }
            </button>
        </form>
    )
}

export default RegistrationForm