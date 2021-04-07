/* istanbul ignore file */
import { NextApiRequest, NextApiResponse, NextPage } from "next";
import { NextRouter } from "next/router";
import { AppProps } from "next/app";
import { AxiosResponse } from "axios";
import {
  ComponentType,
  ChangeEvent,
  CSSProperties,
  FC,
  FormEvent,
  KeyboardEvent,
  MouseEvent,
  ReactChild,
  ReactElement,
  ReactNode,
  ReactPortal,
  ReactText,
  RefObject
} from "react";
import { Moment } from "moment-timezone";
import {
  GridColumns,
  GridPageChangeParams,
  GridRowsProp,
  GridValueGetterParams
} from "@material-ui/data-grid";
import { DatePickerView } from "@material-ui/pickers";
import { AnyAction, Store } from "redux";
import { SagaIterator } from "redux-saga";
import * as actions from "~actions/Users";
import { TRootState } from "~reducers";

/// ACTIONS ///

export type TAvatarData = {
  form: FormData;
  id: string;
};

export type TAvatarResData = {
  avatar: string;
};

export type TAuthData = {
  id?: string;
  avatar?: string;
  email?: string;
  emailReminders?: boolean;
  firstName?: string;
  lastName?: string;
  registered?: string;
  role?: string;
  status?: string;
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

export type TSeasonAPIQueryConfig = {
  id?: string;
  seasonId: string;
  startDate: string;
  endDate: string;
};

export type TSeasonData = {
  seasonId: string;
  startDate: string;
  endDate: string;
};

export type TNewPasswordData = {
  password: string;
  token: string;
};

export type TResetPasswordData = {
  email: string;
};

export type TSideMenuNodeIds = Array<string>;

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

/// MISC ///

export type EventTarget = {
  target: {
    name: string;
    value: string | boolean;
  };
};

export type EventTargetMoment = {
  target: {
    name: string;
    value: Moment | null;
  };
};

export type EventTargetDataset = {
  target: {
    dataset: {
      name: string;
      value: string;
    };
  };
};

export type TURLQuery = Record<string, any>;

/// COMPONENTS ///
export type TBaseFieldProps = {
  id?: string;
  containerStyle?: CSSProperties;
  disabled?: boolean;
  emptyLabel?: string;
  errors?: string;
  format?: string;
  icon?: TIconType;
  inputStyle?: CSSProperties;
  innerStyle?: CSSProperties;
  label?: ReactNode;
  maxLength?: number;
  name: string;
  onChange?: (event: ChangeEvent<any>) => void;
  placeholder?: string;
  required: boolean;
  readOnly?: boolean;
  notes?: string;
  radioContainerStyle?: CSSProperties;
  radioLabelStyle?: CSSProperties;
  radioStyle?: CSSProperties;
  style?: CSSProperties;
  selectOptions?: Array<string>;
  type: string;
  tooltip?: string;
  value?: string | Moment | Array<Moment> | Array<string> | boolean | null;
  updateEvent?: boolean;
};

export type TEventData = {
  _id: string;
  eventDate: string;
  eventNotes?: string;
  eventType: string;
  notes?: string;
  opponent?: string;
  location?: string;
  employeeResponse?: string;
  employeeNotes?: string;
  uniform?: string;
  team: string;
  schedule: Array<{
    _id: string;
    title?: string;
    employeeIds: Array<{
      _id?: PropTypes.string;
      firstName?: PropTypes.string;
      lastName?: PropTypes.string;
    }>;
  }>;
};

export type TFormData = {
  _id?: string;
  startMonth?: string;
  endMonth?: string;
  expirationDate?: string;
  eventCounts?: number;
};

export type TEventEmployeeResponse = Array<{
  _id?: string;
  response?: string;
  notes?: string;
}>;

export type TApEventDetails = {
  _id: string;
  eventDate: string;
  eventType: string;
  notes?: string;
  opponent?: string;
  location: string;
  employeeResponse?: TEventEmployeeResponse;
  team: string;
};

export type TAPFormDetails = {
  _id: string;
  endMonth: string;
  expirationDate: string;
  notes?: string;
  sendEmailNotificationsDate: string;
  sentEmails: boolean;
  startMonth: string;
};

export type TAPFormData = {
  events: Array<TApEventDetails>;
  form: TAPFormDetails;
};

export type TAvailabilityData = {
  id: string;
  value: string;
};

export type TEmployeeAvailabilityData = {
  id: string;
  availability: number;
};

export type TEventDistributionData = {
  name: string;
  "Event Count": number;
};

export type TEventResponseCount = {
  id: string;
  value: number;
};

export type TEventResponse = {
  id: string;
  value: string;
  notes?: string;
  updateEvent: boolean;
};

export type TEventScheduledEvents = {
  id: string;
  events: number;
};

export type TAvailabilityAggData = {
  eventAvailability: Array<TAvailabilityData>;
  memberResponseCount: Array<TEventResponseCount>;
  memberScheduleEvents: Array<TEventScheduledEvents>;
};

///

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

/// REDUX + SAGAS ///

export interface SagaStore extends Store {
  sagaTask: Task;
}

export {
  AnyAction,
  AppProps,
  AxiosResponse,
  ChangeEvent,
  ComponentType,
  CSSProperties,
  DatePickerView,
  FC,
  FormEvent,
  GridColumns,
  GridPageChangeParams,
  GridRowsProp,
  GridValueGetterParams,
  KeyboardEvent,
  MouseEvent,
  Moment,
  NextApiRequest,
  NextApiResponse,
  NextPage,
  NextRouter,
  ReactChild,
  ReactElement,
  ReactNode,
  ReactPortal,
  ReactText,
  RefObject,
  SagaIterator,
  TRootState
};
