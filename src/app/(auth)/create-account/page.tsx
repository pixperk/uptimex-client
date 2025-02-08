"use client";

import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import Image from "next/image";
import Link from "next/link";
import { FC, ReactElement, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaGithub } from "react-icons/fa";
import { useRegister, useSocialRegister } from "./useRegister";
import PageLoader from "@/components/PageLoader";

const page: FC = (): ReactElement => {
  const { loading, validationErrors, setValidationErrors, onRegisterSubmit } =
    useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const { loading: socialAuthLoading, authWithGoogle, authWithGithub } = useSocialRegister();
  return (
    <div className="relative flex flex-col h-screen mx-auto w-11/12 max-w-md rounded-lg bg-white md:w-2/3">
      {socialAuthLoading && <PageLoader/>}
      <form action={onRegisterSubmit}>
        <div className="mt-12 w-full px-5">
          <div className="mb-5 flex flex-col justify-between text-gray-600">
            <Link href="/" className="w-24 flex mx-auto mb-4 cursor-pointer">
              <Image
                src="https://i.ibb.co/SBvxyHC/uptimer.png"
                alt="API Monitor Logo"
                className="w-full"
                width={400}
                height={400}
                priority
              />
            </Link>
            <h1 className="flex w-full text-center justify-center text-3xl font-bold mb-2">
              Create your free UptimeX account
            </h1>
          </div>
          <label
            htmlFor="username"
            className="text-sm font-bold leading-tight tracking-normal text-gray-800"
          >
            Username
          </label>
          <TextInput
            id="username"
            name="username"
            type="text"
            className="mt-2 mb-1 flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none"
            placeholder="Enter username"
            onChange={() =>
              setValidationErrors!((prev) => ({ ...prev, username: "" }))
            }
          />
          {validationErrors!.username && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors!.username}
            </p>
          )}
          <label
            htmlFor="email"
            className="text-sm font-bold leading-tight tracking-normal text-gray-800"
          >
            Email
          </label>
          <TextInput
            id="email"
            name="email"
            type="email"
            className="mt-2 mb-1 flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none"
            placeholder="Enter email"
            onChange={() =>
              setValidationErrors!((prev) => ({ ...prev, email: "" }))
            }
          />
          {validationErrors!.email && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors!.email}
            </p>
          )}
          <label
            htmlFor="password"
            className="text-sm font-bold leading-tight tracking-normal text-gray-800"
          >
            Password
          </label>
          <div className="relative mb-2 mt-2">
            <div
              className="absolute right-0 flex h-full cursor-pointer items-center pr-3 text-gray-600"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <FaEyeSlash className="icon" />
              ) : (
                <FaEye className="icon" />
              )}
            </div>
            <TextInput
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className="flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none"
              placeholder="Enter password"
              onChange={() =>
                setValidationErrors!((prev) => ({ ...prev, password: "" }))
              }
            />
          </div>
          {validationErrors!.password && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors!.password}
            </p>
          )}
          <div className="flex justify-end">
            <div className="mb-4 ml-2 cursor-pointer text-sm text-blue-600 hover:underline dark:text-blue-500">
              <Link href="/login">Already have an account? Login</Link>
            </div>
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="bg-green-500 text-md block w-full cursor-pointer rounded px-8 py-2 text-center font-bold text-white hover:bg-green-400 focus:outline-none"
            label={loading ? "Creating Account..." : "CREATE FREE ACCOUNT"}
          />
        </div>
      </form>
      <div className="px-5">
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-2">or</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
        <Button
          type="button"
          icon={<FaGoogle className="mr-2 -ml-1 w-4 h-4" />}
          className="text-md w-full cursor-pointer rounded px-8 py-2 text-center font-bold text-white inline-flex items-center justify-center bg-[#4285F4] hover:bg-[#4285F4]/90 focus:outline-none"
          label="Sign In with Google"
          onClick={authWithGoogle}
        />
        <Button
          type="button"
          icon={<FaGithub className="mr-2 -ml-1 w-4 h-4" />}
          className="text-md w-full mt-4 cursor-pointer rounded px-8 py-2 text-center font-bold text-white inline-flex items-center justify-center bg-[#333333] hover:bg-[#333333]/90 focus:outline-none"
          label="Sign In with GitHub"
          onClick={authWithGithub}
        />
      </div>
    </div>
  );
};

export default page;
