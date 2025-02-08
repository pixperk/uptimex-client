import { DispatchProps, MonitorContext } from "@/context/MonitorContext";
import { IUserAuth } from "@/interfaces/user.interface";
import { AUTH_SOCIAL_USER, LOGIN_USER } from "@/queries/auth";
import { showErrorToast } from "@/utils/utils";
import { loginSchema, LoginType, RegisterType } from "@/validations/auth";
import { FetchResult, MutationFunctionOptions, useMutation } from "@apollo/client";
import { Auth, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";
import { GraphQLError } from "graphql";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { Dispatch, useContext, useState } from "react";
import firebaseApp from "../firebase";

export const useLogin = () : IUserAuth => {
  const [validationErrors, setValidationErrors] = useState<RegisterType | LoginType>({
    username : '',
    password : '',
  })
  const router : AppRouterInstance = useRouter()
  const [loginUser, {loading}] = useMutation(LOGIN_USER)
  const onLoginSubmit = async(formData : FormData) : Promise<void> => {
    try {
      const resultSchema = loginSchema.safeParse(Object.fromEntries(formData));
    if (!resultSchema.success){
      setValidationErrors({
        username : resultSchema.error.format().username?._errors[0]!,
        password : resultSchema.error.format().password?._errors[0]!,
      })

    }else{
      const {username, password} = resultSchema.data!
      console.log(resultSchema.data);

      const result :FetchResult = await  loginUser({variables :{
        usernameOrEmail : username,
        password
      }})
      if(result && result.data){
        router.push('/status')
      }

    }
    } catch (error : unknown) {
      showErrorToast((error as GraphQLError).message || "Please try again later");

    }
  }
  return {
    loading,
    validationErrors,
    setValidationErrors,
    onLoginSubmit
  }
}

export const useSocialLogin = (): IUserAuth => {
  const { dispatch } = useContext(MonitorContext);
  const router: AppRouterInstance = useRouter();
  const [authSocialUser, { loading }] = useMutation(AUTH_SOCIAL_USER);

  const loginWithGoogle = async (): Promise<void> => {
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
    submitUserData(data as LoginType, authSocialUser, dispatch, router);
  };

  const loginWithGithub = async (): Promise<void> => {
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
    submitUserData(data as LoginType, authSocialUser, dispatch, router);}
    catch(error){
      showErrorToast((error as GraphQLError).message || 'Please try again later');
    }
  };

  return {
    loading,
    authWithGoogle: loginWithGoogle,
    authWithGithub : loginWithGithub
  };
};

async function submitUserData(
  data: LoginType,
  loginUserMethod: (
    options?: MutationFunctionOptions | undefined
  ) => Promise<FetchResult>,
  dispatch: Dispatch<DispatchProps>,
  router: AppRouterInstance,
) {
  try {
    const result: FetchResult = await loginUserMethod({
      variables: { user: data },
    });
    if (result && result.data) {
      const { authSocialUser } = result.data;
      dispatch({
        type: 'dataUpdate',
        payload: {
          user:authSocialUser.user,
          notifications : authSocialUser.notifications,
        },
      });
      router.push('/status');
    }
  } catch (error) {
    showErrorToast((error as GraphQLError).message || 'Please try again later');
  }
}
