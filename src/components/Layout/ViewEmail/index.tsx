import * as React from "react";
import get from "lodash.get";
import { useRouter } from "next/router";
import toast from "~components/App/Toast";
import Button from "~components/Layout/Button";
import Card from "~components/Layout/Card";
import EmailPreview from "~components/Layout/EmailPreview";
import LoadingPanel from "~components/Layout/LoadingPanel";
import Padding from "~components/Layout/Padding";
import Header from "~components/Navigation/Header";
import { FaChevronLeft, GoMailRead } from "~icons";
import app from "~utils/axiosConfig";
import { parseData } from "~utils/parseResponse";
import { ReactElement, TMailData } from "~types";

export type TViewMailState = {
  email: TMailData;
  isLoading: boolean;
};

export const ViewMail = (): ReactElement => {
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
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [id]);

  React.useEffect(() => {
    if (isLoading && id) fetchEmail();
  }, [isLoading, id, fetchEmail]);

  return (
    <>
      <Header title="View Email" url={router.asPath} />
      <Card
        dataTestId="view-email-page"
        icon={<GoMailRead />}
        title="View Email"
        subtitle="Review a Previously Created Email"
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
              <Button
                primary
                type="button"
                dataTestId="view-mail-link"
                margin="40px auto 10px auto"
                padding="8px 18px"
                maxWidth="150px"
                borderRadius="10px"
                onClick={() => router.back()}
              >
                <FaChevronLeft
                  style={{ position: "relative", top: 3, marginRight: 8 }}
                />
                Go Back
              </Button>
            </div>
          )}
        </Padding>
      </Card>
    </>
  );
};

export default ViewMail;
