"use client";
import React, { useState } from "react";
import logo from "../../public/logo1.svg";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineSend, AiOutlineUser } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type NavbarProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setProfile: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Navbar({ setOpen, setProfile }: NavbarProps) {
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();
  const { mutate: logout, isPending } = useMutation({
    mutationFn: async () => {
      setSubmitError("");
      const { data } = await axios.post(
        `${baseUrl}/api/users/logout`,
        {},
        { withCredentials: true }
      );
      return data as any;
    },
    onError: (err: any) => {
      let error = "";
      if (err.response.statusText.length > 1) {
        error = err.response.statusText;
      } else if (err.response.data.length > 1) {
        error = err.response.data;
      } else {
        error = "Error, try to reload page";
      }
      setSubmitError(error);
    },
    onSuccess: (data) => {
      console.log(data);
      router.push("/login");
    },
  });

  const handleLogout = () => {
    logout();
  };

  return (
    <Disclosure as="nav" className=" bg-primary ">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Image className="h-8 w-auto" src={logo} alt="Your Company" />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <div
                      onClick={() => setOpen(false)}
                      className={classNames(
                        "bg-blue-900 text-white block rounded-md px-3 py-2 text-base font-medium"
                      )}
                    >
                      chat
                    </div>
                    <div
                      onClick={() => setOpen(true)}
                      className={classNames(
                        "text-gray-300 cursor-pointer hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                      )}
                    >
                      Colleagues
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-primary p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-primary text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <AiOutlineUser className="text-xl text-gray-400" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        <div
                          onClick={() => setProfile(true)}
                          className={classNames(
                            "hover:bg-gray-100 block px-4 py-2 text-sm cursor-pointer text-gray-700"
                          )}
                        >
                          Your Profile
                        </div>
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={handleLogout}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </div>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <div
                onClick={() => setOpen(false)}
                className={classNames(
                  "bg-blue-900 text-white block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                chat
              </div>
              <div
                onClick={() => setOpen(true)}
                className={classNames(
                  "text-gray-300 cursor-pointer hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                Colleagues
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
