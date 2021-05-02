import * as React from "react";
import { useRouter } from "next/router";
import toast from "~components/App/Toast";
import LoadingPanel from "~components/Layout/LoadingPanel";
import Profile from "~components/Layout/Profile";
import app, { avatarAPI } from "~utils/axiosConfig";
import { parseData, parseMessage } from "~utils/parseResponse";
import { ReactElement, TAuthData, TUser } from "~types";

export type TMemberProfileState = {
  user: TUser;
  isLoading: boolean;
  serverError: string;
  serverMessage: string;
};

const initialState = {
  user: {} as TUser,
  isLoading: true,
  serverError: "",
  serverMessage: ""
};

const MemberProfile = ({ id }: { id: string }): ReactElement => {
  const router = useRouter();
  const [state, setState] = React.useState<TMemberProfileState>(initialState);
  const { isLoading, serverError, serverMessage, user } = state;

  const fetchMember = React.useCallback(async (): Promise<void> => {
    try {
      const res = await app.get(`members/view/${id}`);
      const data = parseData<TUser>(res);

      setState({
        user: data,
        isLoading: false,
        serverError: "",
        serverMessage: ""
      });
    } catch (err) {
      toast({ type: "error", message: err.toString() });
      router.replace("/employee/members/viewall?page=1");
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [id]);

  const resetServerMessages = React.useCallback((): void => {
    setState(prevState => ({
      ...prevState,
      serverError: "",
      serverMessage: ""
    }));
  }, []);

  const setServerMessage = React.useCallback(
    (message: string): void => {
      toast({ type: "info", message });

      setState(prevState => ({
        ...prevState,
        serverMessage: message
      }));

      fetchMember();
    },
    [fetchMember]
  );

  const setServerError = React.useCallback((err: Error): void => {
    toast({ type: "error", message: err.toString() });

    setState(prevState => ({
      ...prevState,
      serverError: err.toString()
    }));
  }, []);

  const deleteUserAvatar = React.useCallback(
    async (id: string): Promise<void> => {
      try {
        resetServerMessages();

        const res = await avatarAPI.delete(`delete/${id}`);
        const message = parseMessage(res);

        setServerMessage(message);
      } catch (err) {
        setServerError(err);
      }
    },
    [resetServerMessages, setServerMessage, setServerError]
  );

  const updateUserAvatar = React.useCallback(
    async ({ form, id }: { form: FormData; id: string }): Promise<void> => {
      try {
        resetServerMessages();

        const res = await avatarAPI.put(`update/${id}`, form);
        const message = parseMessage(res);

        setServerMessage(message);
      } catch (err) {
        setServerError(err);
      }
    },
    [resetServerMessages, setServerMessage, setServerError]
  );

  const updateUserProfile = React.useCallback(
    async (payload: TAuthData): Promise<void> => {
      try {
        resetServerMessages();

        const res = await app.put("members/update", payload);
        const message = parseMessage(res);

        setServerMessage(message);
      } catch (err) {
        setServerError(err);
      }
    },
    [resetServerMessages, setServerError, setServerMessage]
  );

  const updateUserStatus = React.useCallback(
    async (payload: { id: string; status: string }): Promise<void> => {
      try {
        resetServerMessages();

        const res = await app.put("members/update-status", payload);
        const message = parseMessage(res);

        setServerMessage(message);
      } catch (err) {
        setServerError(err);
      }
    },
    [resetServerMessages, setServerMessage, setServerError]
  );

  React.useEffect(() => {
    if (isLoading && id) fetchMember();
  }, [isLoading, id, fetchMember]);

  return isLoading ? (
    <LoadingPanel
      data-testid="loading-member"
      borderRadius="5px"
      height="1100px"
    />
  ) : (
    <Profile
      {...user}
      id={id}
      editRole
      serverError={serverError}
      serverMessage={serverMessage}
      deleteUserAvatar={deleteUserAvatar}
      updateUserAvatar={updateUserAvatar}
      updateUserProfile={updateUserProfile}
      updateUserStatus={updateUserStatus}
    />
  );
};

export default MemberProfile;
