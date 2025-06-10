import {useMutation} from '@tanstack/react-query';
import {signIn, SignInCredentials} from "@/api/sign-in";
import {useAuthActions} from "@/store/authStorage";

export const useSignIn = () => {
    const {setAuth}= useAuthActions();
    return useMutation({
        mutationKey: ['SIGN_IN'],
        mutationFn: async (params: SignInCredentials) => {
            return await signIn(params);
        },
        onSuccess: (data) => {
            setAuth({
                accessToken: data.session.access_token,
                refreshToken: data.session.refresh_token,
                user: {
                    id: data.user.id,
                    email: data.user.email,
                },
            })
        },
        onError: (error: any) => {
            console.error('Sign in failed:', error);
        },
    });
};
