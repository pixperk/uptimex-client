import { DispatchProps, MonitorContext } from '@/context/MonitorContext';
import { IUserAuth } from '@/interfaces/user.interface';
import { AUTH_SOCIAL_USER, REGISTER_USER } from '@/queries/auth';
import { showErrorToast } from '@/utils/utils';
import { LoginType, registerSchema, RegisterType } from '@/validations/auth';
import {
  FetchResult,
  MutationFunctionOptions,
  useMutation,
} from '@apollo/client';
import { GraphQLError } from 'graphql';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { Dispatch, useContext, useState } from 'react';
import {
  Auth,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';
import firebaseApp from '../firebase';

export const useRegister = (): IUserAuth => {
  const { dispatch } = useContext(MonitorContext);
  const [validationErrors, setValidationErrors] = useState<
    RegisterType | LoginType
  >({
    username: '',
    password: '',
    email: '',
  });
  const router: AppRouterInstance = useRouter();
  const [registerUser, { loading }] = useMutation(REGISTER_USER);
  const onRegisterSubmit = async (formData: FormData): Promise<void> => {
    const resultSchema = registerSchema.safeParse(Object.fromEntries(formData));
    if (!resultSchema.success) {
      setValidationErrors({
        username: resultSchema.error.format().username?._errors[0]!,
        email: resultSchema.error.format().email?._errors[0]!,
        password: resultSchema.error.format().password?._errors[0]!,
      });
    } else {
      submitUserData(resultSchema.data, registerUser, dispatch, router);
    }
  };
  return {
    loading,
    validationErrors,
    setValidationErrors,
    onRegisterSubmit,
  };
};

export const useSocialRegister = (): IUserAuth => {
  const { dispatch } = useContext(MonitorContext);
  const router: AppRouterInstance = useRouter();
  const [authSocialUser, { loading }] = useMutation(AUTH_SOCIAL_USER);

  const registerWithGoogle = async (): Promise<void> => {
    const provider = new GoogleAuthProvider();
    const auth: Auth = getAuth(firebaseApp);
    auth.useDeviceLanguage();
    const userCredential: UserCredential = await signInWithPopup(
      auth,
      provider
    );
    const nameList = userCredential.user.displayName!.split(' ');
    const data = {
      username: nameList[0],
      email: userCredential.user.email,
      socialId: userCredential.user.uid,
      type: 'google',
    };
    submitUserData(data as RegisterType, authSocialUser, dispatch, router);
  };

  const registerWithGithub = async (): Promise<void> => {
   try{ const provider = new GithubAuthProvider();
    const auth: Auth = getAuth(firebaseApp);
    auth.useDeviceLanguage();
    const userCredential: UserCredential = await signInWithPopup(
      auth,
      provider
    );
    console.log(userCredential);
    const email = userCredential.user.email;
    if(!email)throw new Error('Kindly set your email public on github')
    const nameList = userCredential.user.displayName!.split(' ');
    const data = {
      username: nameList[0],
      email,
      socialId: userCredential.user.uid,
      type: 'github',
    };
    submitUserData(data as RegisterType, authSocialUser, dispatch, router);}
    catch(error){
      showErrorToast((error as GraphQLError).message || 'Please try again later');
    }
  };

  return {
    loading,
    authWithGoogle: registerWithGoogle,
    authWithGithub : registerWithGithub
  };
};

async function submitUserData(
  data: RegisterType,
  registerUserMethod: (
    options?: MutationFunctionOptions | undefined
  ) => Promise<FetchResult>,
  dispatch: Dispatch<DispatchProps>,
  router: AppRouterInstance
) {
  try {
    const result: FetchResult = await registerUserMethod({
      variables: { user: data },
    });
    if (result && result.data) {
      const { registerUser, authSocialUser } = result.data;
      dispatch({
        type: 'dataUpdate',
        payload: {
          user: registerUser ? registerUser.user : authSocialUser.user,
          notifications: registerUser
            ? registerUser.notifications
            : authSocialUser.notifications,
        },
      });
      router.push('/status');
    }
  } catch (error) {
    showErrorToast((error as GraphQLError).message || 'Please try again later');
  }
}
