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
import moment from "moment-timezone";
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

export type EventTarget = {
  target: {
    name: string;
    value: string;
  };
};

/// OLD
export type UserData = {
  _id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  backgroundInfo?: string;
  address?: {
    street?: string;
    state?: string;
    suite?: string;
    city?: string;
    zipCode?: string;
  };
};

export type UserProps = {
  props: UserData;
};

export interface UpdatedUserProps extends UserProps {
  id: string;
}

/// COMPONENTS ///

export type ActionButtonProps = {
  className?: string;
  dataTestId?: string;
  style?: CSSProperties;
};

export type TBaseFieldProps = {
  name: string;
  type: string;
  label: string;
  value?: string | Array<moment.Moment>;
  icon?: string;
  disabled?: boolean;
  required: boolean;
  placeholder?: string;
  tooltip?: string;
  errors?: string;
  notes?: string;
  updateEvent?: boolean;
  onChange?: (event: ChangeEvent<any>) => void;
  style?: CSSProperties;
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

export interface DeleteButtonProps extends ActionButtonProps {
  onClick: () => ReturnType<typeof actions.deleteUser>;
}
export interface DisplayUserListProps {
  data: any[];
  isEditingID?: string;
  deleteUser: (id: string) => ReturnType<typeof actions.deleteUser>;
  handleCloseModal: (event: any) => void;
  handleEditClick: (id: string) => void;
  handleResetEditClick: (event: any) => void;
  resetMessage: () => void;
  updateUser: ({
    props: UserData,
    id: string
  }) => ReturnType<typeof actions.updateUser>;
}

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

export interface EditButtonProps extends ActionButtonProps {
  onClick: (event: any) => void;
}

export type FieldErrorProps = {
  className?: string;
  errors?: string;
};

export type HeaderProps = {
  description: string;
  title: string;
  type: string;
  url?: string;
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

export interface UserFormProps extends UserData {
  _id?: string;
  resetMessage: () => void;
  serverError?: string;
  serverMessage?: string;
  resetForm: (event?: any) => void;
  cancelForm?: (event: any) => void;
  submitAction: ({
    props: UserData,
    id: string
  }) => ReturnType<typeof actions.createUser | typeof actions.updateUser>;
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
