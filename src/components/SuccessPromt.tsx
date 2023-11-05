"use client";
import { Dialog, Transition } from "@headlessui/react";
import { GrCheckmark, GrFormCheckmark } from "react-icons/gr";
import { IoCheckmark } from "react-icons/io5";
import { Fragment, useState } from "react";

type CongratulationsProp = {
  isOpen: boolean;
  closeModal: () => void;
};
export default function Congratulations({
  isOpen,
  closeModal,
}: CongratulationsProp) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10 " onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-[#150E28] bg-opacity-80"
            onClick={closeModal}
          />
        </Transition.Child>
        <div
          className="fixed inset-0 bg-primary  opacity-20"
          aria-hidden="true"
          onClick={closeModal}
        />

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex h-screen items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-max  transform overflow-hidden  p-6 text-left align-middle shadow-xl transition-all  ">
                <div className=" md:w-[50rem] md:p-12 rounded-md text-black p-8 mx-auto bg-white h-[30rem]  flex justify-center gap-[12rem] flex-col font-sans">
                  <section className="flex justify-center items-center flex-col gap-8 text-center">
                    <div className=" bg-primary rounded-full h-14 w-14  flex justify-center items-center text-white">
                      <IoCheckmark className="text-white  text-2xl  " />
                    </div>
                    <p className="text-xl font-semibold w-4/5 md:2xl text-center">
                      Your account has successfully been created
                    </p>
                  </section>
                  <section>
                    <button
                      className="bg-primary w-full p-2 text-white text-xl  rounded-sm"
                      onClick={closeModal}
                    >
                      Done
                    </button>
                  </section>
                </div>
                ;
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
