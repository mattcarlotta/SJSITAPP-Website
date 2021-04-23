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
  const { isLoading, user } = state;

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
  }, [app, id, parseData, router, toast]);

  const resetServerError = React.useCallback(() => {
    setState(prevState => ({
      ...prevState,
      serverError: ""
    }));
  }, []);

  const deleteUserAvatar = React.useCallback(
    async (id: string): Promise<void> => {
      try {
        resetServerError();
        const res = await avatarAPI.delete(`delete/${id}`);
        const message = parseMessage(res);

        toast({ type: "info", message });

        setState(initialState);
      } catch (err) {
        toast({ type: "error", message: err.toString() });
        setState(prevState => ({
          ...prevState,
          serverError: err.toString()
        }));
      }
    },
    [avatarAPI, parseMessage, resetServerError, toast]
  );

  const updateUserAvatar = React.useCallback(
    async ({ form, id }: { form: FormData; id: string }): Promise<void> => {
      try {
        resetServerError();
        const res = await avatarAPI.put(`update/${id}`, form);
        const message = parseMessage(res);

        toast({ type: "info", message });

        setState(initialState);
      } catch (err) {
        toast({ type: "error", message: err.toString() });
        setState(prevState => ({
          ...prevState,
          serverError: err.toString()
        }));
      }
    },
    [avatarAPI, parseMessage, resetServerError, toast]
  );

  const updateUserProfile = React.useCallback(
    async (payload: TAuthData): Promise<void> => {
      try {
        resetServerError();

        const res = await app.put("members/update", payload);
        const message = parseMessage(res);

        toast({ type: "info", message });

        setState(initialState);
      } catch (err) {
        toast({ type: "error", message: err.toString() });
        setState(prevState => ({
          ...prevState,
          serverError: err.toString()
        }));
      }
    },
    [app, parseMessage, resetServerError, toast]
  );

  const updateUserStatus = React.useCallback(
    async (payload: { id: string; status: string }): Promise<void> => {
      try {
        resetServerError();

        const res = await app.put("members/update-status", payload);
        const message = parseMessage(res);

        toast({ type: "info", message });

        setState(initialState);
      } catch (err) {
        toast({ type: "error", message: err.toString() });
        setState(prevState => ({
          ...prevState,
          serverError: err.toString()
        }));
      }
    },
    [app, parseMessage, resetServerError, toast]
  );

  React.useEffect(() => {
    if (isLoading && id) fetchMember();
  }, [isLoading, id, fetchMember]);

  return isLoading ? (
    <LoadingPanel
      data-testid="loading-email"
      borderRadius="5px"
      height="1100px"
    />
  ) : (
    <Profile
      {...user}
      {...state}
      id={id}
      editRole
      deleteUserAvatar={deleteUserAvatar}
      updateUserAvatar={updateUserAvatar}
      updateUserProfile={updateUserProfile}
      updateUserStatus={updateUserStatus}
    />
  );
};

export default MemberProfile;
