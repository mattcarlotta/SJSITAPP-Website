/* istanbul ignore file */
import { NextApiRequest, NextApiResponse, NextPage } from "next";
import { NextRouter } from "next/router";
import { AppProps } from "next/app";
import {
  ComponentType,
  ChangeEvent,
  CSSProperties,
  FC,
  FormEvent,
  MouseEvent,
  ReactElement,
  ReactNode,
  ReactText
} from "react";
import { AnyAction, Store } from "redux";
import { SagaIterator } from "redux-saga";
import * as actions from "~actions/Users";
import { TRootState } from "~reducers";

/// ACTIONS ///

export type TAuthData = {
  id?: string;
  avatar?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role: string;
};

export type TLoginData = {
  email: string;
  password: string;
};

export type TSignupData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  token: string;
};

export type TNewPasswordData = {
  password: string;
  token: string;
};

export type TResetPasswordData = {
  email: string;
};

export type TSideMenuNodeIds = Array<string>;

export type EventTarget = {
  target: {
    name: string;
    value: string;
  };
};

export type TInputType = "text" | "password" | "email" | string;
export type TTextAreaType = "textarea";

export type TIconType =
  | "calander"
  | "erase"
  | "id"
  | "key"
  | "location"
  | "lock"
  | "mail"
  | "note"
  | "person"
  | "puck"
  | "remove"
  | "search"
  | "tshirt"
  | "user"
  | "usertag"
  | string;

/// COMPONENTS ///
export type TBaseFieldProps = {
  containerStyle?: CSSProperties;
  disabled?: boolean;
  errors?: string;
  icon?: TIconType;
  inputStyle?: CSSProperties;
  label: string;
  name: string;
  onChange?: (event: ChangeEvent<any>) => void;
  placeholder?: string;
  required: boolean;
  readOnly?: boolean;
  notes?: string;
  style?: CSSProperties;
  type: string;
  tooltip?: string;
  value?: string | Array<moment.Moment>;
  updateEvent?: boolean;
};

export interface CardProps {
  _id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  backgroundInfo?: string;
  address: any;
  key: any;
  className?: string;
  idx: number;
  handleEditClick: (id: string) => void;
  deleteUser: (id: string) => ReturnType<typeof actions.deleteUser>;
}
/// OLD ///

export type ComponentProps = {
  className?: string;
  children?: any;
  dataTestId?: string;
  errors?: string;
  name?: string;
  placeholder?: string;
  label?: string;
  onChange?: (event: ChangeEvent<any>) => void;
  onClick?: (event: ChangeEvent<any>) => void;
  type?: string;
  value?: string;
  style?: CSSProperties;
};

export type ContainerProps = {
  children: ReactNode;
  dataTestId?: string;
  innerStyle?: CSSProperties;
  style?: CSSProperties;
};

export type DropdownProps = {
  children: ReactNode;
  menu: ReactNode;
};

export type DropdownClickHandlerProps = {
  children: ({
    isVisible,
    handleMenuClick
  }: {
    isVisible: boolean;
    handleMenuClick: () => void;
  }) => JSX.Element;
};

export type DropdownClickHandlerState = {
  isVisible: boolean;
};

export type FieldErrorProps = {
  className?: string;
  errors?: string;
};

export type InputProps = ComponentProps;

export type LoadingUsersProps = {
  className?: string;
  duration?: string;
  height?: number;
  opacity?: string;
  width?: number;
};

export type ModalProps = {
  children: ReactNode;
  maxWidth?: string;
  onClick: (event: MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  title?: string | ReactNode;
};

export type ShowUsersState = {
  isEditingID: string;
  openModal: boolean;
};

export interface TextAreaProps extends ComponentProps {
  rows?: number;
}

export interface UserFormFields extends TBaseFieldProps {
  disabled?: boolean;
  readOnly?: boolean;
}

export interface UserFormState {
  fields: UserFormFields[];
  errors: number;
  isSubmitting: boolean;
}

export type UserListNavigationProps = {
  className?: string;
  openModal: (event: any) => void;
  seedDB: (type: string) => ReturnType<typeof actions.seedDB>;
};

/// REDUX + SAGAS ///

export interface SagaStore extends Store {
  sagaTask: Task;
}

export type ReducerState = {
  server: ServerReducerState;
  users: UserReducerState;
};

/// UTILS ///

export type FieldKeys = "city" | "street" | "state" | "suite" | "zipCode";

export type ParseKeys<T> = {
  [K in keyof T]: T[K] extends { name: string } ? T[K]["name"] : never;
}[Exclude<keyof T, keyof []>];

export type ParseFields<T> = {
  address: {
    [N in Extract<ParseKeys<T>, FieldKeys>]: string;
  };
} & {
  [N in Exclude<ParseKeys<T>, FieldKeys>]: string;
};

export {
  AnyAction,
  AppProps,
  ChangeEvent,
  ComponentType,
  CSSProperties,
  FC,
  FormEvent,
  MouseEvent,
  NextApiRequest,
  NextApiResponse,
  NextPage,
  NextRouter,
  ReactElement,
  ReactNode,
  ReactText,
  SagaIterator,
  TRootState
};
