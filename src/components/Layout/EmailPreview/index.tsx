/* eslint-disable react/no-danger */
import { css } from "@emotion/react";
import isEmpty from "lodash.isempty";
import Bold from "~components/Layout/Bold";
import EmailStatus from "~components/Layout/EmailStatus";
import EmailSendToList from "~components/Layout/EmailSendToList";
import FormatDate from "~components/Layout/FormatDate";
import { dateTimeFormat } from "~utils/dateFormats";

const IMAGEAPI = process.env.NEXT_PUBLIC_IMAGEAPI;

export type TEmailPreviewProps = {
  message: string;
  sendDate?: string;
  sendFrom?: string;
  subject: string;
  sendTo: Array<string>;
  status?: string;
};

const EmailPreview = ({
  message,
  sendFrom,
  sendDate,
  sendTo,
  subject,
  status
}: TEmailPreviewProps): JSX.Element => (
  <div
    css={css`
      width: 100%;
      margin-top: 20px;
      padding: 20px;
      border: 1px dashed #bbb;
      border-radius: 5px;
      background-color: #fbfbfb;
    `}
  >
    <h2 data-testid="email-subject">
      {subject || (
        <span
          data-testid="emptysubject"
          css={css`
            color: red;
          `}
        >
          Invalid Email Subject
        </span>
      )}
    </h2>
    {status && (
      <div>
        <span>Status:&nbsp;</span>
        <EmailStatus
          status={status}
          styles={{
            textAlign: "left",
            display: "inline-block",
            width: "auto",
            position: "relative",
            marginLeft: 2,
            top: 2
          }}
        />
      </div>
    )}
    <div>
      <span>Date:&nbsp;</span>
      <Bold>
        <FormatDate
          date={sendDate}
          format={dateTimeFormat}
          style={{ display: "inline" }}
        />
      </Bold>
    </div>
    <span>From:&nbsp;</span>
    <Bold>{sendFrom || "Your Email Address"}</Bold>
    <a
      css={css`
        color: #222;
        font-size: 16px;
      `}
      rel="noopener noreferrer"
      target="_blank"
      href="https://support.google.com/mail/answer/1311182?hl=en"
    >
      via
    </a>
    <span
      css={css`
        font-size: 16px;
      `}
    >
      &nbsp;sendgrid.net&nbsp;
    </span>
    <div
      css={css`
        font-size: 16px;
      `}
    >
      <span>To:&nbsp;</span>
      <span
        css={css`
          font-weight: bold;
        `}
        data-test="sendto-address"
      >
        {isEmpty(sendTo) ? (
          <span
            data-testid="invalid-address"
            css={css`
              color: red;
            `}
          >
            Invalid Recipient Address.
          </span>
        ) : sendTo.length > 1 ? (
          <span data-testid="multiple-addresses">
            <EmailSendToList
              withIcon
              emails={sendTo}
              placement="bottom"
              styles={{ textAlign: "left", width: "auto" }}
            />
          </span>
        ) : (
          <span data-testid="single-address">{sendTo[0]}</span>
        )}
      </span>
    </div>
    <div
      css={css`
        font-size: 16px;
        padding: 30px;
        display: block;
        max-width: 675px;
        margin: 10px auto;
      `}
    >
      <div
        css={css`
          margin-bottom: 30px;
          margin-top: 15px;
        `}
      >
        <p
          css={css`
            color: #2e323b;
          `}
        >
          <img
            css={css`
              margin-right: 20px;
            `}
            src={`${IMAGEAPI}/images/sapLogo.jpg`}
            alt="sapLogo.jpg"
          />
          <img
            css={css`
              margin-right: 20px;
              position: relative;
              top: -3px;
            `}
            src={`${IMAGEAPI}/images/sharksLogo.jpg`}
            alt="sharksLogo.png"
          />
          <img
            css={css`
              position: relative;
              top: -1px;
            `}
            src={`${IMAGEAPI}/images/barracudaLogo.jpg`}
            alt="barracudaLogo.png"
          />
        </p>
      </div>
      <div
        css={css`
          background-color: #ffffff;
          border: 1px solid #f0f0f0;
          word-break: break-word;
          word-wrap: break-word;
        `}
      >
        <div
          css={css`
            font-size: 16px;
            padding: 30px;
            display: block;
          `}
        >
          <div
            data-testid="email-message"
            dangerouslySetInnerHTML={{
              __html:
                message ||
                `<p id="emptymessage" style="color:red;text-align: center;font-weight:bold;">Invalid Email Body</p>`
            }}
          />
        </div>
      </div>
    </div>
  </div>
);

export default EmailPreview;
