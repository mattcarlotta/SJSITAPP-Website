import * as React from "react";
import get from "lodash.get";
import { useRouter } from "next/router";
import toast from "~components/App/Toast";
import Card from "~components/Layout/Card";
import EmailPreview from "~components/Layout/EmailPreview";
import LoadingPanel from "~components/Layout/LoadingPanel";
import Padding from "~components/Layout/Padding";
import Header from "~components/Navigation/Header";
import Link from "~components/Navigation/Link";
import { FaChevronLeft, GoMailRead } from "~icons";
import app from "~utils/axiosConfig";
import { parseData } from "~utils/parseResponse";
import { TMailData } from "~types";

export type TViewMailState = {
  email: TMailData;
  isLoading: boolean;
};

export const ViewMail = (): JSX.Element => {
  const router = useRouter();
  const id = get(router, ["query", "id"]);
  const [state, setState] = React.useState<TViewMailState>({
    email: {} as TMailData,
    isLoading: true
  });
  const { email, isLoading } = state;

  const fetchEmail = React.useCallback(async (): Promise<void> => {
    try {
      const res = await app.get(`mail/edit/${id}`);
      const data = parseData<TMailData>(res);

      setState({
        email: data,
        isLoading: false
      });
    } catch (err) {
      toast({ type: "error", message: err.toString() });
      router.replace("/employee/mail/viewall?page=1");
    }
  }, [app, id, parseData, router, toast]);

  React.useEffect(() => {
    if (isLoading && id) fetchEmail();
  }, [isLoading, id, fetchEmail]);

  return (
    <>
      <Header title="View Email" url={router.asPath} />
      <Card
        dataTestId="compose-mail-page"
        icon={<GoMailRead />}
        title="View Email"
        subtitle="Review a previously created email"
      >
        <Padding top="20px" left="50px" right="50px" bottom="50px">
          {isLoading ? (
            <LoadingPanel
              data-testid="loading-email"
              borderRadius="5px"
              height="1100px"
            />
          ) : (
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
              <EmailPreview {...email} />
              <Link
                alt
                dataTestId="view-mail-link"
                display="block"
                margin="40px auto 10px auto"
                padding="8px 18px"
                maxWidth="150px"
                href="/employee/mail/viewall?page=1"
              >
                <FaChevronLeft
                  style={{ position: "relative", top: 3, marginRight: 5 }}
                />
                Go Back
              </Link>
            </div>
          )}
        </Padding>
      </Card>
    </>
  );
};

export default ViewMail;
